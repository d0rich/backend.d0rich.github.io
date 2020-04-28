const db_name = "HomeTasks";

// -1 : Не найдено совпадений;
// -2 : Ошибка ID



module.exports = function(app, db) 
{   
   app.get('/get_tom_tasks', async (request,response)=>{    
        console.log(request.param("id"));
        try
        {
            var id = new require('mongodb').ObjectID(request.param("id"));    
            var detail = {'_id': id};
            db.db(db_name).collection("Tome").findOne(detail, (error, docs) =>
            {
                if(docs == null) response.send("-1");
                else response.send(docs.tasks);
            });       
        }  
        catch(error)
        {
            response.send("-2");
        }                          
    });    
}
