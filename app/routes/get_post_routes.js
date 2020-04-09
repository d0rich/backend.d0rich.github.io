var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function sendRequest(method, url){
	return new Promise( (resolve, reject) =>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url);
		xhr.responseType = 'json';

		xhr.onload = () => {
			if (xhr.status >= 400) {
				reject(xhr.response);
			}else{
				resolve(xhr.response);
			}
		}
		xhr.onerror = () => {
			reject(xhr.response);
		}
		xhr.send();
	});
}
module.exports = function(app, db) {
    app.get('/get_post/', (req, res) => {
        try{
            console.log("Hello");
        var dataserver =  sendRequest("GET","https://moyaposylka.ru/api/v1/carriers/LO530827213CN");
        res.send(dataserver);
        }catch(err){
            console.log(err);
        } 
        
      
    });
  };