using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProjectt.Models;

namespace MyBackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {

        [HttpGet("getProject")]
        public List<Project> Get()
        {
            string token = Request.Headers["authorization"].FirstOrDefault();
            UserDetails user = getUserByToken(token);
            if (user.user != null)
                return new LibraryContext().Projects.Where(project => project.IdUser == user.user.UserId).ToList();
            return null;
        }
        public UserDetails getUserByToken(string token)
        {
            char spearator = ' ';
            string email = "";
            string password = "";

            String[] strlist = token.Split(spearator, StringSplitOptions.RemoveEmptyEntries);
            if (strlist.Length == 3)
            {
                email = strlist[1];
                password = strlist[2];
                UserController userController = new UserController();
                return userController.AuthenticateUser(email, password);
            }
            return null;


        }
    }
}
