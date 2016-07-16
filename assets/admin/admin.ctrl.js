/*global angular*/
(function() {
   'use strict';

   angular
      .module('admin.app')
      .controller('admin.ctrl', Controller);

   Controller.$inject = ['$mdSidenav', '$mdToast', '$mdDialog', '$mdMedia'];

   function Controller($mdSidenav, $mdToast, $mdDialog, $mdMedia) {
      var vm = this;
      vm.isLogged=true;
      vm.email;
      vm.resData ={
         children:0,
         adults:1,
         petSize:1
      };
      
      vm.fechaDesde = new Date();
      vm.fechaHasta;
      
      vm.minDate = new Date(
        vm.fechaDesde.getFullYear(),
        vm.fechaDesde.getMonth() - 2,
        vm.fechaDesde.getDate());

      vm.maxDate = new Date(
        vm.fechaDesde.getFullYear(),
        vm.fechaDesde.getMonth() + 2,
        vm.fechaDesde.getDate());
      
      vm.login = login;
      vm.save = save;
      vm.toggleList = toggleList;
      //////////////////////////////
      
      function toggleList() {
         $mdSidenav('left').toggle();
      }
      
      function login(){
         console.log('login: '+ vm.email);
         openToast('Se ha logueado el usuario: ' + vm.email);
         vm.isLogged = true;
      }
      function save(){
         console.log('save reservation');
         openToast('Se ha guardado la reserva');
      }




      function addUser($event) {
         var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
         $mdDialog.show({
            templateUrl: './src/views/addUserDialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            controller: "addUserDialog.ctrl",
            controllerAs: "ctrl",
            clickOutsideToClose: true,
            fullscreen: useFullScreen
         }).then(
            function(user) {
               user.name = user.firstName + ' ' + user.lastName;
               vm.dataUsers.push(user);
               vm.selectUser(user);
               openToast("User added")
            },
            function() {
               console.log('You cancelled the dialog.');
            });
      }

      function showContactOptions($event) {
         $mdBottomSheet.show({
            parent: angular.element(document.getElementById('wrapper')),
            templateUrl: "./src/views/contactSheet.html",
            controller: "contactPanel.ctrl",
            controllerAs: "cp",
            bindToController: true,
            targetEvent: $event
         }).then(function(clickedItem) {
            clickedItem && console.log(clickedItem.name + ' clicked!');
         });
      }

      function openToast(message) {
         $mdToast.show(
            $mdToast.simple()
            .textContent(message)
            .position('top right')
            .hideDelay(3000));
      }
   };
})();