const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/del_member', async (request,response)=>{    
        
        var id = new require('mongodb').ObjectID(request.param("id"));    
        var detail = {'_id': id};
        let r = await db.db(db_name).collection("Members").deleteOne(detail); 
        response.send(r);      
    });    
}