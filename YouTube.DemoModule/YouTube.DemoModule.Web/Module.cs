using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using VirtoCommerce.Platform.Core.Bus;
using VirtoCommerce.Platform.Core.Modularity;
using VirtoCommerce.Platform.Core.Security;
using VirtoCommerce.Platform.Core.Settings;
using YouTube.DemoModule.Core;
using YouTube.DemoModule.Core.Events;
using YouTube.DemoModule.Data.Handlers;
using YouTube.DemoModule.Core.Services;
using YouTube.DemoModule.Data.Repositories;
using YouTube.DemoModule.Data.Services;

namespace YouTube.DemoModule.Web
{
    public class Module : IModule
    {
        public ManifestModuleInfo ModuleInfo { get; set; }

        public void Initialize(IServiceCollection serviceCollection)
        {
            // database initialization
            var configuration = serviceCollection.BuildServiceProvider().GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString("VirtoCommerce.YouTubeDemoModule") ?? configuration.GetConnectionString("VirtoCommerce");
            serviceCollection.AddDbContext<YouTubeDemoModuleDbContext>(options => options.UseSqlServer(connectionString));
            serviceCollection.AddTransient<IYoutubeRepository, YoutubeRepository>();
            serviceCollection.AddSingleton<Func<IYoutubeRepository>>(provider => () => provider.CreateScope().ServiceProvider.GetRequiredService<IYoutubeRepository>());
            serviceCollection.AddTransient<IYoutubeSearchService, YoutubeSearchService>();
            serviceCollection.AddTransient<IYoutubeDeleteService, YoutubeDeleteService>();
            serviceCollection.AddTransient<IYoutubeAddService, YoutubeAddService>();
            serviceCollection.AddTransient<VideoAdditionHandler>();
        }

        public void PostInitialize(IApplicationBuilder appBuilder)
        {
            // register settings
            var settingsRegistrar = appBuilder.ApplicationServices.GetRequiredService<ISettingsRegistrar>();
            settingsRegistrar.RegisterSettings(ModuleConstants.Settings.AllSettings, ModuleInfo.Id);

            // register permissions
            var permissionsProvider = appBuilder.ApplicationServices.GetRequiredService<IPermissionsRegistrar>();
            permissionsProvider.RegisterPermissions(ModuleConstants.Security.Permissions.AllPermissions.Select(x =>
                new Permission()
                {
                    GroupName = "YouTubeDemoModule",
                    ModuleId = ModuleInfo.Id,
                    Name = x
                }).ToArray());

            // Ensure that any pending migrations are applied
            using (var serviceScope = appBuilder.ApplicationServices.CreateScope())
            {
                using (var dbContext = serviceScope.ServiceProvider.GetRequiredService<YouTubeDemoModuleDbContext>())
                {
                    dbContext.Database.EnsureCreated();
                    dbContext.Database.Migrate();
                }
            }
            var inProcess = appBuilder.ApplicationServices.GetService<IHandlerRegistrar>();
            inProcess.RegisterHandler<VideoAdditionEvent>(async (message, token) => await appBuilder.ApplicationServices.GetService<VideoAdditionHandler>().Handle(message));
        }

        public void Uninstall()
        {
            // do nothing in here
        }

    }

}
