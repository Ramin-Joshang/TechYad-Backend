const mongoose = require("mongoose");

async function test() {
    try {
        await mongoose.connect("mongodb://rjwshng_db_user:52MAZY3ZijrCC9hl@ac-odrjmze-shard-00-00.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-01.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-02.opldvna.mongodb.net:27017/?ssl=true&replicaSet=atlas-1dapb6-shard-0&authSource=admin&appName=Cluster0");
        console.log("Connected successfully!");
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

test();
