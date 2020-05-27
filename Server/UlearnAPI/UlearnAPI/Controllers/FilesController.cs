using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace UlearnAPI.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _appEnvironment;

        public FilesController(IWebHostEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }

        [HttpGet("download")]
        public IActionResult Download(string fileName)  
        {  
            if (fileName == null)  
                return Content("filename not present");  
  
            var path = _appEnvironment.ContentRootPath + "/Files/" + fileName;

            var bytes = System.IO.File.ReadAllBytes(path);

            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out var contentType);
            contentType ??= "application/octet-stream";
            return File(bytes, contentType);  
        }
    }
}