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
        private DbSet<CodeTask> CodeTasks { get; set; }
        private DbSet<CodeTaskResult> CodeTaskResults { get; set; }
        private DbSet<CodeTaskReview> CodeTaskReviews { get; set; }
        
        private DbSet<TestTask> TestTasks { get; set; }
        private DbSet<TestQuestion> TestQuestions { get; set; }
        private DbSet<TestQuestionAnswer> TestQuestionAnswers { get; set; }
        private DbSet<TestQuestionAnswerResult> QuestionAnswerResults { get; set; }
        
        private DbSet<VideoTask> VideoTasks { get; set; }
        private DbSet<VideoTaskResult> VideoTaskResults { get; set; }
        
        private DbSet<Subscription> Subscriptions { get; set; }
        private DbSet<Course> Courses { get; set; }
        private DbSet<Module> Modules { get; set; }
        private DbSet<Group> Groups { get; set; }
        
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}