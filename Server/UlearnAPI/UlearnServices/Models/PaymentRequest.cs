namespace UlearnServices.Models
{
    public class PaymentRequest
    {
        public string CVC { get; set; }
        public string CardHolder { get; set; }
        public string CardNumber { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public int Product { get; set; }
    }
}