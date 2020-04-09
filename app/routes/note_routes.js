// module.exports = function(app, db) {
// };
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/create/:id', (req, res) => {
    var cards =[9070001207126628,9070001207126628];
    const note = { count_card: 2, vk_id : 'id164078040'  ,id_card: cards };
    db.db("heroku_fplx4b5n").collection('id164078040').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

