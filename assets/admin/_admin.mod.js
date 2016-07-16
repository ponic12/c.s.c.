/*global angular*/
/*global $mdIconProvider*/
(function() {
   'use strict';

   angular
      .module('admin.app', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'ui.router'])
      .config(Config)
      .config(ThemeProvider)
      .config(DateLocale);

   Config.$inject = [
      '$urlRouterProvider',
      '$stateProvider' 
   ];

   function Config($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider.
      state('modulos', {
         url: '/modulos',
         templateUrl: 'admin/modulos/modulos.html'
      }).
      state('agenda', {
         url: '/agenda',
         templateUrl: 'agenda/agenda.html'
      }).
      state('bitacoras', {
         url: '/bitacoras',
         templateUrl: 'bitacoras/bitacoras.html'
      }).
      state('bitacoraDetalle', {
         url: '/bitacoraDetalle/:id',
         templateUrl: 'bitacoras/bitacoraDetalle.html'
      }).
      state('dialogos', {
         url: '/dialogos',
         templateUrl: 'dialogos/dialogos.html'
      }).
      state('huespedes', {
         url: '/huespedes',
         templateUrl: 'huespedes/huespedes.html'
      }).
      state('contactos', {
         url: '/contactos',
         templateUrl: 'contactos/contactos.html'
      }).
      state('configuracion', {
         url: '/configuracion',
         templateUrl: 'configuracion/configuracion.html'
      }).
      state('usuarios', {
         url: '/usuarios',
         templateUrl: 'usuarios/configuracion.html'
      });
   }
   function ThemeProvider($mdThemingProvider) {
      $mdThemingProvider.theme('default')
         .primaryPalette('grey')
         .accentPalette('blue');
   }
   function DateLocale($mdDateLocaleProvider) {
      // Example of a Spanish localization.
      $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
         'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
         'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];
      $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
      $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
      // Can change week display to start on Monday.
      $mdDateLocaleProvider.firstDayOfWeek = 1;
      // Optional.
      //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
      //                               20,21,22,23,24,25,26,27,28,29,30,31];
      // In addition to date display, date components also need localized messages
      // for aria-labels for screen-reader users.
      $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
         return 'Semana ' + weekNumber;
      };
      $mdDateLocaleProvider.msgCalendar = 'Calendario';
      $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
   }
   
   // .config(function($mdIconProvider) {
   //    $mdIconProvider
   //     .defaultIconSet("lib/svg/avatars.svg", 128)
   //     .icon("menu"       , "lib/svg/menu.svg"        , 24)
   //     .icon("google_plus", "lib/svg/google_plus.svg" , 512)
   //     .icon("hangouts"   , "lib/svg/hangouts.svg"    , 512)
   //     .icon("twitter"    , "lib/svg/twitter.svg"     , 512)
   //     .icon("phone"      , "lib/svg/phone.svg"       , 512);
   // })
})();
