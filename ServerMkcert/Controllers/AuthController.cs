using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServerMkcert.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ServerMkcert.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly ILogger<HomeController> _logger;
        private readonly DBConnector _context;
        private readonly IConfiguration _configuration;

        public AuthController(ILogger<HomeController> logger, DBConnector context, IConfiguration configuration)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;
        }


        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            // Retrieve user data from the database based on the provided username if they exist.
            _logger.LogInformation("Register POST request received.");
            var userlist = await _context.users.FromSqlRaw("CALL GetUser({0})", request.Username).ToListAsync();
            var user = userlist.FirstOrDefault(); // Use FirstOrDefault() instead of [0].

            if (user != null)
            {
                return BadRequest("Username is unavailable");
            }
            else
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                // Create a new User object with the provided details.
                var newUser = new User
                {
                    UserRole = request.UserRole,
                    Username = request.Username,
                    PasswordHash = passwordHash
                };

                // Add the new user to the database.
                _context.users.Add(newUser);
                _context.SaveChanges();
            }

            return Ok(true);
        }

        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        [HttpPost("delete")]
        public async Task<ActionResult<User>> Delete(UserDto request)
        {
            // Retrieve user data from the database based on the provided username if they exist.
            _logger.LogInformation("Login POST request received.");
            var userlist = await _context.users.FromSqlRaw("CALL GetUser({0})", request.Username).ToListAsync();
            var user = userlist.FirstOrDefault(); // Use FirstOrDefault() instead of [0].

            _logger.LogInformation("User Delete POST request received.");
            if (user == null || user.UserRole == "Admin")
            {
                return BadRequest("Cant delete user, either its admin or does not exist.");
            }
            else
            {
                _context.users.FromSqlRaw("CALL DeleteUser({0})", request.Username);
            }

            return Ok(true);
        }


        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto request)
        {
            try
            {
                if (request.Username != null)
                {
                    // Retrieve user data from the database based on the provided username.
                    _logger.LogInformation("Login POST request received.");
                    var userlist = await _context.users.FromSqlRaw("CALL GetUser({0})", request.Username).ToListAsync();
                    var user = userlist.FirstOrDefault(); // Use FirstOrDefault() instead of [0].

                    if (user == null)
                    {
                        throw new InvalidLoginException("Username or password is incorrect.");
                    }

                    // Verify the password hash.
                    if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                    {
                        throw new InvalidLoginException("Username or password is incorrect.");
                    }

                    // call a method that creates a token.
                    string jwtToken = CreateToken(user);
                    return Ok(new { jwtToken });
                }
                else
                {
                    _logger.LogInformation("Login GET request received.");
                    string denied = "password or username is incorrect";
                    return BadRequest(new { denied });
                }
            }
            catch (InvalidLoginException ex)
            {
                // Handle the custom exception and return a 400 (Bad Request) response with the error message.
                _logger.LogError(ex, "Login failed.");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                // Handle any other exceptions here, log them, and return 404 as response
                _logger.LogError(ex, "An error occurred during login.");
                return StatusCode(404, "An error occurred during login."); // 404 (Not Found)
            }
        }

        private string CreateToken(User user)
        {
            
            List<Claim> Claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Username), new Claim(ClaimTypes.Role, user.UserRole) };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:SecretKey").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                    claims: Claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);


            return jwt;
        }
    }
}
