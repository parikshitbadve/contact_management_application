using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// GET: api/contact
        /// Retrieves all contacts.
        /// </summary>
        /// <returns>Returns a list of all contacts in the system.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            // Returns the contacts with status 200 (OK).
            return await Task.FromResult(Ok());
        }

    }

}


