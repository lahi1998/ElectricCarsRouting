using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServerMkcert;
using System.Text;

var MyAllowAnyOrigin = "_myAllowAnyOrigin";

var builder = WebApplication.CreateBuilder(args);

// Load configuration from appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowAnyOrigin,
                      policy =>
                      {
                          policy.AllowAnyOrigin() // Allow any origin
                                .AllowAnyHeader() // Allow any header
                                .AllowAnyMethod(); // Allow any HTTP method
                      });
});

// Configure your database connection here
string connectionString = "Server=localhost;Database=electric_cars;User=Remote;Password=Kode1234!;";
// Specify the server version
ServerVersion serverVersion = ServerVersion.AutoDetect(connectionString);

builder.Services.AddDbContext<DBConnector>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 26)))
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Secret key bond james bond music"))
    };
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(MyAllowAnyOrigin);
app.UseMiddleware<TokenLoggingMiddleware>();
app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
