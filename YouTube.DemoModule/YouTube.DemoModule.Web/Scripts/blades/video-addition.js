angular.module('YouTube.DemoModule')
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