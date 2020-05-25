using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using UlearnData;
using UlearnData.Models;

namespace UlearnServices.Services
{
    public class SubscriptionsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public SubscriptionsService(ApplicationDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
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
            var updatedCount = await _context.SaveChangesAsync();
            if (updatedCount > 0)
            {
                _memoryCache.Set(subscription.Id, subscription, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }

            return subscription;
        }

        public async Task PutAsync(int id, Subscription model)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            subscription.Name = model.Name;
            subscription.Level = model.Level;
            subscription.Price = model.Price;

            _context.Entry(subscription).State = EntityState.Modified;
            var updatedCount = await _context.SaveChangesAsync();
            if (updatedCount > 0)
            {
                _memoryCache.Set(subscription.Id, subscription, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }
        }

        public async Task Remove(Subscription subscription)
        {
            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
        }
    }
}