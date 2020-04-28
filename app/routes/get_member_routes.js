const db_name = "HomeTasks";

// -1 : Не найдено совпадений;
// -2 : Ошибка ID



module.exports = function(app, db) 
{   
   app.get('/get_member', async (request,response)=>{    
        try
        {
            var detail = {'vk_id': request.param("id")};
            db.db(db_name).collection("Members").findOne(detail, (error, docs) =>
            {
                if(docs == null) response.send("-1");
                else response.send(docs);
            });       
        }  
        catch(error)
        {
            response.send("-2");
        }                          
    });    
}
