/**
 * BitacoraController
 *
 * @description :: Server-side logic for managing bitacoras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 /*global Blog*/

module.exports = {
  getBlogs: function(req, res) {
      console.log('Levanta todas las bitacoras...');
      Blog.find()
      .exec(function(err, blogs) {
        if (err) {
          return res.json(err);
        }
        return res.json(blogs);
      });
      return res;
  },
  createBlog: function(req, res){
      console.log('Crea bitacora...');
      return res;
  }

};
