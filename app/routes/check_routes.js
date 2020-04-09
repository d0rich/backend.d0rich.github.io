var ObjectID = require('mongodb').ObjectID;
const bd_employ = "DataBase_Employ"
const bd_tasks = "DataBase_Tasks"
module.exports = function(app, db) {
  app.get('/first_start/id', (req, res) => {
    const param_id = req.params.id;
    const details = { vk_id : param_id};
    const note = { vk_id : param_id,  count_card: 0  , tracks: {} }; //{card : { card_id : null , card_name: null}}
    try{
      db.db(bd_employ).collection(param_id).insert(note, (err, result) => {
                        if (err) { 
                          res.send({ 'error': 'An error has occurred' }); 
                        } else {
                            res.send(result.ops[0]);
                        }
                    });
    }catch(err){

    };
    //track : { name : "0",track_code : "0" , track_id: "0"}
    // try{
    //   res.send("1");
    //     db.db(bd_employ).collection(param_id).findOne(details, (err, item) => {
    //         try{
    //             if (item.vk_id == null) { 
    //                 res.send("0");
    //               } else {
    //                 res.send(item);
    //               }
    //         }catch(err){
    //             // db.db(bd_employ).collection(param_id).insert(note, (err, result) => {
    //             //     if (err) { 
    //             //       res.send({ 'error': 'An error has occurred' }); 
    //             //     } else {
    //             //         res.send(result.ops[0]);
    //             //     }
    //             // });
    //             res.send("1");
    //         }
    //         res.send("1");
    //     });
    // }catch(err){

    // }
  });
};