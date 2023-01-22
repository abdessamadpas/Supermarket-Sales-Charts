const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
require('dotenv').config();

const csv = require('csv-parser');
const url = process.env.DB_CONNECTION;





const collectionName = 'sales';

const fileName = process.argv[2];

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) throw err;
    const db = client.db();
    const bulk = db.collection(collectionName).initializeUnorderedBulkOp();
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (data) => {
            console.log("pass in to data :", data);
            bulk.insert(data);
        })
        .on('end', () => {
            bulk.execute((err) => {
                console.log('end of import');
                client.close();
                if (err) throw err;
            });
        });
});