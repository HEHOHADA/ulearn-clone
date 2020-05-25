using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnData.Models;
using UlearnServices.Models.Subscription;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionsService _subscriptionsService;

        public SubscriptionController(SubscriptionsService subscriptionsService)
        {
            _subscriptionsService = subscriptionsService;
        }

        // GET: api/Subscription/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _subscriptionsService.FindAsync(id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }


        // PUT: api/Subscription/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutSubscription(int id, Subscription subscription)
        {
            if (id != subscription.Id)
            {
                return BadRequest();
            }

            try
            {
                await _subscriptionsService.PutAsync(subscription);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_subscriptionsService.SubscriptionExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }


        // POST: api/Subscription
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<Subscription>> PostSubscription(Subscription subscription)
        {
            var newSubscription = await _subscriptionsService.CreateAsync(subscription);
            return CreatedAtAction("GetSubscription", new {id = newSubscription.Id}, newSubscription);
        }


        // DELETE: api/Subscription/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<Subscription>> DeleteSubscription(int id)
        {
            var subscription = await _subscriptionsService.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            await _subscriptionsService.Remove(subscription);

            return subscription;
        }

        [HttpGet]
        public async Task<ActionResult<List<Subscription>>> GetSorted([FromQuery] SearchQuery query)
        {
            return await _subscriptionsService.GetSortedAsync(query);
        }
    }
}