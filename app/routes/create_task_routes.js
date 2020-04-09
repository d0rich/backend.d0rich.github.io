const bd_name = "DataBase_Tasks"
const bd_employ = "DataBase_Employ"
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/create_task', (req, res) => {
    const param_id = req.param('id_employer');
    const details = { vk_id : param_id};
    const categori = req.param('categori');
    const defualt_note = {name : req.param('name') , about : req.param('about'), price: req.param('price') , 
                        id_employer: req.param('id_employer'), 
                        deadline : req.param('deadline')};
    db.db(bd_employ).collection(param_id).findOne(details, (err, item) => {
        try{
          if ((item.vk_id == null)|(item.isEmployer == "0")) { 
            res.send("0");
          } else {
            db.db(bd_name).collection(categori).insert(defualt_note, (err, result) => {
              if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
              } else {
                res.send(result.insertedIds[0]);
              }
            });
          }

        }catch(err){
          res.send("-1");
      }
    });
  });
};