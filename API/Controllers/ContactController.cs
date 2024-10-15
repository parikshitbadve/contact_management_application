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
        /// Retrieves all contacts with optional pagination and search.
        /// </summary>
        /// <returns>Returns a list of all contacts in the system.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllContacts(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string searchText = ""
        )
        {
            var contacts = await _contactService.GetAllContactsAsync();

            if (!string.IsNullOrEmpty(searchText))
            {
                searchText = searchText.ToLower();
                contacts = contacts.Where(c =>
                    c.FirstName.ToLower().Contains(searchText) ||
                    c.LastName.ToLower().Contains(searchText) ||
                    c.Email.ToLower().Contains(searchText))
                    .ToList();
            }

            var count = contacts.Count();
            var pagedData = contacts
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var paginatedResponse = new Pagination(pageIndex, pageSize, count, pagedData);

            // Meaningful response message
            if (!pagedData.Any())
            {
                return NotFound(new { message = "No contacts found." });
            }

            return Ok(new { message = "Contacts retrieved successfully.", data = paginatedResponse });
        }

        /// <summary>
        /// GET: api/contact/{id}
        /// Retrieves a single contact by their ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);

            if (contact == null)
            {
                return NotFound(new { message = $"Contact with ID {id} not found." });
            }

            return Ok(new { message = "Contact retrieved successfully.", data = contact });
        }

        /// <summary>
        /// POST: api/contact
        /// Adds a new contact.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid contact data.", errors = ModelState });
            }

            await _contactService.AddContactAsync(contact);

            return CreatedAtAction(nameof(GetContactById), new { id = contact.Id },
                new { message = "Contact created successfully.", data = contact });
        }

        /// <summary>
        /// PUT: api/contact/{id}
        /// Updates an existing contact.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest(new { message = "ID in URL does not match ID in the request body." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid contact data.", errors = ModelState });
            }

            var existingContact = await _contactService.GetContactByIdAsync(id);
            if (existingContact == null)
            {
                return NotFound(new { message = $"Contact with ID {id} not found." });
            }

            await _contactService.UpdateContactAsync(contact);

            return Ok(new { message = "Contact updated successfully." });
        }

        /// <summary>
        /// DELETE: api/contact/{id}
        /// Deletes an existing contact by their ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var existingContact = await _contactService.GetContactByIdAsync(id);
            if (existingContact == null)
            {
                return NotFound(new { message = $"Contact with ID {id} not found." });
            }

            await _contactService.DeleteContactAsync(id);

            return Ok(new { message = $"Contact with ID {id} deleted successfully." });
        }
    }
}
