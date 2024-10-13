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
            // Calls the service to retrieve all contacts.
            var contacts = await _contactService.GetAllContactsAsync();
            // Returns the contacts with status 200 (OK).
            return Ok(contacts);
        }

        /// <summary>
        /// GET: api/contact/{id}
        /// Retrieves a single contact by their ID.
        /// </summary>
        /// <param name="id">The unique ID of the contact.</param>
        /// <returns>Returns the contact if found, otherwise returns a 404 (Not Found).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            // Calls the service to retrieve a specific contact by ID.
            var contact = await _contactService.GetContactByIdAsync(id);

            // If no contact is found, return a 404 (Not Found).
            if (contact == null)
                return NotFound();

            // Returns the found contact with status 200 (OK).
            return Ok(contact);
        }

        /// <summary>
        /// POST: api/contact
        /// Adds a new contact.
        /// </summary>
        /// <param name="contact">The contact object to be added.</param>
        /// <returns>Returns the newly created contact with a 201 (Created) status.</returns>
        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            // Checks if the incoming contact model is valid.
            if (!ModelState.IsValid)
            {
                // If the model is invalid, returns a 400 (Bad Request) with validation errors.
                return BadRequest(ModelState);
            }

            // Calls the service to add the new contact.
            await _contactService.AddContactAsync(contact);

            // Returns a 201 (Created) with the location of the newly created contact.
            return CreatedAtAction(nameof(GetContactById), new { id = contact.Id }, contact);
        }

        /// <summary>
        /// PUT: api/contact/{id}
        /// Updates an existing contact.
        /// </summary>
        /// <param name="id">The ID of the contact to be updated (must match the contact ID in the body).</param>
        /// <param name="contact">The updated contact object.</param>
        /// <returns>Returns 204 (No Content) on successful update, 400 (Bad Request) on error.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact contact)
        {
            // Ensures the ID in the URL matches the ID in the request body.
            if (id != contact.Id)
            {
                // If the IDs don't match, returns a 400 (Bad Request).
                return BadRequest("ID in URL does not match ID in the request body.");
            }

            // Checks if the incoming contact model is valid.
            if (!ModelState.IsValid)
            {
                // If the model is invalid, returns a 400 (Bad Request) with validation errors.
                return BadRequest(ModelState);
            }

            // Calls the service to update the existing contact.
            await _contactService.UpdateContactAsync(contact);

            // Returns a 204 (No Content) as the contact has been successfully updated.
            return NoContent();
        }

        /// <summary>
        /// DELETE: api/contact/{id}
        /// Deletes an existing contact by their ID.
        /// </summary>
        /// <param name="id">The ID of the contact to delete.</param>
        /// <returns>Returns 204 (No Content) on successful deletion.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            // Calls the service to delete the contact by ID.
            await _contactService.DeleteContactAsync(id);

            // Returns a 204 (No Content) after successful deletion.
            return NoContent();
        }
    }

}


