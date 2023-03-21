using Microsoft.AspNetCore.Mvc;
using MyProjectt.Models;

namespace MyBackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost("login")]
        public UserDetails Login( LoginData loginData)
        {
            // loginData.Email and loginData.Password will contain the values sent from Angular

            // Authenticate the user and generate a token
            return  AuthenticateUser(loginData.Email, loginData.Password);
        }

        public UserDetails AuthenticateUser(string email, string password)
        {
           
            string token = GenerateToken(email, password);
         User u = new LibraryContext().Users.Where(user => user.Email == email && user.Password == password)
        .FirstOrDefault<User>();

            UserDetails userDetails = new UserDetails();
            userDetails.user = u;
            userDetails.token = token;

            return userDetails;

        }

        static string GenerateToken(string email, string password)
        {

            return email+' '+password;

        }
    }


}




    


