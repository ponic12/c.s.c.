/**
 * Reserva.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dateFrom: {
      type:'date'
    },
    dateTo: {
      type:'date'
    },
    children: {
      type: 'integer',
      defaultsTo: 0
    },
    adults: {
      type: 'integer',
      defaultsTo: 1
    },
    room:{
      model:'Hostage'
    },
    guest: {
      model:'Guest'
    },
    user: {
      model:'User'
    },
    valid: {
      type: 'boolean',
      defaultsTo: false
    },
    expired: {
      type: 'boolean',
      defaultsTo : false
    },
    vehicle: {
      type: 'boolean',
      defaultsTo: false
    },   
    pet: {
      type: 'boolean',
      defaultsTo: false
    },
    petSize:{
      type: 'string',
      enum:['pequeña', 'mediana', 'grande']
    },
    reference:{
      type:'string',
      enum:['amigos', 'facebook', 'google', 'publicidad', 'otro' ]
    },
    refComment:{
      type:'string'
    },
    price: {
      type:'float'
    },
    sign: {
      type:'float'
    }
  }
};

