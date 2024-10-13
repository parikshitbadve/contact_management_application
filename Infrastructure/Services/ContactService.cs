
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

    public Task AddContactAsync(Contact contact)
    {
        throw new NotImplementedException();
    }

    public Task DeleteContactAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Contact>> GetAllContactsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Contact> GetContactByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task UpdateContactAsync(Contact contact)
    {
        throw new NotImplementedException();
    }
}


