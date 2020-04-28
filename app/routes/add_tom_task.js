const db_name = "HomeTasks";
//  1 : Добавлено успешно;
// -1 : Не найдено совпадений;
// -2 : Ошибка ID;



module.exports = function(app, db) 
{   
   app.get('/add_tom_task', async (request,response)=>{ 
        let date = request.param("deadline").split('-');       
        let r = await db.db(db_name).collection("Task").insert({
            tom: request.param("id"),
            name: request.param("name"), 
            doneers: [],
            bounty: Number(request.param("bounty")),
            discription: request.param("about"),
            comments: [],
            isClaimed: false,
            deadline: request.param("deadline") == 0 ? new Date(2001, 1, 2,0,0,0,0) :new Date(date[0], parseInt(date[1])-1, parseInt(date[2])+1,0,0,0,0)
        }); 
        console.log(r);        
        try
        {
            var id = new require('mongodb').ObjectID(request.param("id"));    
            var detail = {'_id': id};
            db.db(db_name).collection("Tome").update(detail, {
                $push:{ tasks: String(r.ops[0]._id)}
            }); 
            response.send("1");     
        }  
        catch(error)
        {
            response.send("-2");
        }                          
    });    
}
