const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = process.env.PORT || 8000;
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, {useUnifiedTopology: true, useNewUrlParser: true}, (err, client) => { 
    // console,log("Connect");
    if (err) return console.log(err)
    require('./app/routes')(app, client);
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })

// module.exports = function(app, db) {
//     app.post('/notes', (req, res) => {
//       res.send('Hello')
//     });
//   };
// const client = new MongoClient(url, { useUnifiedTopology: true });
// client.connect(err => {
//     console.log(err);
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });