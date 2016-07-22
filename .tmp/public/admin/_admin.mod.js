/*global angular*/
/*global $mdIconProvider*/
/*global moment*/

function formatDate(dateVal) {
   console.log('calling formatDate(date)');
   var x = moment(dateVal).format("DD/MM/YY HH:mm");
   return x;
}

function shadeColor(color, percent) {
   var c = '#' + color;
   var f = parseInt(c.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = f >> 8 & 0x00FF,
      B = f & 0x0000FF;
   var res = "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
   return res;
}

function LightenDarkenColor(col,amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    var res =  newColor.toString(16);
    return '#' + res;
}

function adjustBrightness(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var R = parseInt(col.substring(0,2),16);
    var G = parseInt(col.substring(2,4),16);
    var B = parseInt(col.substring(4,6),16);

    R = R + amt;
    G = G + amt;
    B = B + amt;

    if (R > 255) R = 255;
    else if (R < 0) R = 0;

    if (G > 255) G = 255;
    else if (G < 0) G = 0;

    if (B > 255) B = 255;
    else if (B < 0) B = 0;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return (usePound?"#":"") + RR + GG + BB;

}

(function() {
   'use strict';

   angular
      .module('admin.app', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'ui.router', 'toastr', 'HoldButton'])
      .config(Config)
      .config(ThemeProvider)
      .config(DateLocale)
      .config(ConfigToastrContainer)
      .config(ConfigToastrPanel);

   Config.$inject = [
      '$urlRouterProvider',
      '$stateProvider'
   ];

   function ConfigToastrContainer(toastrConfig) {
      angular.extend(toastrConfig, {
         autoDismiss: false,
         containerId: 'toast-container',
         maxOpened: 0,
         newestOnTop: true,
         positionClass: 'toast-bottom-center',
         preventDuplicates: false,
         preventOpenDuplicates: false,
         target: 'body'
      });
   }

   function ConfigToastrPanel(toastrConfig) {
      angular.extend(toastrConfig, {
         allowHtml: false,
         closeButton: false,
         closeHtml: '<button>&times;</button>',
         extendedTimeOut: 1000,
         iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
         },
         messageClass: 'toast-message',
         onHidden: null,
         onShown: null,
         onTap: null,
         progressBar: false,
         tapToDismiss: true,
         templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
         },
         timeOut: 5000,
         titleClass: 'toast-title',
         toastClass: 'toast'
      });
   }

   function Config($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider.
      state('modulos', {
         url: '/modulos',
         templateUrl: 'admin/modulos/modulos.html'
      }).
      state('agenda', {
         url: '/agenda',
         templateUrl: 'admin/agenda/agenda.html'
      }).
      state('bitacoras', {
         url: '/bitacoras',
         templateUrl: 'admin/bitacoras/bitacoras.html'
      }).
      state('bitacoraDetalle', {
         url: '/bitacoraDetalle/:id',
         templateUrl: 'admin/bitacoras/bitacoraDetalle.html'
      }).
      state('dialogos', {
         url: '/dialogos',
         templateUrl: 'admin/dialogos/dialogos.html'
      }).
      state('huespedes', {
         url: '/huespedes',
         templateUrl: 'admin/huespedes/huespedes.html'
      }).
      state('contactos', {
         url: '/contactos',
         templateUrl: 'admin/contactos/contactos.html'
      }).
      state('configuracion', {
         url: '/configuracion',
         templateUrl: 'admin/configuracion/configuracion.html'
      }).
      state('usuarios', {
         url: '/usuarios',
         templateUrl: 'admin/usuarios/configuracion.html'
      });
   }

   function ThemeProvider($mdThemingProvider) {
      $mdThemingProvider.theme('default')
         .primaryPalette('grey')
         .accentPalette('amber');
      $mdThemingProvider.theme('login')
         .primaryPalette('blue')
         .accentPalette('cyan');
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
