/**
 * BitacoraController
 *
 * @description :: Server-side logic for managing bitacoras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 /*global Blog*/

module.exports = {
  // getBitacoras: function(req, res) {
  //     console.log('Levanta todas las bitacoras...');
  //     return res;
  // },
  // createBitacora: function(req, res){
  //     console.log('Crea bitacora...');
  //     return res;
  // },

  get: function(req, res) {
    Blog.find()
      .exec(function(err, blogs) {
        if (err) {
          return res.json(err);
        }
        return res.json(blogs);
      });
  },

};
