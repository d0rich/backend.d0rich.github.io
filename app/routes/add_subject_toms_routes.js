const db_name = "HomeTasks";
//  1 : Добавлено успешно;
// -1 : Не найдено совпадений;
// -2 : Ошибка ID;



module.exports = function(app, db) 
{   
   app.get('/add_subject_tom', async (request,response)=>{    
        // Добавляем новый том     
        let r = await db.db(db_name).collection("Tome").insert(
            {
                name: request.param("name"), 
                tasks:[],
                subject:request.param("id") 
            }); 
        console.log(r); 
        // Добавляем в Предмет полученный том       
        try
        {
            var id = new require('mongodb').ObjectID(request.param("id"));    
            var detail = {'_id': id};
            db.db(db_name).collection("Subjects").update(detail, {
                $push:{ toms: String(r.ops[0]._id)}
            }); 
            response.send("1");     
        }  
        catch(error)
        {
            response.send("-2");
        }                          
    });    
}
