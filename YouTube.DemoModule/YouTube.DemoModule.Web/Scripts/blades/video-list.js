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
