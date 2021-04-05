//Call this to register our module to main application
var moduleTemplateName = "YouTube.DemoModule";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('workspace.YouTubeDemoModule', {
                url: '/youTubeDemoModule',
                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                controller: [
                    '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                        var newBlade = {
                            id: 'videoList',
                            controller: 'YouTube.DemoModule.videoListController',
                            template: 'Modules/$(YouTube.DemoModule)/Scripts/blades/video-list.tpl.html',
                            isClosingDisabled: true,
                        };
                        bladeNavigationService.showBlade(newBlade);
                    }
                ]
            });
            
    }
])
    .run(['$rootScope', 'platformWebApp.mainMenuService', 'platformWebApp.widgetService', '$state', 'platformWebApp.authService',
    function ($rootScope, mainMenuService, widgetService, $state, authService) {

        
        var menuItem = {
            path: 'browse/YouTubeDemoModule',
            icon: 'fa fa-youtube',
            title: 'YouTube Video',
            priority: 100,
            action: function () { $state.go('workspace.YouTubeDemoModule') },
            permission: 'YouTube.DemoModule:read'
        };
        mainMenuService.addMenuItem(menuItem);

    }
]);
