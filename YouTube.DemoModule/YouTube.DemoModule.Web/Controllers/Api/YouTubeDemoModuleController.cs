using YouTube.DemoModule.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using YouTube.DemoModule.Core;
using YouTube.DemoModule.Core.Services;


namespace YouTube.DemoModule.Web.Controllers.Api
{
    [Route("api/YouTubeDemoModule")]
    public class YouTubeDemoModuleController : Controller
    {
        private readonly IYoutubeSearchService _searchService;
        private readonly IYoutubeDeleteService _deleteService;
        private readonly IYoutubeAddService _addService;

        public YouTubeDemoModuleController(IYoutubeSearchService searchService, IYoutubeDeleteService deleteService, IYoutubeAddService addService)
        {
            _searchService = searchService;
            _deleteService = deleteService;
            _addService = addService;


        }
        // GET: api/YouTubeDemoModule
        /// <summary>
        /// Get message
        /// </summary>
        /// <remarks>Return "Hello world!" message</remarks>
        [HttpGet]
        [Route("")]
        [Authorize(ModuleConstants.Security.Permissions.Read)]
        public ActionResult<string> Get()
        {
            return Ok(new { result = "Hello world!" });
        }


        [HttpPost]
        [Route("search")]
        [Authorize(ModuleConstants.Security.Permissions.Read)]
        public ActionResult<string> Search([FromBody] YoutubeSearchCriteria criteria)
        {
            return Ok( new { result = _searchService.Search(criteria)});
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public JsonResult Add(YoutubeVideo inputData)
        {
           return Json(_addService.Addition(inputData));
        }

        [HttpPost]
        [Route("delete")]
        [Authorize(ModuleConstants.Security.Permissions.Delete)]
        public JsonResult Delete(string id)
        {
            return Json(_deleteService.Delete(id));
        }
    }

}
