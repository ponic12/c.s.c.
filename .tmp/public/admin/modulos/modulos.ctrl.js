(function() {
  'use strict';
  /*global angular*/
  angular
    .module('admin.app')
    .controller('modulos.ctrl', Controller);

  Controller.$inject = ['$rootScope', '$state'];

  function Controller($rootScope, $state) {
    var vm = this;
    $rootScope.modulo = "Complejo San Clemente";
  };
})();
