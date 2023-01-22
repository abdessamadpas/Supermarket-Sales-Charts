const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = process.env.DB_CONNECTION;

router.get('/purchases-by-customer-type', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db('supermarket_sales_data');
        db.collection('sales').aggregate([
            { $match: {} },
            {
                $group: {
                    _id: "$Customer type",
                    count: { $sum: 1 },

                    purchases: { $sum: { $toDouble: "$Quantity" } } // sum of all purchases
                }
            }
        ]).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            client.close();
        });
    });
});

module.exports = router;