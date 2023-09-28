namespace ServerMkcert.Models
{
    public class UserDto
    {
        public string UserRole { get; set; } = string.Empty;
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
