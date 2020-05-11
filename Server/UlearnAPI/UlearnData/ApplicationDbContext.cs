using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UlearnData.Models;
using UlearnData.Models.Tasks.CodeTask;
using UlearnData.Models.Tasks.TestTask;
using UlearnData.Models.Tasks.VideoTask;

namespace UlearnData
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<CodeTask> CodeTasks { get; set; }
        public DbSet<CodeTaskResult> CodeTaskResults { get; set; }
        public DbSet<CodeTaskReview> CodeTaskReviews { get; set; }
        
        public DbSet<TestTask> TestTasks { get; set; }
        public DbSet<TestQuestion> TestQuestions { get; set; }
        public DbSet<TestQuestionAnswer> TestQuestionAnswers { get; set; }
        public DbSet<TestQuestionAnswerResult> QuestionAnswerResults { get; set; }
        
        public DbSet<VideoTask> VideoTasks { get; set; }
        public DbSet<VideoTaskResult> VideoTaskResults { get; set; }
        
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Group> Groups { get; set; }
        
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}