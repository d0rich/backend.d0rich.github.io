const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/get_members', async (request,response)=>{      
    let r = await db.db(db_name).collection("Members").find({},{limit: 100}).toArray((error,docs)=>{
        response.send(docs);        
    });       
    });    
}