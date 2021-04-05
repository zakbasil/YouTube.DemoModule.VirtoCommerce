using VirtoCommerce.Platform.Core.Common;

namespace YouTube.DemoModule.Core.Models
{
    public class YoutubeVideo : AuditableEntity
    {
        public string ProductId { get; set; }
        public string YoutubeId { get; set; }

        public string VideoTitle { get; set; }
    }
}