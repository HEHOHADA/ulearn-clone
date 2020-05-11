using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;

namespace UlearnServices.Services
{
    public class SubscriptionsService
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool SubscriptionExists(int id)
        {
            return _context.Subscriptions.Any(e => e.Id == id);
        }

        public async Task<List<Subscription>> GetAsync()
        {
            return await _context.Subscriptions.ToListAsync();
        }

        public async Task<Subscription> FindAsync(int id)
        {
            return await _context.Subscriptions.FindAsync(id);
        }

        public async Task<Subscription> CreateAsync(Subscription subscription)
        {
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }

        public async Task PutAsync(Subscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(Subscription subscription)
        {
            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
        }
    }
}