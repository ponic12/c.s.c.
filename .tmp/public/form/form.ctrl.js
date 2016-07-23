/*global angular*/
(function() {
   'use strict';

   angular
      .module('form.app')
      .controller('form.ctrl', Controller);

   Controller.$inject = ['$rootScope', '$mdSidenav', '$mdToast', '$mdDialog', '$mdMedia', '$http', 'toastr'];

   function Controller($rootScope, $mdSidenav, $mdToast, $mdDialog, $mdMedia, $http, toastr) {
      $rootScope.$mdMedia = $mdMedia; // para usarla en binding
      var vm = this;
      vm.isLogged = false;
      vm.email;
      vm.resData = initData();
      vm.fechaDesde;
      vm.fechaHasta;
      vm.minDate;
      vm.maxDate;

      vm.login = login;
      vm.save = save;
      vm.debug = function(){
         var a=1;
      }

      initDates();
      //////////////////////////////
      function initData() {
         var res = {
            children: 0,
            adults: 1,
            petSize: 1
         }
         return res;
      }

      function initDates() {
         vm.fechaDesde = new Date();
         vm.minDate = new Date(
            vm.fechaDesde.getFullYear(),
            vm.fechaDesde.getMonth() - 2,
            vm.fechaDesde.getDate());
         vm.maxDate = new Date(
            vm.fechaDesde.getFullYear(),
            vm.fechaDesde.getMonth() + 3,
            vm.fechaDesde.getDate());
      }

      function login() {
         console.log('trying to login: ' + vm.email);
         $http({
            method: 'get',
            url: '/reservation/signin/'+vm.email
         }).then(function(response) {
            vm.resData = response.data;
            vm.resData.fechaDesde = new Date(vm.resData.fechaDesde);
            vm.resData.fechaHasta = new Date(vm.resData.fechaHasta);
            toastr.info('Se ha logueado el usuario: ' + vm.email, 'Aviso');
            vm.isLogged = true;
         }, function(err) {
            toastr.error('Ha ocurrido un error trayendo informacion', 'Error');
         });
      }

      function save() {
         console.log('save reservation');
         $http({
            method: 'put',
            url: '/reservation/save/'+vm.resData.id,
            data: {info: vm.resData}
         }).then(function(response) {
            toastr.success('Se ha guardado la reserva', 'Aviso');
         }, function(err) {
            toastr.error('Ha ocurrido un error guardando los datos', 'Error');
         });
      }


      function openToast(message) {
         $mdToast.show(
            $mdToast.simple()
            .textContent(message)
            .position('top right')
            .hideDelay(3000));
      }
   }
})();