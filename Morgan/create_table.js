function customers(req , res) {


  let customers = `CREATE TABLE customers (
customer_id varchar(32) NOT NULL PRIMARY KEY,
customer_unique_id varchar(32) NOT NULL,
customer_zip_code_prefix decimal(10,0) NOT NULL,
customer_city varchar(27) NOT NULL,
customer_state varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1`;


  connection.query(customers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });



res.sendStatus(200)
}


function order_items(req , res) {


  let order_items = `CREATE TABLE order_items (
order_id varchar(32) NOT NULL PRIMARY KEY,
order_item_id decimal(10,0) NOT NULL,
product_id varchar(32) NOT NULL,
seller_id varchar(32) NOT NULL,
shipping_limit_date timestamp NULL DEFAULT NULL,
price decimal(10,0) ,
freight_value decimal(10,0) NOT NULL,
order_purchase_timestamp timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;

 connection.query(order_items, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)
}

function order_payments(req , res) {



  let order_payments = `CREATE TABLE order_payments (
order_id varchar(32) NOT NULL,
payment_sequential decimal(10,0) NOT NULL,
payment_type varchar(11) NOT NULL,
payment_installments decimal(10,0) NOT NULL,
payment_value decimal(10,0) NOT NULL,
order_purchase_timestamp timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;

 connection.query(order_payments, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)

}

function orders(req , res) {



  let orders = `CREATE TABLE orders (
order_id varchar(32) NOT NULL FOREIGN KEY,
customer_id varchar(32) NOT NULL FOREIGN KEY,
order_status varchar(11) NOT NULL,
order_purchase_timestamp timestamp NULL DEFAULT NULL,
order_approved_at timestamp NULL DEFAULT NULL,
order_delivered_carrier_date timestamp NULL DEFAULT NULL,
order_delivered_customer_date timestamp NULL DEFAULT NULL,
order_estimated_delivery_date timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;

 connection.query(orders, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });



res.sendStatus(200)

}


const express = require('express'); //make express available
const app = express(); //invoke express
var cors = require('cors')
// will use this later to send requests
const http = require('http')
// import env variables
require('dotenv').config()

const port = process.env.PORT || 3000

let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'morgan',
  password: 'Password@123',
  database: 'Morgan',
  insecureAuth : true
});


  


app.options('*', cors()) // include before other routes

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).send('Server is working.')
})

app.post('/customers', cors() ,(req, res) => {
  console.log(req.body)
    customers(req, res)
})

app.post('/order_items', cors() ,(req, res) => {
  console.log(req.body)
    order_items(req, res)
})

app.post('/order_payments', cors() ,(req, res) => {
  console.log(req.body)
    order_payments(req, res)
})

app.post('/orders', cors() ,(req, res) => {
  console.log(req.body)
    orders(req, res)
})

app.listen(port, ( ) => {
  console.log(`🌏 Server is running at http://localhost:${port}`)
})
