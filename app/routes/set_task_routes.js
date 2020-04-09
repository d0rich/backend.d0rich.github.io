const bd_name = "DataBase_Tasks"
const bd_employ = "DataBase_Employ"
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // var cat0 = [];
  app.get('/set_new_task', (req, res) => {
    // const param_id = req.param('id');
    var task_id = req.param('task_id');
    const details = { vk_id : req.param('id') };
    

    try{                 
        db.db(bd_employ).collection(req.param('id')).findOne(details, (err, item) => {
        
            console.log(item);
            item.employer_task.push(task_id)
            var detail = { '_id': new ObjectID(item._id) };
            const defualt_note = {vk_id :req.param('id') , phone : item.phone, about: item.about , 
                        categori: item.categori, active_task : item.active_task, 
                        count_task : item.count_task+1, employer_task : item.employer_task, rate : item.rate, 
                        isEmployer : item.isEmployer};

            db.db(bd_employ).collection(req.param('id')).remove(detail, (err, item) => {
                console.log("del");
            });
            db.db(bd_employ).collection(req.param('id')).insert(defualt_note, (err, result) => {
              if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
              } else {
                res.send("1");
              }
            });

        });
    }catch(err){
    res.send('-1');
    }
  });
}
