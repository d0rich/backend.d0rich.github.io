const db_name = "HomeTasks";
//  1 : Добавлено успешно;
// -1 : Не найдено совпадений;
// -2 : Ошибка ID;

// id - ID задания
// user - VK ID пользователя
// test - комментарий

module.exports = function(app, db) 
{   
   app.get('/comment_task', async (request,response)=>
   {    
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};                      
        // Обновить данные задания
        db.db(db_name).collection("Task").update(detail, {                       
            $push:
            {
                comments: 
                {
                    id: request.param("user"),
                    text: request.param("text")
                }
            }
        });
         
        response.send("1");                                
    });    
}

