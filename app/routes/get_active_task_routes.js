const bd_name = "DataBase_Tasks"
const bd_employ = "DataBase_Employ"
var ObjectID = require('mongodb').ObjectID;
// var res1 = {"Программирование" : [], "Доставка" : [], "Учёба": [], 
//                         "Рисование": [], "Дизайн": [],
//                         "Пение" : [], "Готвка" : [],
//                         "Minecraft" : [],"Общение" : [],
//                         "Прочее" : [] };
const cat = ['Программирование','Доставка','Учёба','Рисование','Дизайн','Пение','Готовка','Minecraft','Общение','Прочее','Доставка'];
// var temp = [];
// const a = (doc) =>{
//   return doc;
// }
var temp = [];
module.exports = function(app, db) {
  // var cat0 = [];
  
  let output={};

  reqGet1 = (i,j,res,active_task) =>
  {
    // console.log(cat[i]);
    let p = new Promise((resolve)=>{
      // db.db(bd_name).collection(cat[i]).find({},{limit : 10}).toArray((err, docs) => { 
      console.log(i)
      var id = new require('mongodb').ObjectID(active_task[j])
      console.log(i)
      var detail = {'_id': id};
      // var detail = {id_employer : "id295484630"}
      // console.log(detail);
      db.db(bd_name).collection(cat[i]).findOne(detail, (err, docs) => {    
        console.log(docs)  
        temp.push(docs);      
        resolve();        
      }); 
    });
    p.then(()=>{
      if(j<active_task.length-1)
      {
      // console.log(i);
      reqGet1(i,j+1,res,active_task,temp);
      }
      else
      { 
        if(i< cat.length-1){
          reqGet1(i+1,0,res,active_task,temp);
          if(temp[0]==null)
            output[cat[i]] = null;
          else  
            output[cat[i]] = temp;
          temp = [];
        }else{
          temp = [];
          res.send(output);
          console.log(output);
        }

      }
      
    });
  }


  app.get('/get_active_task', (req, res) => {
    // const param_id = req.param('id');
    // var cat = req.param('categori');
    const details = { vk_id : req.param('id')};
    // const categori = req.param('categori');
    // const defualt_note = {name : req.param('name') , about : req.param('about'), price: req.param('price') , 
    //                     id_employer: req.param('id_employer'), 
    //                     deadline : req.param('deadline')};
    try{
      db.db(bd_employ).collection(req.param('id')).findOne(details, (err, item) => {

        reqGet1(0,0,res,item.active_task,temp);
      });
      
        
      // reqGet(0,res);  

      // res.send(cat0);
            // db.db(bd_name).collection(categori).insert(defualt_note, (err, result) => {
            //     if (err) { 
            //       res.send({ 'error': 'An error has occurred' }); 
            //     } else {
            //       res.send(result.insertedIds[0]);
            //     }
            //   });
            
            // var result1 = {"Программирование" : [], "Доставка" : [], "Учёба": [], 
            //             "Рисование": [], "Дизайн": [],
            //             "Пение" : [], "Готвка" : [],
            //             "Minecraft" : [],"Общение" : [],
            //             "Прочее" : [] };
            // var result = [];
            // var result1 = [];
            
            // for (var i=0; i < 10; i++){
            //   db.db(bd_name).collection(cat[i]).find({},{limit : 10}).toArray((err, docs) => {
            //     // res.send(docs);
            //     // console.log(docs);
            //     // result1 = result.concat(res1);
            //     // console.log("asdas");
            //     a(docs,i);
                
            //     // result.concat(docs);
            //     //res.send(Object.values(docs));
            //   });
            //   result1 = res1;
            // }
            // res.send(result1);
            // db.db(bd_name).collection("Coding").find({},{limit : 10}).toArray((err, docs) => {
            //   result = result.concat(docs);
              
            // });
            
            // result1 = result.concat(res1)       
            // res.send(result1);
    }catch(err){
        res.send("idiot"+err);
        res.send(err);
        
    }
  });
};