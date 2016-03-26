(function () {
    'use strict';

    angular
        .module('app.config')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Config',
        'TableSettings',
        'ConfigForm'];
    /* @ngInject */
    function ConfigController(logger,
        $stateParams,
        $location,
        Config,
        TableSettings,
        ConfigForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Config);
        vm.config = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = ConfigForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Config object
            var config = new Config(vm.config);

            // Redirect after save
            config.$save(function(response) {
                logger.success('Config created');
                $location.path('config/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Config
        vm.remove = function(config) {

            if (config) {
                config = Config.get({configId:config.id}, function() {
                    config.$remove(function() {
                        logger.success('Config deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.config.$remove(function() {
                    logger.success('Config deleted');
                    $location.path('/config');
                });
            }

        };

        // Update existing Config
        vm.update = function() {
            var config = vm.config;

            config.$update(function() {
                logger.success('Config updated');
                $location.path('config/' + config.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewConfig = function() {
            vm.config = Config.get({configId: $stateParams.configId});
            vm.setFormFields(true);
        };

        vm.toEditConfig = function() {
            vm.config = Config.get({configId: $stateParams.configId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Config View');
        }
    }

})();
