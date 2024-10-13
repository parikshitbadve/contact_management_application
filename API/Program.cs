using Core.Interfaces;
using Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Swagger implimentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "Infrastructure", "Data", "contacts.json");
// Register all the service
builder.Services.AddScoped<IContactService, ContactService>(provider => new ContactService(filePath));
builder.Services.AddCors();
var app = builder.Build();

// custom error handling middleware
app.UseMiddleware<API.Middleware.ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x =>
{
    x.AllowAnyMethod()
          .AllowAnyHeader()
    .WithOrigins("http://localhost:4200", "http://localhost:4200");
});

app.MapControllers();

app.Run();
