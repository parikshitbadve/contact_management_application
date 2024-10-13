
using Core.Interfaces;
using Core.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Infrastructure.Services;

public class ContactService : IContactService
{

    // This is another approach to read the file directly without declaring in program.cs. - Parikshit -13-10-2023
    // private readonly string filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "Infrastructure", "Data", "contacts.json");

    private readonly string filePath;
    public ContactService(string _filePath)
    {
        filePath = _filePath;
    }

    public async Task<IEnumerable<Contact>> GetAllContactsAsync()
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("found file", "sfsff");
            Console.WriteLine(filePath);
            return new List<Contact>();
        }

        var json = await File.ReadAllTextAsync(filePath);
        return JsonConvert.DeserializeObject<List<Contact>>(json) ?? new List<Contact>();
    }

    public async Task<Contact> GetContactByIdAsync(int id)
    {
        var contacts = await GetAllContactsAsync();
        return contacts.FirstOrDefault(c => c.Id == id);
    }

    public async Task AddContactAsync(Contact contact)
    {
        var contacts = (await GetAllContactsAsync()).ToList();
        contact.Id = contacts.Any() ? contacts.Max(c => c.Id) + 1 : 1;
        contacts.Add(contact);

        var json = JsonConvert.SerializeObject(contacts);
        await File.WriteAllTextAsync(filePath, json);
    }

    public async Task UpdateContactAsync(Contact contact)
    {
        var contacts = (await GetAllContactsAsync()).ToList();
        var existingContact = contacts.FirstOrDefault(c => c.Id == contact.Id);
        if (existingContact != null)
        {
            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;

            var json = JsonConvert.SerializeObject(contacts);
            await File.WriteAllTextAsync(filePath, json);
        }
    }

    public async Task DeleteContactAsync(int id)
    {
        var contacts = (await GetAllContactsAsync()).ToList();
        var contactToDelete = contacts.FirstOrDefault(c => c.Id == id);
        if (contactToDelete != null)
        {
            contacts.Remove(contactToDelete);
            var json = JsonConvert.SerializeObject(contacts);
            await File.WriteAllTextAsync(filePath, json);
        }
    }
}


