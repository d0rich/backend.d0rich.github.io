const bd_name = "DataBase_Tasks"
// var res1 = {"Программирование" : [], "Доставка" : [], "Учёба": [], 
//                         "Рисование": [], "Дизайн": [],
//                         "Пение" : [], "Готвка" : [],
//                         "Minecraft" : [],"Общение" : [],
//                         "Прочее" : [] };
const cat = ['Программирование','Доставка','Учёба','Рисование','Дизайн','Пение','Готовка','Minecraft','Общение','Прочее'];
// var temp = [];
// const a = (doc) =>{
//   return doc;
// }

module.exports = function(app, db) {
  // var cat0 = [];
  
  let output={};

  reqGet = (i,res) =>
  {
    // console.log(cat[i]);
    let p = new Promise((resolve)=>{
      db.db(bd_name).collection(cat[i]).find({},{limit : 10}).toArray((err, docs) => {                    
        output[cat[i]]=docs;
        resolve();        
      }); 
    });
    p.then(()=>{
      if(i<cat.length-1)
      {
      // console.log(i);
      reqGet(i+1,res);
      }
      else
      {
        res.send(output);
        // console.log(output);
      }
    });
  }


  app.get('/get_task', (req, res) => {
    // const param_id = req.param('id');
    // var cat = req.param('categori');
    // const details = { vk_id : param_id};
    // const categori = req.param('categori');
    // const defualt_note = {name : req.param('name') , about : req.param('about'), price: req.param('price') , 
    //                     id_employer: req.param('id_employer'), 
    //                     deadline : req.param('deadline')};
    try{
      
      // var cat1 = [];
      // var cat2 = [];
      // var cat3 = [];
      // var cat4 = [];
      // var cat5 = [];
      // var cat6 = [];
      // var cat7 = [];
      // var cat8 = [];
      // var cat9 = [];  
      reqGet(0,res);  

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