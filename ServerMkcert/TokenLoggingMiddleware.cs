using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ServerMkcert
{
    public class TokenLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TokenLoggingMiddleware> _logger;

        public TokenLoggingMiddleware(RequestDelegate next, ILogger<TokenLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var token = context.Request.Headers["Authorization"].ToString();
                _logger.LogInformation($"Received JWT token: {token}");

                // Parse the JWT token to extract claims, including the role claim
                var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                if (handler.CanReadToken(token))
                {
                    var jwtToken = handler.ReadJwtToken(token);
                    var roleClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role);
                    if (roleClaim != null)
                    {
                        var userRole = roleClaim.Value;
                        _logger.LogInformation($"User has role: {userRole}");
                    }
                }
            }

            await _next(context);
        }
    }


}
