var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/delete', (req, res) => {
    const param_id = req.param("id");
    const param_name = req.param('name');
    const param_code = req.param('track_code');
    const param_tracks_id = req.param('track_id');
    const details = { vk_id : param_id };
    

    try{
    db.db("heroku_fplx4b5n").collection(param_id).findOne(details, (err, item) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        // const count = Object.keys(item.tracks).length;
                var trackss = {};
                var detail = { '_id': new ObjectID(item._id) };
                var i =1;
                for (var track in item.tracks){
                  if (item.tracks[track].track_name != param_name){
                      trackss["track"+i] = item.tracks[track];
                      i++;
                  }
                  
                    // if ((track.track_name != param_name) ||(track.track_code != param_code)||(track.track_id != param_tracks_id)){
                  //     trackss[i] = track;
                  //     i++;
                  // }
                }
                // console.log(trackss);
                db.db("heroku_fplx4b5n").collection(param_id).remove(detail, (err, item) => {
                  res.send(err);
                });
                // const track = { track_name: param_name, track_code : param_code , track_id: param_tracks_id};
                // trackss["track"+ count] = track;
                // res.send(cards);
                // console.log(typeof(param_count_card));
                
                const note = { count_card: i-1, vk_id : param_id  , tracks : trackss };
                // console.log(note);
                db.db("heroku_fplx4b5n").collection(param_id).insert(note, (err, result) => {
                    if (err) { 
                      res.send({ 'error': 'An error has occurred' }); 
                    } else {
                        // res.send(result);
                    }
                });
                
                
        
            } 
    });
    }catch(err){

    }
  });
};