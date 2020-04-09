const bd_name = "DataBase_Employ"
module.exports = function(app, db) {
  app.get('/create_employee', (req, res) => {
    const param_id = req.param('id');
    const details = { vk_id : param_id};
    const defualt_note = {vk_id : req.param('id') , phone : req.param('phone'), about: req.param('about') , 
                        categori: req.param('categori'), active_task : [], 
                        count_task : 0, rate : 0, employer_task : [],
                        isEmployer : 0};
    try{
            db.db(bd_name).collection(param_id).insert(defualt_note, (err, result) => {
                if (err) { 
                  res.send({ 'error': 'An error has occurred' }); 
                } else {
                  res.send(result.ops[0]);
                }
              });

    }catch(err){
        res.send("-1");
    }
  });
};
