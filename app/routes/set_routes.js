var ObjectID = require('mongodb').ObjectID;
const bd_name = "heroku_fplx4b5n";
module.exports = function(app, db) {
    app.get('/set', (req, res) => {
      const param_id = req.param('id');
      const param_name = req.param('name');
      const param_code = req.param('track_code');
      const param_tracks_id = req.param('track_id');
      const details = { vk_id : param_id};
      try{
        db.db(bd_name).collection(param_id).findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
                const count = Object.keys(item.tracks).length+1;
                var trackss = item.tracks;
                const track = { track_name: param_name, track_code : param_code , track_id: param_tracks_id};
                trackss["track"+ count] = track;
                
                const note = { count_card: count, vk_id : param_id  , tracks : trackss };
                db.db(bd_name).collection(param_id).insert(note, (err, result) => {
                    if (err) { 
                      res.send({ 'error': 'An error has occurred' }); 
                    } else {
                        res.send(result.ops[0]);
                    }
                });
                var detail = { '_id': new ObjectID(item._id) };
                    db.db(bd_name).collection(param_id).remove(detail, (err, item) => {
                      
                });
        
            }
        
          });
    }catch(err){

    }
    });
  };