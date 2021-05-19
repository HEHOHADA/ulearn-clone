using UlearnServices.Attributes;
using UlearnServices.Services;

namespace UlearnServices.Models.Subscription
{
    public class SearchQuery
    {
        public int? Page { get; set; }

        public int? PageSize { get; set; }

        [LessThan("ToLevel", ErrorMessage = "Not valid")]
        public int? FromLevel { get; set; }
        
        public int? ToLevel { get; set; }

        [LessThan("ToPrice", ErrorMessage = "Not valid")]
        public int? FromPrice { get; set; }
        
        public int? ToPrice { get; set; }

        public SortType? SortType { get; set; }
    }
}