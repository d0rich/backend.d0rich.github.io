const db_name = "HomeTasks";
//  1 : Добавлено успешно;
//  0 : Уже есть;
// -1 : Не найдено совпадений;
// -2 : Ошибка ID;



module.exports = function(app, db) 
{   
   app.get('/add_member', async (request,response)=>{ 
        var detail = {'vk_id': request.param("vk_id")};
        let search = await db.db(db_name).collection("Members").findOne(detail, {});
        if(search == null)
        {
            let r = await db.db(db_name).collection("Members").insert({
            vk_id: request.param("vk_id"),
                rep: 0,
                task_count: 0,
                isHead: false
            }); 
            response.send("1");
        }
        else
        {
            response.send("0");
        }                                           
    });    
}

