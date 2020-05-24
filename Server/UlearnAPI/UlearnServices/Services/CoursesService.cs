using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Models.Course;

namespace UlearnServices.Services
{
    public class CoursesService
    {
        private readonly ApplicationDbContext _context;

        public CoursesService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }

        public async Task<List<Course>> GetAsync()
        {
            return await _context.Courses
                .Include(course => course.Modules)
                .ToListAsync();
        }

        public async Task<Course> FindAsync(int id)
        {
            return await _context.Courses
                .Include(course => course.Modules)
                .FirstOrDefaultAsync(course => course.Id == id);
        }

        public async Task<Course> CreateAsync(CourseCreateDto model)
        {
            var course = new Course()
            {
                Name = model.Name,
                Description = model.Description,
                Subscription = await _context.Subscriptions.FindAsync(model.SubscriptionId)
            };
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task PutAsync(Course course)
        {
            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(Course course)
        {
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }
    }
}