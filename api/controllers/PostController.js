/**
 * HistoriaController
 *
 * @description :: Server-side logic for managing historias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*global Blog*/
/*global Post*/
module.exports = {

  getByIdBlog: function(req, res) {
    var idBit = req.params.id;
    Post.find({'owner':idBit})
      .populate('user')
      .exec(function(err, hist) {
        if (err) {
          return res.json(err);
        }
        return res.json(hist);
      });
  },
  // del: function(req, res) {
  //   var id = req.param('id');
  //   console.log('id:', id);
  //   Historia.findOne(id).exec(
  //     function(err, his) {
  //       if (err)
  //         console.log(err);
  //       else {
  //         delete his.usuario;
  //         console.log(his);
  //         return his;
  //       }
  //     });
  // }
};
