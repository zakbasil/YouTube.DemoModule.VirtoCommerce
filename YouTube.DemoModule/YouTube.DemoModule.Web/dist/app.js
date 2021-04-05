/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/YouTubeDemoModule.js":
/*!**************************************!*\
  !*** ./Scripts/YouTubeDemoModule.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./Scripts/blades/video-addition.js":
/*!******************************************!*\
  !*** ./Scripts/blades/video-addition.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿angular.module('YouTube.DemoModule')
    .controller('YouTube.DemoModule.videoAdditionController', ['$rootScope', '$scope', 'platformWebApp.bladeNavigationService', 'platformWebApp.settings', 'virtoCommerce.catalogModule.categories', 'YouTube.DemoModule.WebApi', 'platformWebApp.metaFormsService', function ($rootScope, $scope, bladeNavigationService, settings, categories, videoAPI, metaFormsService) {
        var blade = $scope.blade;
        blade.updatePermission = 'YouTubeDemoModule:update';

        blade.isLoading = false;

        blade.origEntity = blade.currentEntity;
        //blade.securityScopes = blade.currentEntity.securityScopes;
        blade.currentEntity = angular.copy(blade.currentEntity);


        blade.formScope = null;
        $scope.setForm = function (form) { blade.formScope = form; };

        function isDirty() {
            return !angular.equals(blade.currentEntity, blade.origEntity) /*&& blade.hasUpdatePermission()*/;
        };

        function canSave() {
            return isDirty() && blade.formScope && blade.formScope.$valid;
        }

        function saveChanges() {
            blade.isLoading = true;
            videoAPI.add({
                id: blade.currentEntity.id,
                videoTitle: blade.currentEntity.videoTitle,
                createdDate: blade.currentEntity.createdDate,
                createdBy: blade.currentEntity.createdBy,
                modifiedBy: blade.currentEntity.modifiedBy,
                modifiedData: blade.currentEntity.modifiedDate,
                productId: blade.currentEntity.productId,
                youtubeId: blade.currentEntity.youtubeId

            }, null,
                function (data, headers) {
                    blade.isLoading = false;
                    blade.parentBlade.refresh(true);
                    blade.origEntity = blade.currentEntity;
                    $scope.bladeClose();
                },
                function (error) {
                    bladeNavigationService.setError('Error ' + error.status, blade);
                    blade.isLoading = false;
                });
        };


        blade.onClose = function (closeCallback) {
            bladeNavigationService.showConfirmationIfNeeded(isDirty(), canSave(), blade, saveChanges, closeCallback, "customerReviews.dialogs.customerReview-save.title", "customerReviews.dialogs.customerReview-save.message");
        };


        blade.toolbarCommands = [
            {
                name: "Save", icon: 'fa fa-save',
                executeMethod: saveChanges,
                canExecuteMethod: function()
                {
                    return true;
                },
                permission: blade.updatePermission
            }
        ];

    }]);

/***/ }),

/***/ "./Scripts/blades/video-detail.js":
/*!****************************************!*\
  !*** ./Scripts/blades/video-detail.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿angular.module('YouTube.DemoModule')
    .controller('YouTube.DemoModule.videoDetailController', ['$rootScope', '$scope', 'platformWebApp.bladeNavigationService', 'platformWebApp.settings', 'virtoCommerce.catalogModule.categories', 'YouTube.DemoModule.WebApi', 'platformWebApp.metaFormsService', function ($rootScope, $scope, bladeNavigationService, settings, categories, videoAPI, metaFormsService) {
        var blade = $scope.blade;
        blade.updatePermission = 'YouTubeDemoModule:update';

        blade.isLoading = false;

        blade.origEntity = blade.currentEntity;
        blade.securityScopes = blade.currentEntity.securityScopes;
        blade.currentEntity = angular.copy(blade.currentEntity);


        blade.formScope = null;
        $scope.setForm = function (form) { blade.formScope = form; };

        function isDirty() {
            return !angular.equals(blade.currentEntity, blade.origEntity) /*&& blade.hasUpdatePermission()*/;
        };

        function canSave() {
            return isDirty() && blade.formScope && blade.formScope.$valid;
        }

        function saveChanges() {
            blade.isLoading = true;
            videoAPI.add({}, [blade.currentEntity],
                function (data, headers) {
                    blade.isLoading = false;
                    blade.parentBlade.refresh(true);
                    blade.origEntity = blade.currentEntity;
                    $scope.bladeClose();
                },
                function (error) {
                    bladeNavigationService.setError('Error ' + error.status, blade);
                    blade.isLoading = false;
                });
        };

        function deleteVideo() {
            blade.isLoading = true;
            videoAPI.remove({id:blade.currentEntity.id}, null,
                function (data, headers) {
                    blade.isLoading = false;
                    blade.parentBlade.refresh(true);
                    blade.origEntity = blade.currentEntity;
                    $scope.bladeClose();
                },
                function (error) {
                    bladeNavigationService.setError('Error ' + error.status, blade);
                    blade.isLoading = false;
                });
        };
        blade.onClose = function (closeCallback) {
            bladeNavigationService.showConfirmationIfNeeded(isDirty(), canSave(), blade, saveChanges, closeCallback, "customerReviews.dialogs.customerReview-save.title", "customerReviews.dialogs.customerReview-save.message");
        };


        blade.toolbarCommands = [
            {
                name: "Remove", icon: 'fa fa-trash',
                executeMethod: deleteVideo,
                canExecuteMethod: function()
                {
                    return true;
                },
                permission: blade.updatePermission
            }
        ];

    }]);

/***/ }),

/***/ "./Scripts/blades/video-list.js":
/*!**************************************!*\
  !*** ./Scripts/blades/video-list.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

angular.module('YouTube.DemoModule')
    .controller('YouTube.DemoModule.videoListController', ['$scope', 'YouTube.DemoModule.WebApi', 'platformWebApp.bladeUtils', 'uiGridConstants', 'platformWebApp.uiGridHelper', 'platformWebApp.authService',
        function ($scope, searchApi, bladeUtils, uiGridConstants, uiGridHelper, authService) {
            var vm = this;

            $scope.uiGridConstants = uiGridConstants;

            var blade = $scope.blade;
            var bladeNavigationService = bladeUtils.bladeNavigationService;
            

            blade.refresh = function () {
                blade.isLoading = true;
                var statuses = null;
                searchApi.search(angular.extend(filter, {
                    skip: ($scope.pageSettings.currentPage - 1) * $scope.pageSettings.itemsPerPageCount,
                    take: $scope.pageSettings.itemsPerPageCount
                }), function (data) {
                    blade.isLoading = false;
                    $scope.pageSettings.totalItems = data.result.result.totalCount;
                    blade.currentEntities = data.result.result.results;
                });
            }

            blade.selectNode = function (data) {
                $scope.selectedNodeId = data.id;

                if (!authService.checkPermission('YouTube.DemoModule:update')) {
                    return;
                }

                var newBlade = {
                    id: 'videoDetails',
                    currentEntityId: data.id,
                    currentEntity: angular.copy(data),
                    title: 'Video Details',
                    controller: 'YouTube.DemoModule.videoDetailController',
                    template: 'Modules/$(YouTube.DemoModule)/Scripts/blades/video-detail.tpl.html'
                };
                // newBlade.metaFields = [
                //     {
                //         name: 'content',
                //         title: 'Content',
                //         valueType: 'LongText',
                //     },
                //     {
                //         name: 'rating',
                //         valueType: 'Integer'
                //     }];
                bladeNavigationService.showBlade(newBlade, blade);
            }    


            blade.addNode = function () {
                $scope.selectedNodeId = null;

                if (!authService.checkPermission('YouTube.DemoModule:update')) {
                    return;
                }

                var addBlade = {
                    id: 'videoAddition',
                    title: 'Add New Video',
                    controller: 'YouTube.DemoModule.videoAdditionController',
                    template: 'Modules/$(YouTube.DemoModule)/Scripts/blades/video-addition.tpl.html'
                };
                addBlade.metaFields = [
                    {
                        name: 'content',
                        title: 'Content',
                        valueType: 'LongText',
                    },
                    {
                        name: 'rating',
                        valueType: 'Integer'
                    }];
                bladeNavigationService.showBlade(addBlade, blade);
            }
            
            blade.headIcon = 'fa fa-youtube';
            blade.title = 'YouTube Video Search';

            blade.toolbarCommands = [
                {
                    name: "platform.commands.refresh", icon: 'fa fa-refresh',
                    executeMethod: blade.refresh,
                    canExecuteMethod: function () {
                        return true;
                    }
                },
                {
                    name: "Add Video", icon: 'fa fa-plus',
                    executeMethod: blade.addNode,
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'YouTube.DemoModule:update'
                }
            ];


            // simple and advanced filtering
            var filter = $scope.filter = blade.filter || {};

        

            filter.criteriaChanged = function () {
                if ($scope.pageSettings.currentPage > 1) {
                    $scope.pageSettings.currentPage = 1;
                } else {
                    blade.refresh();
                }
            };

            // ui-grid
            $scope.setGridOptions = function (gridOptions) {
                uiGridHelper.initialize($scope, gridOptions, function (gridApi) {
                    uiGridHelper.bindRefreshOnSortChanged($scope);
                });
                bladeUtils.initializePagination($scope);
            };

        }]);


/***/ }),

/***/ "./Scripts/resources/SearchCaching.WebApi.js":
/*!***************************************************!*\
  !*** ./Scripts/resources/SearchCaching.WebApi.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿angular.module('YouTube.DemoModule')
  .factory('superCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('super-cache');
  }]);

/***/ }),

/***/ "./Scripts/resources/YouTube.DemoModule.WebApi.js":
/*!********************************************************!*\
  !*** ./Scripts/resources/YouTube.DemoModule.WebApi.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

angular.module('YouTube.DemoModule')
.factory('YouTube.DemoModule.WebApi', ['$resource', function ($resource) {
    return $resource('api/YouTubeDemoModule', { },{
        search: { method: 'POST', url: 'api/YouTubeDemoModule/search' },
        remove: { method: 'POST', url: 'api/YouTubeDemoModule/delete',params: { id: '@id' }},
        add: { method: 'POST', url: 'api/YouTubeDemoModule/add' ,params: { id: '@id' }},
    });
    }]);


/***/ }),

/***/ 0:
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./Scripts/YouTubeDemoModule.js ./Scripts/blades/video-addition.js ./Scripts/blades/video-detail.js ./Scripts/blades/video-list.js ./Scripts/resources/SearchCaching.WebApi.js ./Scripts/resources/YouTube.DemoModule.WebApi.js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./Scripts/YouTubeDemoModule.js */"./Scripts/YouTubeDemoModule.js");
__webpack_require__(/*! ./Scripts/blades/video-addition.js */"./Scripts/blades/video-addition.js");
__webpack_require__(/*! ./Scripts/blades/video-detail.js */"./Scripts/blades/video-detail.js");
__webpack_require__(/*! ./Scripts/blades/video-list.js */"./Scripts/blades/video-list.js");
__webpack_require__(/*! ./Scripts/resources/SearchCaching.WebApi.js */"./Scripts/resources/SearchCaching.WebApi.js");
module.exports = __webpack_require__(/*! ./Scripts/resources/YouTube.DemoModule.WebApi.js */"./Scripts/resources/YouTube.DemoModule.WebApi.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zb3VUdWJlRGVtb01vZHVsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Zb3VUdWJlRGVtb01vZHVsZS8uL1NjcmlwdHMvWW91VHViZURlbW9Nb2R1bGUuanMiLCJ3ZWJwYWNrOi8vWW91VHViZURlbW9Nb2R1bGUvLi9TY3JpcHRzL2JsYWRlcy92aWRlby1hZGRpdGlvbi5qcyIsIndlYnBhY2s6Ly9Zb3VUdWJlRGVtb01vZHVsZS8uL1NjcmlwdHMvYmxhZGVzL3ZpZGVvLWRldGFpbC5qcyIsIndlYnBhY2s6Ly9Zb3VUdWJlRGVtb01vZHVsZS8uL1NjcmlwdHMvYmxhZGVzL3ZpZGVvLWxpc3QuanMiLCJ3ZWJwYWNrOi8vWW91VHViZURlbW9Nb2R1bGUvLi9TY3JpcHRzL3Jlc291cmNlcy9TZWFyY2hDYWNoaW5nLldlYkFwaS5qcyIsIndlYnBhY2s6Ly9Zb3VUdWJlRGVtb01vZHVsZS8uL1NjcmlwdHMvcmVzb3VyY2VzL1lvdVR1YmUuRGVtb01vZHVsZS5XZWJBcGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQs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OERBQThELGFBQWE7QUFDNUYsY0FBYyw0REFBNEQsYUFBYTtBQUN2RixLQUFLO0FBQ0wsS0FBSyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvL0NhbGwgdGhpcyB0byByZWdpc3RlciBvdXIgbW9kdWxlIHRvIG1haW4gYXBwbGljYXRpb25cbnZhciBtb2R1bGVUZW1wbGF0ZU5hbWUgPSBcIllvdVR1YmUuRGVtb01vZHVsZVwiO1xuXG5pZiAoQXBwRGVwZW5kZW5jaWVzICE9IHVuZGVmaW5lZCkge1xuICAgIEFwcERlcGVuZGVuY2llcy5wdXNoKG1vZHVsZVRlbXBsYXRlTmFtZSk7XG59XG5cbmFuZ3VsYXIubW9kdWxlKG1vZHVsZVRlbXBsYXRlTmFtZSwgW10pXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCd3b3Jrc3BhY2UuWW91VHViZURlbW9Nb2R1bGUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3lvdVR1YmVEZW1vTW9kdWxlJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJyQoUGxhdGZvcm0pL1NjcmlwdHMvY29tbW9uL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICckc2NvcGUnLCAncGxhdGZvcm1XZWJBcHAuYmxhZGVOYXZpZ2F0aW9uU2VydmljZScsIGZ1bmN0aW9uICgkc2NvcGUsIGJsYWRlTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdCbGFkZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3ZpZGVvTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1lvdVR1YmUuRGVtb01vZHVsZS52aWRlb0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ01vZHVsZXMvJChZb3VUdWJlLkRlbW9Nb2R1bGUpL1NjcmlwdHMvYmxhZGVzL3ZpZGVvLWxpc3QudHBsLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xvc2luZ0Rpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYWRlTmF2aWdhdGlvblNlcnZpY2Uuc2hvd0JsYWRlKG5ld0JsYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgfVxuXSlcbiAgICAucnVuKFsnJHJvb3RTY29wZScsICdwbGF0Zm9ybVdlYkFwcC5tYWluTWVudVNlcnZpY2UnLCAncGxhdGZvcm1XZWJBcHAud2lkZ2V0U2VydmljZScsICckc3RhdGUnLCAncGxhdGZvcm1XZWJBcHAuYXV0aFNlcnZpY2UnLFxuICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBtYWluTWVudVNlcnZpY2UsIHdpZGdldFNlcnZpY2UsICRzdGF0ZSwgYXV0aFNlcnZpY2UpIHtcblxuICAgICAgICBcbiAgICAgICAgdmFyIG1lbnVJdGVtID0ge1xuICAgICAgICAgICAgcGF0aDogJ2Jyb3dzZS9Zb3VUdWJlRGVtb01vZHVsZScsXG4gICAgICAgICAgICBpY29uOiAnZmEgZmEteW91dHViZScsXG4gICAgICAgICAgICB0aXRsZTogJ1lvdVR1YmUgVmlkZW8nLFxuICAgICAgICAgICAgcHJpb3JpdHk6IDEwMCxcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkgeyAkc3RhdGUuZ28oJ3dvcmtzcGFjZS5Zb3VUdWJlRGVtb01vZHVsZScpIH0sXG4gICAgICAgICAgICBwZXJtaXNzaW9uOiAnWW91VHViZS5EZW1vTW9kdWxlOnJlYWQnXG4gICAgICAgIH07XG4gICAgICAgIG1haW5NZW51U2VydmljZS5hZGRNZW51SXRlbShtZW51SXRlbSk7XG5cbiAgICB9XG5dKTtcbiIsIu+7v2FuZ3VsYXIubW9kdWxlKCdZb3VUdWJlLkRlbW9Nb2R1bGUnKVxuICAgIC5jb250cm9sbGVyKCdZb3VUdWJlLkRlbW9Nb2R1bGUudmlkZW9BZGRpdGlvbkNvbnRyb2xsZXInLCBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJ3BsYXRmb3JtV2ViQXBwLmJsYWRlTmF2aWdhdGlvblNlcnZpY2UnLCAncGxhdGZvcm1XZWJBcHAuc2V0dGluZ3MnLCAndmlydG9Db21tZXJjZS5jYXRhbG9nTW9kdWxlLmNhdGVnb3JpZXMnLCAnWW91VHViZS5EZW1vTW9kdWxlLldlYkFwaScsICdwbGF0Zm9ybVdlYkFwcC5tZXRhRm9ybXNTZXJ2aWNlJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgYmxhZGVOYXZpZ2F0aW9uU2VydmljZSwgc2V0dGluZ3MsIGNhdGVnb3JpZXMsIHZpZGVvQVBJLCBtZXRhRm9ybXNTZXJ2aWNlKSB7XG4gICAgICAgIHZhciBibGFkZSA9ICRzY29wZS5ibGFkZTtcbiAgICAgICAgYmxhZGUudXBkYXRlUGVybWlzc2lvbiA9ICdZb3VUdWJlRGVtb01vZHVsZTp1cGRhdGUnO1xuXG4gICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGJsYWRlLm9yaWdFbnRpdHkgPSBibGFkZS5jdXJyZW50RW50aXR5O1xuICAgICAgICAvL2JsYWRlLnNlY3VyaXR5U2NvcGVzID0gYmxhZGUuY3VycmVudEVudGl0eS5zZWN1cml0eVNjb3BlcztcbiAgICAgICAgYmxhZGUuY3VycmVudEVudGl0eSA9IGFuZ3VsYXIuY29weShibGFkZS5jdXJyZW50RW50aXR5KTtcblxuXG4gICAgICAgIGJsYWRlLmZvcm1TY29wZSA9IG51bGw7XG4gICAgICAgICRzY29wZS5zZXRGb3JtID0gZnVuY3Rpb24gKGZvcm0pIHsgYmxhZGUuZm9ybVNjb3BlID0gZm9ybTsgfTtcblxuICAgICAgICBmdW5jdGlvbiBpc0RpcnR5KCkge1xuICAgICAgICAgICAgcmV0dXJuICFhbmd1bGFyLmVxdWFscyhibGFkZS5jdXJyZW50RW50aXR5LCBibGFkZS5vcmlnRW50aXR5KSAvKiYmIGJsYWRlLmhhc1VwZGF0ZVBlcm1pc3Npb24oKSovO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhblNhdmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNEaXJ0eSgpICYmIGJsYWRlLmZvcm1TY29wZSAmJiBibGFkZS5mb3JtU2NvcGUuJHZhbGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZUNoYW5nZXMoKSB7XG4gICAgICAgICAgICBibGFkZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdmlkZW9BUEkuYWRkKHtcbiAgICAgICAgICAgICAgICBpZDogYmxhZGUuY3VycmVudEVudGl0eS5pZCxcbiAgICAgICAgICAgICAgICB2aWRlb1RpdGxlOiBibGFkZS5jdXJyZW50RW50aXR5LnZpZGVvVGl0bGUsXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGU6IGJsYWRlLmN1cnJlbnRFbnRpdHkuY3JlYXRlZERhdGUsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEJ5OiBibGFkZS5jdXJyZW50RW50aXR5LmNyZWF0ZWRCeSxcbiAgICAgICAgICAgICAgICBtb2RpZmllZEJ5OiBibGFkZS5jdXJyZW50RW50aXR5Lm1vZGlmaWVkQnksXG4gICAgICAgICAgICAgICAgbW9kaWZpZWREYXRhOiBibGFkZS5jdXJyZW50RW50aXR5Lm1vZGlmaWVkRGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IGJsYWRlLmN1cnJlbnRFbnRpdHkucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHlvdXR1YmVJZDogYmxhZGUuY3VycmVudEVudGl0eS55b3V0dWJlSWRcblxuICAgICAgICAgICAgfSwgbnVsbCxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSwgaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGUucGFyZW50QmxhZGUucmVmcmVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGUub3JpZ0VudGl0eSA9IGJsYWRlLmN1cnJlbnRFbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5ibGFkZUNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zZXRFcnJvcignRXJyb3IgJyArIGVycm9yLnN0YXR1cywgYmxhZGUpO1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGJsYWRlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zaG93Q29uZmlybWF0aW9uSWZOZWVkZWQoaXNEaXJ0eSgpLCBjYW5TYXZlKCksIGJsYWRlLCBzYXZlQ2hhbmdlcywgY2xvc2VDYWxsYmFjaywgXCJjdXN0b21lclJldmlld3MuZGlhbG9ncy5jdXN0b21lclJldmlldy1zYXZlLnRpdGxlXCIsIFwiY3VzdG9tZXJSZXZpZXdzLmRpYWxvZ3MuY3VzdG9tZXJSZXZpZXctc2F2ZS5tZXNzYWdlXCIpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgYmxhZGUudG9vbGJhckNvbW1hbmRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU2F2ZVwiLCBpY29uOiAnZmEgZmEtc2F2ZScsXG4gICAgICAgICAgICAgICAgZXhlY3V0ZU1ldGhvZDogc2F2ZUNoYW5nZXMsXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZU1ldGhvZDogZnVuY3Rpb24oKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBibGFkZS51cGRhdGVQZXJtaXNzaW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICB9XSk7Iiwi77u/YW5ndWxhci5tb2R1bGUoJ1lvdVR1YmUuRGVtb01vZHVsZScpXG4gICAgLmNvbnRyb2xsZXIoJ1lvdVR1YmUuRGVtb01vZHVsZS52aWRlb0RldGFpbENvbnRyb2xsZXInLCBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJ3BsYXRmb3JtV2ViQXBwLmJsYWRlTmF2aWdhdGlvblNlcnZpY2UnLCAncGxhdGZvcm1XZWJBcHAuc2V0dGluZ3MnLCAndmlydG9Db21tZXJjZS5jYXRhbG9nTW9kdWxlLmNhdGVnb3JpZXMnLCAnWW91VHViZS5EZW1vTW9kdWxlLldlYkFwaScsICdwbGF0Zm9ybVdlYkFwcC5tZXRhRm9ybXNTZXJ2aWNlJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgYmxhZGVOYXZpZ2F0aW9uU2VydmljZSwgc2V0dGluZ3MsIGNhdGVnb3JpZXMsIHZpZGVvQVBJLCBtZXRhRm9ybXNTZXJ2aWNlKSB7XG4gICAgICAgIHZhciBibGFkZSA9ICRzY29wZS5ibGFkZTtcbiAgICAgICAgYmxhZGUudXBkYXRlUGVybWlzc2lvbiA9ICdZb3VUdWJlRGVtb01vZHVsZTp1cGRhdGUnO1xuXG4gICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGJsYWRlLm9yaWdFbnRpdHkgPSBibGFkZS5jdXJyZW50RW50aXR5O1xuICAgICAgICBibGFkZS5zZWN1cml0eVNjb3BlcyA9IGJsYWRlLmN1cnJlbnRFbnRpdHkuc2VjdXJpdHlTY29wZXM7XG4gICAgICAgIGJsYWRlLmN1cnJlbnRFbnRpdHkgPSBhbmd1bGFyLmNvcHkoYmxhZGUuY3VycmVudEVudGl0eSk7XG5cblxuICAgICAgICBibGFkZS5mb3JtU2NvcGUgPSBudWxsO1xuICAgICAgICAkc2NvcGUuc2V0Rm9ybSA9IGZ1bmN0aW9uIChmb3JtKSB7IGJsYWRlLmZvcm1TY29wZSA9IGZvcm07IH07XG5cbiAgICAgICAgZnVuY3Rpb24gaXNEaXJ0eSgpIHtcbiAgICAgICAgICAgIHJldHVybiAhYW5ndWxhci5lcXVhbHMoYmxhZGUuY3VycmVudEVudGl0eSwgYmxhZGUub3JpZ0VudGl0eSkgLyomJiBibGFkZS5oYXNVcGRhdGVQZXJtaXNzaW9uKCkqLztcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjYW5TYXZlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlzRGlydHkoKSAmJiBibGFkZS5mb3JtU2NvcGUgJiYgYmxhZGUuZm9ybVNjb3BlLiR2YWxpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVDaGFuZ2VzKCkge1xuICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZpZGVvQVBJLmFkZCh7fSwgW2JsYWRlLmN1cnJlbnRFbnRpdHldLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5wYXJlbnRCbGFkZS5yZWZyZXNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5vcmlnRW50aXR5ID0gYmxhZGUuY3VycmVudEVudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJsYWRlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBibGFkZU5hdmlnYXRpb25TZXJ2aWNlLnNldEVycm9yKCdFcnJvciAnICsgZXJyb3Iuc3RhdHVzLCBibGFkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZVZpZGVvKCkge1xuICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZpZGVvQVBJLnJlbW92ZSh7aWQ6YmxhZGUuY3VycmVudEVudGl0eS5pZH0sIG51bGwsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLnBhcmVudEJsYWRlLnJlZnJlc2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLm9yaWdFbnRpdHkgPSBibGFkZS5jdXJyZW50RW50aXR5O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYmxhZGVDbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlTmF2aWdhdGlvblNlcnZpY2Uuc2V0RXJyb3IoJ0Vycm9yICcgKyBlcnJvci5zdGF0dXMsIGJsYWRlKTtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGJsYWRlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zaG93Q29uZmlybWF0aW9uSWZOZWVkZWQoaXNEaXJ0eSgpLCBjYW5TYXZlKCksIGJsYWRlLCBzYXZlQ2hhbmdlcywgY2xvc2VDYWxsYmFjaywgXCJjdXN0b21lclJldmlld3MuZGlhbG9ncy5jdXN0b21lclJldmlldy1zYXZlLnRpdGxlXCIsIFwiY3VzdG9tZXJSZXZpZXdzLmRpYWxvZ3MuY3VzdG9tZXJSZXZpZXctc2F2ZS5tZXNzYWdlXCIpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgYmxhZGUudG9vbGJhckNvbW1hbmRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUmVtb3ZlXCIsIGljb246ICdmYSBmYS10cmFzaCcsXG4gICAgICAgICAgICAgICAgZXhlY3V0ZU1ldGhvZDogZGVsZXRlVmlkZW8sXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZU1ldGhvZDogZnVuY3Rpb24oKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBibGFkZS51cGRhdGVQZXJtaXNzaW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ1lvdVR1YmUuRGVtb01vZHVsZScpXG4gICAgLmNvbnRyb2xsZXIoJ1lvdVR1YmUuRGVtb01vZHVsZS52aWRlb0xpc3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAnWW91VHViZS5EZW1vTW9kdWxlLldlYkFwaScsICdwbGF0Zm9ybVdlYkFwcC5ibGFkZVV0aWxzJywgJ3VpR3JpZENvbnN0YW50cycsICdwbGF0Zm9ybVdlYkFwcC51aUdyaWRIZWxwZXInLCAncGxhdGZvcm1XZWJBcHAuYXV0aFNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbiAoJHNjb3BlLCBzZWFyY2hBcGksIGJsYWRlVXRpbHMsIHVpR3JpZENvbnN0YW50cywgdWlHcmlkSGVscGVyLCBhdXRoU2VydmljZSkge1xuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgICAgICAgJHNjb3BlLnVpR3JpZENvbnN0YW50cyA9IHVpR3JpZENvbnN0YW50cztcblxuICAgICAgICAgICAgdmFyIGJsYWRlID0gJHNjb3BlLmJsYWRlO1xuICAgICAgICAgICAgdmFyIGJsYWRlTmF2aWdhdGlvblNlcnZpY2UgPSBibGFkZVV0aWxzLmJsYWRlTmF2aWdhdGlvblNlcnZpY2U7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgYmxhZGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBibGFkZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0dXNlcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VhcmNoQXBpLnNlYXJjaChhbmd1bGFyLmV4dGVuZChmaWx0ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc2tpcDogKCRzY29wZS5wYWdlU2V0dGluZ3MuY3VycmVudFBhZ2UgLSAxKSAqICRzY29wZS5wYWdlU2V0dGluZ3MuaXRlbXNQZXJQYWdlQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIHRha2U6ICRzY29wZS5wYWdlU2V0dGluZ3MuaXRlbXNQZXJQYWdlQ291bnRcbiAgICAgICAgICAgICAgICB9KSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wYWdlU2V0dGluZ3MudG90YWxJdGVtcyA9IGRhdGEucmVzdWx0LnJlc3VsdC50b3RhbENvdW50O1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5jdXJyZW50RW50aXRpZXMgPSBkYXRhLnJlc3VsdC5yZXN1bHQucmVzdWx0cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmxhZGUuc2VsZWN0Tm9kZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkTm9kZUlkID0gZGF0YS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICghYXV0aFNlcnZpY2UuY2hlY2tQZXJtaXNzaW9uKCdZb3VUdWJlLkRlbW9Nb2R1bGU6dXBkYXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBuZXdCbGFkZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd2aWRlb0RldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW50aXR5SWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbnRpdHk6IGFuZ3VsYXIuY29weShkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWaWRlbyBEZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1lvdVR1YmUuRGVtb01vZHVsZS52aWRlb0RldGFpbENvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ01vZHVsZXMvJChZb3VUdWJlLkRlbW9Nb2R1bGUpL1NjcmlwdHMvYmxhZGVzL3ZpZGVvLWRldGFpbC50cGwuaHRtbCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIG5ld0JsYWRlLm1ldGFGaWVsZHMgPSBbXG4gICAgICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRpdGxlOiAnQ29udGVudCcsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YWx1ZVR5cGU6ICdMb25nVGV4dCcsXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5hbWU6ICdyYXRpbmcnLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdmFsdWVUeXBlOiAnSW50ZWdlcidcbiAgICAgICAgICAgICAgICAvLyAgICAgfV07XG4gICAgICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zaG93QmxhZGUobmV3QmxhZGUsIGJsYWRlKTtcbiAgICAgICAgICAgIH0gICAgXG5cblxuICAgICAgICAgICAgYmxhZGUuYWRkTm9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWROb2RlSWQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhdXRoU2VydmljZS5jaGVja1Blcm1pc3Npb24oJ1lvdVR1YmUuRGVtb01vZHVsZTp1cGRhdGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGFkZEJsYWRlID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3ZpZGVvQWRkaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0FkZCBOZXcgVmlkZW8nLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnWW91VHViZS5EZW1vTW9kdWxlLnZpZGVvQWRkaXRpb25Db250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdNb2R1bGVzLyQoWW91VHViZS5EZW1vTW9kdWxlKS9TY3JpcHRzL2JsYWRlcy92aWRlby1hZGRpdGlvbi50cGwuaHRtbCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFkZEJsYWRlLm1ldGFGaWVsZHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ29udGVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6ICdMb25nVGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdyYXRpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVUeXBlOiAnSW50ZWdlcidcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zaG93QmxhZGUoYWRkQmxhZGUsIGJsYWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmxhZGUuaGVhZEljb24gPSAnZmEgZmEteW91dHViZSc7XG4gICAgICAgICAgICBibGFkZS50aXRsZSA9ICdZb3VUdWJlIFZpZGVvIFNlYXJjaCc7XG5cbiAgICAgICAgICAgIGJsYWRlLnRvb2xiYXJDb21tYW5kcyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhdGZvcm0uY29tbWFuZHMucmVmcmVzaFwiLCBpY29uOiAnZmEgZmEtcmVmcmVzaCcsXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVNZXRob2Q6IGJsYWRlLnJlZnJlc2gsXG4gICAgICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGVNZXRob2Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQWRkIFZpZGVvXCIsIGljb246ICdmYSBmYS1wbHVzJyxcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZU1ldGhvZDogYmxhZGUuYWRkTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuRXhlY3V0ZU1ldGhvZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246ICdZb3VUdWJlLkRlbW9Nb2R1bGU6dXBkYXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG5cblxuICAgICAgICAgICAgLy8gc2ltcGxlIGFuZCBhZHZhbmNlZCBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkc2NvcGUuZmlsdGVyID0gYmxhZGUuZmlsdGVyIHx8IHt9O1xuXG4gICAgICAgIFxuXG4gICAgICAgICAgICBmaWx0ZXIuY3JpdGVyaWFDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUucGFnZVNldHRpbmdzLmN1cnJlbnRQYWdlID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGFnZVNldHRpbmdzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBibGFkZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdWktZ3JpZFxuICAgICAgICAgICAgJHNjb3BlLnNldEdyaWRPcHRpb25zID0gZnVuY3Rpb24gKGdyaWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdWlHcmlkSGVscGVyLmluaXRpYWxpemUoJHNjb3BlLCBncmlkT3B0aW9ucywgZnVuY3Rpb24gKGdyaWRBcGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdWlHcmlkSGVscGVyLmJpbmRSZWZyZXNoT25Tb3J0Q2hhbmdlZCgkc2NvcGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJsYWRlVXRpbHMuaW5pdGlhbGl6ZVBhZ2luYXRpb24oJHNjb3BlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfV0pO1xuIiwi77u/YW5ndWxhci5tb2R1bGUoJ1lvdVR1YmUuRGVtb01vZHVsZScpXG4gIC5mYWN0b3J5KCdzdXBlckNhY2hlJywgWyckY2FjaGVGYWN0b3J5JywgZnVuY3Rpb24oJGNhY2hlRmFjdG9yeSkge1xuICAgIHJldHVybiAkY2FjaGVGYWN0b3J5KCdzdXBlci1jYWNoZScpO1xuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ1lvdVR1YmUuRGVtb01vZHVsZScpXG4uZmFjdG9yeSgnWW91VHViZS5EZW1vTW9kdWxlLldlYkFwaScsIFsnJHJlc291cmNlJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgIHJldHVybiAkcmVzb3VyY2UoJ2FwaS9Zb3VUdWJlRGVtb01vZHVsZScsIHsgfSx7XG4gICAgICAgIHNlYXJjaDogeyBtZXRob2Q6ICdQT1NUJywgdXJsOiAnYXBpL1lvdVR1YmVEZW1vTW9kdWxlL3NlYXJjaCcgfSxcbiAgICAgICAgcmVtb3ZlOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICdhcGkvWW91VHViZURlbW9Nb2R1bGUvZGVsZXRlJyxwYXJhbXM6IHsgaWQ6ICdAaWQnIH19LFxuICAgICAgICBhZGQ6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJ2FwaS9Zb3VUdWJlRGVtb01vZHVsZS9hZGQnICxwYXJhbXM6IHsgaWQ6ICdAaWQnIH19LFxuICAgIH0pO1xuICAgIH1dKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=