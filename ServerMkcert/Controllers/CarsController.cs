using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerMkcert.Models;
using System.Collections.Generic;
using System.Data;

namespace ServerMkcert.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        public static Car user = new Car();
        private readonly ILogger<HomeController> _logger;
        private readonly DBConnector _context;
        private readonly IConfiguration _configuration;

        public CarsController(ILogger<HomeController> logger, DBConnector context, IConfiguration configuration)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;
        }

        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        // adds a car in the database
        [HttpPost("addCar")]
        public IActionResult AddCar(CarDTO newCar)
        {
            if (newCar == null)
            {
                return BadRequest("Invalid car data");
            }

            // Create a new Car object from the CarDTO
            Car carToAdd = new Car
            {
                Model = newCar.Model,
                Amount = newCar.Amount,
                ChangeAmount = newCar.ChangeAmount
            };

            // Add the new car to the database.
            _context.cars.Add(carToAdd);
            _context.SaveChanges();

            _logger.LogInformation("Car added");
            return Ok(true);
        }

        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        // updates a car in the database
        [HttpPost("updateCar")]
        public async Task<IActionResult> UpdateCar(CarDTO newCar)
        {
            if (newCar == null)
            {
                return BadRequest("Invalid car data");
            }
            else
            {
                _logger.LogInformation("Delete POST request received.");
                var Carlist = await _context.cars.FromSqlRaw("CALL GetCar({0})", newCar.Model).ToListAsync();
                var Carupdate = Carlist.FirstOrDefault(); // Use FirstOrDefault() instead of [0].

                if (Carupdate != null)
                { 
                _context.users.FromSqlRaw("CALL UpdateCar({0}, {1}, {2}, {3})", Carupdate.Nr, newCar.Model, newCar.Amount, newCar.ChangeAmount);
                _logger.LogInformation("Car updated");
                return Ok(true);
                }
                else
                {
                    return BadRequest("Invalid car data");
                }
            }
        }

        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        // delete car from the database
        [HttpPost("deleteCar")]
        public async Task<IActionResult> DeleteCar(CarDTO request)
        {
            _logger.LogInformation("Delete POST request received.");
            var Carlist = await _context.cars.FromSqlRaw("CALL GetCar({0})", request.Model).ToListAsync();
            var CarDelete = Carlist.FirstOrDefault(); // Use FirstOrDefault() instead of [0].

            if (CarDelete == null)
            {
                return BadRequest("Invalid car model");
            }
            else
            {
                _context.cars.FromSqlRaw("CALL DeleteCar({0})", CarDelete.Nr);
                _logger.LogInformation("Car deleted");
                return Ok(true);
            }
        }

        // Authorize(Roles = "Admin") midlertidigt fjernet, problem med authorize.
        [HttpGet("getAllCars")]
        public async Task<IActionResult> GetAllCars()
        {
            var Carslist = await _context.cars.FromSqlRaw("CALL GetCars()").ToListAsync();
            return Ok(Carslist);
        }
    }
}

