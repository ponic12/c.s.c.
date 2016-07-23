/**
 * ReservaController
 *
 * @description :: Server-side logic for managing reservas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*global Guest*/
/*global Reservation*/

module.exports = {
   signin: function(req, res) {
      // Buscar en la tabla Huespedes x email
      //    Si ocurre un error mostrarlo como warning
      //    Si no se encuentra el email registrado => avisar al usuario y mostrar form vacio
      //        . Crear nuevo Huesped con el mail unicamente
      //        . Crear nueva Reserva vacia 
      //    Si el email esta en la tabla Huesped, generar un response con la siguiente info:
      //        . Datos de la ultima reserva en el siguiente orden de prioridad:
      //            . Reserva sin formalizar (reserva futura sin seña, editable)
      //            . Reserva formalizada no vencida (sin edicion)
      //            . Reserva nueva vacia (si ya vencio la anterior)
      //        . Datos personales del huesped
      //
      //    Generar request con la reserva + huesped adjunto (grabacion)

      var paramEmail = req.param('email');
      if (!paramEmail) return res.notFound();

      Guest.findOne({
            email: paramEmail
         },
         function(err, foundGuest) {
            if (err) return res.negotiate(err);
            if (!foundGuest) { // No encuentra huesped => crea huesped y reserva vacia
               Guest.create({
                     email: paramEmail
                  },
                  function(err, newGuest) {
                     if (err) return res.negotiate(err);
                     Reservation.create({
                        guest: newGuest.id
                     }, function(err, reserva) {
                        if (err) return res.negotiate(err);
                        res.status(201);
                        reserva.guest = newGuest;
                        return res.json(reserva);
                     });
                  }
               );
            }
            else { // Encuentra huesped => Evalua reservas
               Reservation.findOne({
                     valid: false,
                     expired: false
                  },
                  function(err, notValnotExp) {
                     if (err) return res.negotiate(err);
                     if (!notValnotExp) { //No encuentra reserva no formalizada (valid) => busca reserva formalizada y no expirada
                        Reservation.findOne({
                              valid: true,
                              expired: false
                           },
                           function(err, valnotExp) {
                              if (err) return res.negotiate(err);
                              if (!valnotExp) { // No encuentra reserva valida => crea nueva reserva con huesped encontrado
                                 Reservation.create({
                                       'guest': foundGuest.id
                                    },
                                    function(err, reserva) {
                                       if (err) return res.negotiate(err);
                                       res.status(201);
                                       reserva.guest = foundGuest;
                                       return res.json(reserva);
                                    }
                                 );
                              }
                              else { // Encuentra reserva valida y no expirada => devuelve reserva + huesped
                                 res.status(200);
                                 valnotExp.guest = foundGuest;
                                 return res.json(valnotExp);
                              }
                           }
                        );
                     }
                     else { // Encuentra reserva invalida y no expirada => devuelve reserva y huesped
                        res.status(200);
                        notValnotExp.guest = foundGuest;
                        return res.json(notValnotExp);
                     }
                  }
               )
            }
         }
      );
   },
   getReservationByEmail: function(req, res) {
      var email = req.params.email;
      Reservation.findAll({
            'email': email
         })
         .populate('guest')
         .exec(function(err, reservation) {
            if (err) {
               return res.json(err);
            }
            return res.json(reservation);
         });
   },
   getReservations: function(req, res) {
      var email = req.params.email;
      Reservation.findAll({
            'email': email
         })
         .populate('guest')
         .exec(function(err, reservation) {
            if (err) {
               return res.json(err);
            }
            return res.json(reservation);
         });
   },
   save: function(req, res, next) {
      var criteria={};
      criteria = req.body.info;
      
      var id = req.params.id;
      if (!id)
         return res.badRequest('No Id');
         
      var guestId = criteria.guest.id;
      Guest.update(guestId, criteria.guest, function(err, guest){
         if (guest.length == 0) return res.notFound();
         if (err) return next(err);
         //res.json(guest);
      })
      
      Reservation.update(id, criteria, function(err, reserv){
         if (reserv.length == 0) return res.notFound();
         if (err) return next(err);
         res.json(reserv);
      })
      
   },
};
