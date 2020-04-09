const bd_name = "DataBase_Employ"
module.exports = function(app, db) {
  app.get('/first_connect/:id', (req, res) => {
    const param_id = req.params.id;
    const details = { vk_id : param_id};
    const defualt_note = {vk_id : param_id , phone : "0", about: "" , categori: {}, active_task : 0, count_task : 0, rate : 0, isEmployer : 0};
    try{
      db.db(bd_name).collection(param_id).findOne(details, (err, item) => {
        try{
          if (item.vk_id == null) { 
            res.send("0");
          } else {
            res.send("1");
          }
        }catch(err){
          // db.db(bd_name).collection(param_id).insert(defualt_note, (err, result) => {
          //   if (err) { 
          //     res.send({ 'error': 'An error has occurred' }); 
          //   } else {
          //     res.send(result.ops[0]);
          //   }
          // });
          res.send("0");
        }
      });
    }catch(err){
      
    }
  });
};
