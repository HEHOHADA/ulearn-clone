using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;

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

        public async Task<Course> CreateAsync(Course course)
        {
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