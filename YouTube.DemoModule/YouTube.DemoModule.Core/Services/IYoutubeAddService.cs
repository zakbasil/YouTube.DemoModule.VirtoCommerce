using YouTube.DemoModule.Core.Models;
using System.Threading.Tasks;


namespace YouTube.DemoModule.Core.Services
{
    public interface IYoutubeAddService
    {
        public string Add(YoutubeVideo sample);
        Task<string> Addition(YoutubeVideo video);
    }

}
