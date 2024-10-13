using System.Net;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                // Call the next middleware in the pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                // Handle any exception that occurs during request processing
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            // Set the status code and content type for the error response
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // 500 status code
            context.Response.ContentType = "application/json";

            // Customize the error message . If require we can save this error message (stack trace) in the database.
            var errorResponse = new
            {
                message = "An unexpected error occurred. Please try again later.",
                error = ex.Message
            };

            // Return the error response as JSON
            return context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}