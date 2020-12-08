require("dotenv").config();
const database = require("./database");
(async () => {
    await database.conexionMongoDB.connect();
    require("./server")

})();