const express = require('express');
const bodyParser = require('body-parser'); // allow json data to pass through body
const path = require("path");
const db = require("./dbConnection");

const app = express();
const port = 8080;

// middleware to handle receiving form fields on the backend
app.use(bodyParser.json());

// Categories route, used in /home.html to get category name by id
app.route('/categories').get(function (req, res) {
    // the database retrieval code
    //implement SELECT query to retrieve all RESTAURANTS
    let sql = "SELECT * FROM category";
    //perform query to database from web server
    db.query(sql, function(error, result) {
        if(error) {
            res.json(error);
        } else {
            //return result as json
            res.json(result);
        }
    });
});

// Products route, used in home.html to list products
app.route('/products').get(function (req, res) {
    // the database retrieval code
    //implement SELECT query to retrieve all RESTAURANTS
    let sql = "SELECT * FROM product";
    //perform query to database from web server
    db.query(sql, function(error, result) {
        if(error) {
            res.json(error);
        } else {
            //return result as json
            res.json(result);
        }
    });
});

// Products route, used to insert product into the database
app.route('/products').post(function (req, res) {
    // body is json object
    const body = [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.category_id];
    // INSERT into database products.products
    const sqlQuery = `INSERT INTO product (name, description, price, picture, category_id) VALUES (?,?,?,?,?)`;
    //perform query to database from web server
    db.query(sqlQuery, body, function(error, result) {
        if(error) {
            res.json(error);
        } else {
            //return result as json
            res.json(result);
        }
    });
});

// Products route to delete product by specified id
app.route('/products/:id').delete(function(req, res) {
    let sqlQuery = `DELETE FROM product WHERE id = ${req.params.id}`;
    //perform query to database from web server
    db.query(sqlQuery, function(error, result) {
        if(error) {
            res.json(error);
        } else {
            //return result as json
            res.json(result);
        }
    });
});

app.route('/products/:id').put(function(req, res) {
    // body is json object
    const body = req.body;
    // get product id
    const productId = req.params.id;
    // check if any fields are empty, don't update if empty
    // if not empty, push into query
    const sqlQuerySet = [];
    // ternary operator (condition ? do if true : do if false)
    body.name ? sqlQuerySet.push(`name = '${body.name}'`) : null;
    body.description ? sqlQuerySet.push(`description = '${body.description}'`) : null;
    body.price ? sqlQuerySet.push(`price = ${body.price}`) : null;
    body.picture ? sqlQuerySet.push(`picture = ${body.picture}`) : null;
    body.category ? sqlQuerySet.push(`category_id = ${body.category}`) : null;

    // update product in database using id and body
    let sqlQuery = `UPDATE product SET ${sqlQuerySet.join(', ')} WHERE id = ${productId}`;
    //perform query to database from web server
    db.query(sqlQuery, function(error, result) {
        if(error) {
            res.json(error);
        } else {
            //return result as json
            res.json(result);
        }
    });
});

// surfing "localhost:8080/" will default to home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'home.html'));
});
// serve html files
app.use('/', express.static(path.join(__dirname, 'html')));
// due to the folder structure, we need to serve css and js folders too.
// express is unable to allow the html files to link to css and js files
// without linking with my folder structure.
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('listening on port:', port));
db.connect();