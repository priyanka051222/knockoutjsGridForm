var express = require("express"),
    app = express(),
    http = require("http"),
    jsonfile = require('jsonfile'),
//    file = './assets/cart.json',
    transactionsFile = './assets/stubData/transactions.json',
    countriesFile = './assets/stubData/countries.json',
    statesFile='./assets/stubData/states.json',
    usersFile = './assets/stubData/users.json',
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cartPageData = [], homePageData = [];
    var errorObj={
      "message ":" "

    };

app.get("/", function(req, res) {
  fs.readFile('index.html', 'utf8', function(err, contents) {
        if (!err)
            res.send(contents);
        else
            res.send('error' + err);
    });
})

app.use(express.static('.'));
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log('DemoProject started at ' + port);
})
var countryList=[];
//returns all types of products
app.get('/api/getCountries', function(req, res) {
    jsonfile.readFile(countriesFile, function(err, obj) {

      if(countryList.length == 0){
          countryList = obj.countryList;
      }

      res.json(countryList);
  })

});


//returns a states of a country
app.get('/api/States/:id', function(req, res) {

    jsonfile.readFile(statesFile, function(err, obj) {
        var rec = obj["states"][req.params.id];
        console.log(rec);
        res.json(rec);
        res.status(200);
    })
});
var userList = [];
//returns a product in the cart
app.get('/api/getUserList', function(req, res) {

    jsonfile.readFile(usersFile, function(err, obj) {
        if(userList.length < 1){
          userList=obj.userList;
          console.log(userList);
        }
        res.json(userList);
        res.status(200);
    })
});
app.post('/api/createUser', function(req, res) {
    userList.push(req.body);
    errorObj.message ="User is created."
    res.json(errorObj)
    res.status(200);
    res.end();
});
//Adds or updates a product in the cart
app.post('/api/addToCartProduct', function(req, res) {

    var resJSON = req.body;

    if (cartPageData.length > 0) {
      console.log(cartPageData);
        var updatedQty = null;
        cartPageLen = cartPageData.length,
            foundObject = null;

        for (var i = 0; i < cartPageLen; i++) {
            console.log("Record entered in loop");

            if (cartPageData[i].p_id == req.body.p_id && cartPageData[i].p_selected_size.code == req.body.p_selected_size.code && cartPageData[i].p_selected_color.name == req.body.p_selected_color.name) { // is product id + product size same?

                console.log("Same Record Found");
                foundObject = cartPageData[i];
                updatedQty = parseInt(req.body.p_quantity)
                //updatedQty = parseInt(cartPageData[i].p_quantity) + parseInt(req.body.p_quantity);
                cartPageData[i].p_quantity = updatedQty;
                cartPageData[i].sno = cartPageData.length + 1;
                res.json(cartPageData);


                console.log("Record updated - 1st Time");
            }
        }

        if (!foundObject) {
            console.log("Record Added - 2nd Time", cartPageData.length);
            cartPageData.push(resJSON);

            console.log(cartPageData);
            // res.status(200);
            res.json(cartPageData);
        }
    } else {

        console.log("Record Added - 1st Time");

        cartPageData.push(resJSON);

        res.json(cartPageData);
        console.log(cartPageData);

        res.end();
    }

})

//Removes a product from the cart
app.post('/api/removeFromCart', function(req, res) {

    var resJSON = req.body;

    if (cartPageData.length > 0) {

        var updatedQty = null;
        cartPageLen = cartPageData.length,
        foundObject = null;

        for (var i = 0; i < cartPageLen; i++) {
           if (cartPageData[i].p_id == req.body.p_id && cartPageData[i].p_selected_size.code == req.body.p_size && cartPageData[i].p_quantity == req.body.p_quantity && cartPageData[i].p_selected_color.name == req.body.p_selectedColor) {
            cartPageData.splice(i, 1);
            break;
            }
        }
        console.log("xxxx="+cartPageData);
        res.json(cartPageData);


        res.end();
    }
});


//Get products which are in cart
app.get('/api/cartPage', function(req, res) {
  if(cartPageData.length == 0){
    jsonfile.readFile(file, function(err, obj) {
        cartPageData = obj.productsInCart;
        console.log("DATA" , cartPageData);
        res.json(cartPageData);
    })
  }else{
    console.log(cartPageData);
    res.json(cartPageData)
    res.status(200);
  }

})
