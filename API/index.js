const express = require('express');
const morgan = require('morgan');

const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const revenue_by_product_line = require('./routes/revenue_by_product_line.js');
const purchases_by_customer_type = require('./routes/purchases-by-customer-type');
const average_rating_by_gender = require('./routes/average-rating-by-gender');
// connect to  mongodb
const uri = process.env.DB_CONNECTION;



app.get('/hello', (req, res) => {
    res.json({
        message: " ❤ hello To my backend ❤",
    });
});
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', purchases_by_customer_type);
app.use('/api', revenue_by_product_line);
app.use('/api', average_rating_by_gender);





const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    if (err) {
        console.log("Error connecting to the database: ", err);
    } else {
        console.log("Connected to the database successfully.");
    }
});
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ', process.env.PORT);
});