angular.module('YouTube.DemoModule')
.factory('YouTube.DemoModule.WebApi', ['$resource', function ($resource) {
    return $resource('api/YouTubeDemoModule', { },{
        search: { method: 'POST', url: 'api/YouTubeDemoModule/search' },
        remove: { method: 'POST', url: 'api/YouTubeDemoModule/delete',params: { id: '@id' }},
        add: { method: 'POST', url: 'api/YouTubeDemoModule/add' ,params: { id: '@id' }},
    });
    }]);
