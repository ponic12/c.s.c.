(function() {
  'use strict';
  /*global angular*/
  /*global shadeColor*/
  /*global LightenDarkenColor*/
  /*global adjustBrightness*/
  angular
    .module('admin.app')
    .controller('bitacoras.ctrl', Controller);

  Controller.$inject = ['$http', '$rootScope', '$state', 'toastr', '$mdDialog'];

  function Controller($http, $rootScope, $state, toastr, $mdDialog) {
    $rootScope.modulo = "Bitacoras";
    var vm = this;
    vm.colorCfg = {
        label: "Seleccione color",
        icon: "brush",
        default: "#f00",
        genericPalette: false,
        history: false
      },
      vm.disableAdd = false;
    vm.selBitacora;
    vm.dataBitacoras = [];
    vm.formatFecha = formatFecha;
    vm.setColor = setColor;
    vm.goto = goto;
    vm.create = create;
    vm.edit = edit;
    vm.destroy = destroy;
    vm.save = save;
    vm.close = close;
    loadBitacoras();
    ////////////////////////////////////////
    function create() {
      vm.selBitacora = {};
      vm.selBitacora.name = "";
      vm.selBitacora.color = "#888888";
      vm.selBitacora.editMode = true;
      vm.dataBitacoras.push(vm.selBitacora);
      vm.disableAdd = true;
    }

    function edit($event, $promise, bit) {
      if (!vm.selBitacora) { // validar que no se este en modo edicion en otra bitacora 
        $promise.then(function(success) {
          initEdition(bit, true);
        }, function(reason) {
          //Called if the promise is rejected, ie the button is not hold long enough
        }, function(update) {
          //This is the progress function, called multiple times before the promise is 
          // either resolved or rejected.
        });
      }
    }

    function close(ev, bit) {
      initEdition(bit, false);
    }

    function destroy(ev, bit) {
      var confirm = $mdDialog.confirm()
        .title('Seguro quiere eliminar esta bitacora?')
        .textContent('Todo su contenido sera borrado.')
        .ariaLabel('Eliminar Bitacora')
        .targetEvent(ev)
        .ok('Si')
        .cancel('No');

      $mdDialog.show(confirm).then(function() {
        if (bit.id) {
          $http.delete('/blog/' + bit.id).then(
            function(response) {
              removeBitacora(bit);
            },
            function errorCallback(response) {
              toastr.error('Ha ocurrido un error borrando la bitacora', 'Error');
            }
          );
        }
        else {
          removeBitacora(bit);
        }

        function removeBitacora(item) {
          var pos = vm.dataBitacoras.indexOf(item);
          vm.dataBitacoras.splice(pos, 1);
          initEdition(item, false);
        }
      }, function() {
        initEdition(bit, false);
        toastr.error('Se cancelo la eliminacion.', 'Aviso');
      });
    }

    function save(bit) {
      var params = {
        name: vm.selBitacora.name,
        color: vm.selBitacora.color.substr(1, vm.selBitacora.color.length - 1),
        usuario: "PP"
      };
      bit.color = params.color;
      clearSelection();
      bit.editMode = false;
      vm.disableAdd = false;

      if (bit.id) { // Update
        $http.put('/blog/' + bit.id, params).then(
          function successCallback(response) {
            bit.updateAt = response.updateAt;
            toastr.info('Se grabo con exito la bitacora', 'Informacion');
          },
          function errorCallback(response) {
            toastr.error('Ha ocurrido un error grabando la bitacora', 'Error');
          }
        );
      }
      else { // Create
        $http.post('/blog', params).then(
          function successCallback(response) {
            bit.updateAt = response.updateAt;
            toastr.success('Se creo con exito la bitacora', 'Informacion');
          },
          function errorCallback(response) {
            toastr.error('Ha ocurrido un error creando la bitacora', 'Error');
          }
        );
      }
    };

    function loadBitacoras() {
      $http({
        method: 'get',
        url: '/blog/getBlogs'
      }).then(function successCallback(response) {
        //vm.dataBitacoras = JSON.parse('['+response.data.join(',')+']');
        vm.dataBitacoras = response.data;
        vm.dataBitacoras[0].alertsCounter = 3;
      }, function errorCallback(response) {
        toastr.error('Ha ocurrido un error trayendo las bitacoras', 'Error');
      });
    }

    function setColor(c) {
      //var res = shadeColor(c,10);
      //var res = LightenDarkenColor(c, 1);
      c = '#' + c;
      var res = adjustBrightness(c, 90);
      console.log('setColor: from: ' + c + ' / to: ' + res);
      return res;
    }

    function goto(bit) {
      if (bit.editMode != true) {
        console.log('Detalle bitacora:' + bit.name);
        $state.go('bitacoraDetalle', {
          'id': bit.id,
          'bitacora': bit.name
        });
      }
    }

    function initEdition(bit, flag) {
      bit.editMode = flag;
      vm.disableAdd = flag;
      vm.selBitacora = flag ? bit : undefined;
    }

    function resetFolders() {
      for (var i = 0; i < vm.dataBitacoras.length; i++) {
        var bit = vm.dataBitacoras[i];
        if (bit.editMode == true) {
          if (bit.id == undefined) // nuevo elemento 
            vm.dataBitacoras.splice(i, 1);
          else
            bit.editMode = false;
        }
      }
    }

    function formatFecha(d) {
      return formatDate(d);
    }
  }
})();