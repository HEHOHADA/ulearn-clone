using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using UlearnAPI.Chat;
using UlearnAPI.Middleware;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Services;
using UlearnServices.Services.CodeTasks;
using UlearnServices.Services.TestTasks;
using UlearnServices.Services.VideoTasks;

namespace UlearnAPI
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(_env.IsDevelopment()
                        ? Configuration.GetConnectionString("DevelopPostgres")
                        : new PostgreSqlConnectionStringBuilder(Configuration["DATABASE_URL"])
                        {
                            Pooling = true, TrustServerCertificate = true, SslMode = SslMode.Require
                        }.ConnectionString,
                    b => b.MigrationsAssembly("UlearnAPI")));


            services.AddIdentity<User, IdentityRole>(options => { options.User.RequireUniqueEmail = true; })
                .AddRoles<IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddGoogle(options =>
                {
                    IConfigurationSection googleAuthNSection =
                        Configuration.GetSection("Authentication:Google");
                    //FIXME: change secrets in appsettings.json
                    options.ClientId = googleAuthNSection["ClientId"];
                    options.ClientSecret = googleAuthNSection["ClientSecret"];
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        RoleClaimType = "role",
                        NameClaimType = "name",
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            // requires using Microsoft.Extensions.Options
            services.AddSingleton<UlearnDatabaseSettings>();
            services.Configure<UlearnDatabaseSettings>(options =>
            {
                options.DatabaseName = Configuration["Mongo:DatabaseName"];
                options.LogsCollectionName = Configuration["Mongo:LogsCollectionName"];
                options.MessagesCollectionName = Configuration["Mongo:MessagesCollectionName"];
                options.ConnectionString = Configuration["MONGO_CONNECTION_STRING"];
            });
            services.AddAuthorization();
            services.AddControllers();
            services.AddSwaggerDocument();
            services.AddMemoryCache();
            services.AddResponseCompression();
            services.AddScoped<SubscriptionsService>();
            services.AddScoped<ModulesService>();
            services.AddScoped<TestTasksService>();
            services.AddScoped<CoursesService>();
            services.AddScoped<GroupsService>();
            services.AddScoped<CodeTasksService>();
            services.AddScoped<VideoTasksService>();
            services.AddScoped<AccountService>();
            services.AddScoped<LoggingService>();
            services.AddScoped<CodeTaskResultService>();
            services.AddScoped<VideoTaskResultService>();
            services.AddScoped<TestTaskResultService>();
            services.AddScoped<ChatService>();
        }

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            UpdateDatabase(app);
            
            app.UseMiddleware<MongoLogMiddleware>();
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
            if (env.IsDevelopment())
            {
                app.UseCors(builder => builder.WithOrigins("http://localhost:3000")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
                app.UseDeveloperExceptionPage();
            }

            if (env.IsProduction())
            {
                app.UseCors(builder => builder.WithOrigins(Configuration["CLIENT_URL"])
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            }

            app.UseRouting();
            app.UseResponseCompression();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("DefaultRoute", "api/{controller}/{action}/{id?}");
                endpoints.MapHub<ChatHub>("/api/chat");
            });
            app.UseOpenApi();
            app.UseSwaggerUi3();
            CreateRoles(app).Wait();
        }

        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>())
                {
                    context.Database.Migrate();
                }
            }
        }

        private async Task CreateRoles(IApplicationBuilder app)
        {
            IServiceProvider serviceProvider = app.ApplicationServices
                .CreateScope().ServiceProvider.GetService<IServiceProvider>();

            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string[] roleNames = {"Admin", "Teacher"};
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            User user = await userManager.FindByEmailAsync("admin@mail.ru");
            if (user == null)
            {
                var admin = new User()
                {
                    UserName = "Admin",
                    Email = "admin@mail.ru",
                };
                var createPowerUser = await userManager.CreateAsync(admin, "Admin123!");
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}