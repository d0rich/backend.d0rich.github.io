const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/del_task', async (request,response)=>{    

        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        var t = await db.db(db_name).collection("Task").findOne(detail);
        console.log(t);

        let r = await db.db(db_name).collection("Task").deleteOne(detail);

        var tom_id = new require('mongodb').ObjectID(t.tom);    
        var detail = {'_id': tom_id};
        db.db(db_name).collection("Tome").update(detail, {
            $pull:{ tasks: request.param("id")}
        });         
        response.send("done");     
    });    
}
