using YouTube.DemoModule.Core.Models;
using YouTube.DemoModule.Core.Services;
using YouTube.DemoModule.Data.Repositories;
using System.Linq;
using System.Threading.Tasks;


namespace YouTube.DemoModule.Data.Services
{
    public class YoutubeDeleteService : IYoutubeDeleteService
    {
        private readonly IYoutubeRepository _repository;

        public YoutubeDeleteService(IYoutubeRepository repository)
        {
            _repository = repository;
        }

        public string Delete(string id)
        {

            try
            {

                var item = _repository.YoutubeVideos.Where(q => q.ProductId == id).FirstOrDefault();
                if (item != null)
                {
                    
                    YouTubeDemoModuleDbContext context = new YouTubeDemoModuleDbContext();
                    context.Videos.Remove(item);
                    context.SaveChanges();
                    return "Success";
                }

                
                return "Failed";
            }
            catch (System.Exception e)
            {
                
                return e.Message;
            }
        }

    }
}

