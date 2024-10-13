using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Contact
{
    //auto-incremented Id
    public int Id { get; set; }

    [Required(ErrorMessage = "First name is required.")]
    [StringLength(50, ErrorMessage = "First name can't be longer than 50 characters.")]
    public required string FirstName { get; set; }
    [Required(ErrorMessage = "Last name is required.")]
    [StringLength(50, ErrorMessage = "Last name can't be longer than 50 characters.")]
    public required string LastName { get; set; }
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public required string Email { get; set; }

}
