const db_name = "DorichProdSite";

// -1 : Не найдено совпадений;
// -2 : Ошибка ID



module.exports = function(app, db) {
    app.get('/getProjects', async(request, response) => {
        console.log(request.param("language"));
        try {
            var lang = request.param("language");
            var detail = { 'language': lang };
            var result = await db.db(db_name).collection("Projects").find(detail).toArray();
            response.send(result);
        } catch (error) {
            response.send({ status: "error", message: error.message });
            console.log(error);
        }
    });
}