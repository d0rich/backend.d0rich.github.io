const db_name = "HomeTasks";
//  1 : Добавлено успешно;
// -1 : Не найдено совпадений;
// -2 : Ошибка ID;

// id - ID задания
// user - VK ID пользователя

module.exports = function(app, db) 
{   
   app.get('/done_task', async (request,response)=>
   {    
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        

        // Получить данные задания
        let task = await db.db(db_name).collection("Task").findOne(detail, {});   

        // Установить награду 
        let bounty = task.isClaimed ? task.bounty/5 : task.bounty;
        
        // Обновить данные задания
        db.db(db_name).collection("Task").update(detail, {
            $set:
            { 
                isClaimed: true
            },            
            $push:
            {
                doneers: request.param("user")
            }
        });

        // Обновить данные пользователя           
        var u_detail = {'vk_id': request.param("user")};            
        let upd_r = await db.db(db_name).collection("Members").update(u_detail, {            
            $inc:
            {
                rep : bounty,
                task_count: 1
            }
        }); 
         
        response.send("1");                                
    });    
}

