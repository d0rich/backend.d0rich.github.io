const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/add_subject', async (request,response)=>{    
        let output; 
        let r = await db.db(db_name).collection("Subjects").insert({name: request.param("name"), toms:[]}); 
        response.send(r);      
    });    
}