
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var authenticate = require('./routes/authenticate');
var buy_mf = require('./routes/buy_mf');
var sell_mf = require('./routes/sell_mf');
var Sell = require('./routes/Sell');


var http = require('http');
var path = require('path');
var session = require('express-session');
var purchase  = require('./routes/purchase');
//load customers route
var welcome = require('./routes/welcome');
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'Passw0rd',
        port : 3306, //port mysql
        database:'codeathon'
    },'request')
);//route index, hello world

//Request Handlers 

app.get('/', routes.index);
app.post('/welcome', welcome.list);
app.post('/authenticate' , authenticate.authenticate);
app.get('/buy_mf' , buy_mf.buy_mf);
app.get('/sell_mf' , sell_mf.sell_mf);
app.post('/Sell' , Sell.Sell);
app.post('/purchase' , purchase.purchase);

app.get('/UpdateProfile' , welcome.updateProfile);
app.get('/home' , welcome.home);

/*app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);//route delete customer
app.get('/customers/delete/:id', customers.delete_customer);//edit customer route , get n post
app.get('/customers/edit/:id', customers.edit); 
app.post('/customers/edit/:id',customers.save_edit);*/
app.use(app.router);

// Server Creation

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
