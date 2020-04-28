const db_name = "HomeTasks";

const collectiionName = "Subjects";

module.exports = function(app, db) 
{   
   app.get('/del_subject', async (request,response)=>{    
        //Находим предмет
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        var s = await db.db(db_name).collection(collectiionName).findOne(detail);
        
        //Удаляем том и его задания
        for(tom of s.toms)
        {
            detail = {'tom': tom};
            let task = await db.db(db_name).collection("Task").deleteMany(detail);

            var id = new require('mongodb').ObjectID(tom);
            detail = {'_id': id};
            let r = await db.db(db_name).collection("Tome").deleteOne(detail);
        }
        
        //Удаляем Предмет                
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        let r = await db.db(db_name).collection(collectiionName).deleteOne(detail); 
        response.send(r);      
    });    
}

// module.exports = function(app, db) 
// {   
//    app.get('/del_tom', async (request,response)=>{    
//         // Находим Том
//         var id = new require('mongodb').ObjectID(request.param("id"));    
//         var detail = {'_id': id};
//         var t = await db.db(db_name).collection("Tome").findOne(detail);
//         console.log(t);
//         // Удаляем задания Тома
//         detail = {'tom': request.param("id")};
//         let d = await db.db(db_name).collection("Task").deleteMany(detail);

//         // Удаляем Том
//         detail = {'_id': id};
//         let r = await db.db(db_name).collection("Tome").deleteOne(detail);
        
//         // удаляем Том из Предмета
//         if(t != null)
//         {
//             var subject_id = new require('mongodb').ObjectID(t.subject);    
//             detail = {'_id': subject_id};
//             b.db(db_name).collection("Subjects").update(detail, {
//                $pull:{ toms: request.param("id")}
//             });
//         }else response.send("-1")   

//         response.send("1");      
//     });    
// }