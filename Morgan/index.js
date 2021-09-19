function customer_add(req , res) {
  let data = req.body;

  let customer_id = data['customer_id'];
  let customer_unique_id = data['customer_unique_id'];
  let customer_zip_code_prefix = data['customer_zip_code_prefix'];
  let customer_city = data['customer_city'];
  let customer_state = data['customer_state'];
  
  let customers = `INSERT INTO customers(customer_id,customer_unique_id,customer_zip_code_prefix,customer_city,customer_state)
           VALUES('${customer_id}','${customer_unique_id}','${customer_zip_code_prefix}','${customer_city}','${customer_state}')`;

  connection.query(customers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)

}


function customer_update(req , res) {

  let data = req.body;

  let cust_id = req.params.id;
  console.log(cust_id);

  // let customer_id = data['customer_id'];
  let customer_unique_id = data['customer_unique_id'];
  let customer_zip_code_prefix = data['customer_zip_code_prefix'];
  let customer_city = data['customer_city'];
  let customer_state = data['customer_state'];
  
  let customers = `UPDATE customers SET customer_unique_id = '${customer_unique_id}',customer_zip_code_prefix = '${customer_zip_code_prefix}',customer_city = '${customer_city}',customer_state = '${customer_state}' WHERE customer_id = '${cust_id}'`;


  connection.query(customers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)
}


function customer_delete(req , res) {

  let cust_id = req.params.id;


  let customers = `DELETE FROM customers WHERE customer_id = '${cust_id}'`;

  connection.query(customers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)
}


function customer_view(req , res) {

  let customers = `SELECT * FROM customers`;

  connection.query(customers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log(results)
    res.json(results)

  });
}


function order_items_view(req , res) {

  let order_id = req.params.id;

  let sql = `SELECT * FROM order_items WHERE order_id = '${order_id}'`;

 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }

    console.log(results)
    res.send(results)

  });
}


function order_items_add(req , res) {

 let data = req.body;
  
  let order_id = data['order_id'];
  console.log(order_id)
  let order_item_id = data['order_item_id'];
  let product_id = data['product_id'];
  let seller_id = data['seller_id'];
  let payment_value = data['payment_value'];
  let order_purchase_timestamp = data['order_purchase_timestamp'];
  
  let sql = `INSERT INTO order_items(order_id,order_item_id,product_id,seller_id,payment_value,order_purchase_timestamp)
           VALUES('${order_id}','${order_item_id}','${product_id}','${seller_id}','${payment_value}','${order_purchase_timestamp}')`;

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)

}


function order_items_update(req , res) {

  let order_id = req.params.id;

  let data = req.body;
  console.log(data)
  // let order_id = data['order_id'];
  console.log(order_id)
  let order_item_id = data['order_item_id'];
  let product_id = data['product_id'];
  let seller_id = data['seller_id'];
  let shipping_limit_date = data['shipping_limit_date'];
  let freight_value = data['freight_value'];
  let order_purchase_timestamp = data['order_purchase_timestamp'];
  
  let sql = `UPDATE order_items SET order_item_id='${order_item_id}',product_id='${product_id}',seller_id='${seller_id}',shipping_limit_date='${shipping_limit_date}',freight_value='${freight_value}',order_purchase_timestamp='${order_purchase_timestamp}' WHERE order_id = '${order_id}'`;

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }

    console.log('Rows affected:', results);
    // res.send(results)
  });

res.sendStatus(200)
}


function order_items_delete(req , res) {

let order_id = req.params.id;

let sql = `DELETE FROM order_items WHERE order_id = '${order_id}'`;

 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)
}


function order_payments_view(req , res) {
 
  let order_id = req.params.id;

  let sql = `SELECT * FROM order_payments WHERE order_id = '${order_id}'`;


 connection.query(order_payments, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    res.json(results)

  });


// res.sendStatus(200)

}


function order_payments_update(req , res) {

  let order_id = req.params.id;
 
  let data = req.body;
  
  let order_id = data['order_id'];
  console.log(order_id)
  let payment_sequential = data['payment_sequential'];
    console.log(payment_sequential)
  let payment_type = data['payment_type'];
  let payment_installments = data['payment_installments'];
  let payment_value = data['payment_value'];
  let order_purchase_timestamp = data['order_purchase_timestamp'];

  
  let sql = `UPDATE order_items SET payment_sequential='${payment_sequential}',payment_type='${payment_type}',payment_installments='${payment_installments}',payment_value='${payment_value}',order_purchase_timestamp='${order_purchase_timestamp}' WHERE order_id = '${order_id}'`;


 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)

}


function order_payments_add(req , res) {
 
  let data = req.body;
  
  let order_id = data['order_id'];
  console.log(order_id)
  let payment_sequential = data['payment_sequential'];
    console.log(payment_sequential)
  let payment_type = data['payment_type'];
  let payment_installments = data['payment_installments'];
  let payment_value = data['payment_value'];
  let order_purchase_timestamp = data['payment_value'];
  
  let sql = `INSERT INTO order_items(order_id,payment_sequential,payment_type,payment_installments,payment_value,order_purchase_timestamp)
           VALUES('${order_id}','${payment_sequential}','${payment_type}','${payment_installments}','${payment_value}','${order_purchase_timestamp}')`;


 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)

}


function order_payments_delete(req , res) {

 let order_id = req.params.id;

 let sql = `DELETE FROM order_payments WHERE order_id = '${order_id}'`;


 connection.query(order_payments, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)

}


function orders_view(req , res) {

  let order_id = req.params.id;

  let sql = `SELECT * FROM orders WHERE order_id = '${order_id}'`;

 connection.query(orders, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }

        res.json(results)

  });


// res.sendStatus(200)

}

function orders_add(req , res) {

 let data = req.body;
  
  let order_id = data['order_id'];
  console.log(order_id)
  let customer_id = data['customer_id'];
  let order_status = data['order_status'];
  let order_purchase_timestamp = data['order_purchase_timestamp'];
  let order_approved_at = data['order_approved_at'];
  let order_delivered_carrier_date = data['order_delivered_carrier_date'];
  let order_delivered_customer_date = data['order_delivered_customer_date'];
  let order_estimated_delivery_date = data['order_estimated_delivery_date'];
  
  let sql = `INSERT INTO order_items(order_id,customer_id,order_status,order_purchase_timestamp,order_approved_at,order_delivered_carrier_date,order_delivered_customer_date,order_estimated_delivery_date)
           VALUES('${order_id}','${customer_id}','${order_status}','${order_purchase_timestamp}','${order_approved_at}','${order_delivered_carrier_date}','${order_delivered_customer_date}','${order_estimated_delivery_date}')`; 


 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

res.sendStatus(200)

}

function orders_update(req , res) {

 let data = req.body;

 let order_id = req.params.id;

  
  // let order_id = data['order_id'];
  console.log(order_id)
  let customer_id = data['customer_id'];
  let order_status = data['order_status'];
  let order_purchase_timestamp = data['order_purchase_timestamp'];
  let order_approved_at = data['order_approved_at'];
  let order_delivered_carrier_date = data['order_delivered_carrier_date'];
  let order_delivered_customer_date = data['order_delivered_customer_date'];
  let order_estimated_delivery_date = data['order_estimated_delivery_date'];
  
  let sql = `UPDATE orders SET customer_id='${customer_id}',order_status='${order_status}',order_purchase_timestamp='${order_purchase_timestamp}',order_approved_at='${order_approved_at}',order_delivered_carrier_date='${order_delivered_carrier_date}',order_delivered_customer_date='${order_delivered_customer_date}',order_estimated_delivery_date='${order_estimated_delivery_date}' WHERE order_id = '${order_id}'`;

 connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


res.sendStatus(200)

}


function orders_delete(req , res) {

  let order_id = req.params.id;

  let sql = `DELETE FROM orders WHERE order_id = '${order_id}'`;

 connection.query(sql, function(err, results, fields) {
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

const port = process.env.PORT || 3003

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

app.post('/customer_add', cors() ,(req, res) => {
  console.log(req.body)
    customer_add(req, res)
})
app.put('/customer_update/:id', cors() ,(req, res) => {
  console.log(req.body)
    customer_update(req, res)
})
app.delete('/customer_delete/:id', cors() ,(req, res) => {
  console.log(req.params.id)
    customer_delete(req, res)
})
app.get('/customer_view', cors() ,(req, res) => {
  console.log(req.body)
    customer_view(req, res)
})

app.get('/order_items_view/:id', cors() ,(req, res) => {
  console.log(req.params.id)
    order_items_view(req, res)
})
app.post('/order_items_add', cors() ,(req, res) => {
  console.log(req.body)
    order_items_add(req, res)
})
app.put('/order_items_update/:id', cors() ,(req, res) => {
  console.log(req.params.id)
    order_items_update(req, res)
})
app.delete('/order_items_delete/:id', cors() ,(req, res) => {
  console.log(req.params.id)
    order_items_delete(req, res)
})

app.get('/order_payments_view/:id', cors() ,(req, res) => {
  console.log(req.body)
    order_payments_view(req, res)
})
app.put('/order_payments_update/:id', cors() ,(req, res) => {
  console.log(req.body)
    order_payments_update(req, res)
})
app.post('/order_payments_add', cors() ,(req, res) => {
  console.log(req.body)
    order_payments_add(req, res)
})
app.delete('/order_payments_delete/:id', cors() ,(req, res) => {
  console.log(req.body)
    order_payments_delete(req, res)
})

app.post('/orders_view', cors() ,(req, res) => {
  console.log(req.body)
    orders_view(req, res)
})
app.post('/orders_add', cors() ,(req, res) => {
  console.log(req.body)
    orders_add(req, res)
})
app.post('/orders_update', cors() ,(req, res) => {
  console.log(req.body)
    orders_update(req, res)
})
app.post('/orders_delete', cors() ,(req, res) => {
  console.log(req.body)
    orders_delete(req, res)
})

app.listen(port, ( ) => {
  console.log(`🌏 Server is running at http://localhost:${port}`)
})
