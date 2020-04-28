const db_name = "HomeTasks";

// 1 - Успешно удалено
// -1 - Том не существует

module.exports = function(app, db) 
{   
   app.get('/del_tom', async (request,response)=>{    
        // Находим Том
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        var t = await db.db(db_name).collection("Tome").findOne(detail);
        console.log(t);        
        // удаляем Том из Предмета
        if(t != null)
        {
            var subject_id = new require('mongodb').ObjectID(t.subject);    
            detail = {'_id': subject_id};
            let p = await db.db(db_name).collection("Subjects").update(detail, {
               $pull:{ toms: request.param("id")}
            });
        }else response.send("-1") 
        // Удаляем задания Тома
        detail = {'tom': request.param("id")};
        let d = await db.db(db_name).collection("Task").deleteMany(detail);
        // Удаляем Том
        detail = {'_id': id};
        let r = await db.db(db_name).collection("Tome").deleteOne(detail);

        response.send("1");      
    });    
}
