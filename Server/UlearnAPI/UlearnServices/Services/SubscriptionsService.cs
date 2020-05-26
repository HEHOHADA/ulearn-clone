using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Models;
using UlearnServices.Models.Subscription;

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

        public async Task<List<Subscription>> GetSortedAsync(SearchQuery query)
        {
            IQueryable<Subscription> subscriptions = _context.Subscriptions;
            if (query.SortType.HasValue)
                switch (query.SortType)
                {
                    case SortType.PriceAscending:
                        subscriptions = subscriptions.OrderBy(s => s.Price).AsQueryable();
                        break;
                    case SortType.PriceDescending:
                        subscriptions = subscriptions.OrderByDescending(s => s.Price).AsQueryable();
                        break;
                    case SortType.LevelAscending:
                        subscriptions = subscriptions.OrderBy(s => s.Level).AsQueryable();
                        break;
                    case SortType.LevelDescending:
                        subscriptions = subscriptions.OrderByDescending(s => s.Level).AsQueryable();
                        break;
                }

            if (query.FromLevel.HasValue && query.FromLevel != 0 && 
                query.ToLevel.HasValue && query.ToLevel != 0)
            {
                subscriptions = subscriptions.Where(x => x.Level >= query.FromLevel && x.Level <= query.ToLevel);
            }

            if (query.FromPrice.HasValue && query.FromPrice != 0 &&
                query.ToPrice.HasValue && query.ToPrice != 0)
            {
                subscriptions = subscriptions.Where(x => x.Price >= query.FromPrice && x.Price <= query.ToPrice);
            }

            if (query.Page.HasValue && query.Page != 0 && 
                query.PageSize.HasValue && query.PageSize != 0)
                subscriptions = subscriptions
                    .Skip((query.Page.Value - 1) * query.PageSize.Value)
                    .Take(query.PageSize.Value);

            return subscriptions.ToList();
        }

        public async Task Pay(string userId, PaymentRequest paymentRequest)
        {
            var user = await _context.Users.FindAsync(userId);
            user.Subscription = await _context.Subscriptions.FindAsync(paymentRequest.Product);
            if (user.Subscription == null)
            {
                throw new ArgumentException("no subscriptionId passed");
            }
            await _context.SaveChangesAsync();
            Console.WriteLine($"Number {paymentRequest.CardNumber} " +
                              $"Holder {paymentRequest.CardHolder} " +
                              $"Month {paymentRequest.Month} " +
                              $"Year {paymentRequest.Year} " +
                              $"CVC {paymentRequest.CVC} ");
        }
    }
}