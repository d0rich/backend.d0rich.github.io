const db_name = "HomeTasks";

module.exports = function(app, db) 
{   
   app.get('/test', async (request,response)=>{
    let docqs;   
    let r = await db.db(db_name).collection("Tome").find({},{limit: 100}).toArray((error,docs)=>{
        response.send(docs);
        console.log(docs);
    });
    response.send(docs);    
    });    
}