const db_name = "HomeTasks";
const fields = "photo_50";
const accses_token = "7333ece17333ece17333ece1d373432f62773337333ece12dbbda3412d332504e621c42";
const v = "5.103";
const fetch = require("node-fetch");

module.exports = function(app, db) 
{   
   app.get('/get_users_vk_info', async (request,response)=>
   {      
        let r = await fetch(`https://api.vk.com/method/users.get?user_ids=${request.param("ids")}&fields=${fields}&access_token=${accses_token}&v=${v}`);
        result = await r.json();
        response.send(result);
   });    
}