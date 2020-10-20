namespace UlearnData
{
    public class UlearnDatabaseSettings : IUlearnDatabaseSettings
    { 
        public string LogsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IUlearnDatabaseSettings
    {
        string LogsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}