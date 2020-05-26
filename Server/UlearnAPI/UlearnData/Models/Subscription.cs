using System;

namespace UlearnData.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public DateTime BoughtDate { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Level { get; set; }
    }
}