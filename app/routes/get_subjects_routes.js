const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/get_subjects', async (request,response)=>{      
    let r = await db.db(db_name).collection("Subjects").find({},{limit: 100}).toArray();
    response.send({items:r});       
    });    
}