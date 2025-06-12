namespace SportifyHub.Models
{
    public enum BookingType
    {
        Venue,
        Class
    }

    public enum BookingStatus
    {
        Confirmed,
        Pending,
        Cancelled
    }

    public enum RecurrenceType
    {
        Once,
        Weekly,
        Monthly
    }
}
