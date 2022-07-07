const db_name = "DorichProdSite";

// -1 : Не найдено совпадений;
// -2 : Ошибка ID



module.exports = function(app, db) {
    app.get('/getProject', async(request, response) => {
        console.log(request.param("language"));
        try {
            var detail = { 'language': request.param("language"), 'id': request.param("projectID") };
            db.db(db_name).collection("Projects").findOne(detail, (error, docs) => {
                if (docs == null) response.send("-1");
                else response.send(docs);
            });
        } catch (error) {
            response.send({ status: "error", message: error.message });
            console.log(error);
        }
    });
}