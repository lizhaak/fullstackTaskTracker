'use strict';

const PORT = 8484;
const FILENAME = './data.json';

var express = require('express');
var moment = require('moment');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/todos', function(req, res) {
  fs.readFile('./items.json', function(err, data) {
    var todos = JSON.parse(data);
    console.log('todos', todos);
    res.send(todos);
  });
});


app.get('/test', function(req, res) {
  console.log('req.query:', req.query);
  console.log('req.querey.index:', req.query.index);
  res.send('GET to /test\n');
});

app.delete('/todos/:index', function(req, res){
  console.log("req.params:", req.params);

  console.log(req.params.index);

  res.send('DELETE to /todos/:index');

});

app.get('/', function(req, res, next) {       //pushes back to frontend
  res.sendFile(path.join(__dirname, './index.html'));
});


app.use(function(req, res, next) {   //pushes back to server
  console.log('MIDDLEWARE!!!');
  next();
});

app.get('/', function(req, res) {     

  res.send('OK!!!!');                 //push to frontend - html on localhost
});

app.post('/', function(req, res) {
  console.log(req);
  res.send('posted!');
});


//push the newItem into the array

app.post('/description', function(req, res, next) {
  console.log('POSTING TEST');
  console.log('req.body', req.body);

  fs.readFile('./items.json', function(err, data) {
    console.log('data1', data);
    var items = JSON.parse(data);
    var item = req.body;
    console.log('itemOnly:', item);
    items.push(item);

    fs.writeFile('./items.json', JSON.stringify(items), function(err) {  //pushes item into array and writes it in json file
      console.log('done');
      res.send(items);
    });
  });

});

// app.post('/description', function(req, res, next) {
//   console.log('POST /description');
//   console.log('req.body:', req.body.newItem);
//   res.send(req.body.newItem);
// })


var server = http.createServer(app);

server.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});




// var server = http.createServer(function(req, res) {
//   var urlParts = req.url.match(/[^/]+/g);

//   switch(urlParts[1]){
//     case 'addName':
//       fs.readFile(FILENAME, function(err, data){
//         if(!data) data = '[]';

//         var names = JSON.parse(data);
//         names.push(urlParts[2]);

//         fs.writeFile(FILENAME, JSON.stringify(names), function(err) {
//           console.log('done:', done);
//           console.log('err:', err);
//           res.end();
//         })
//       })
//       break;

//     case 'getNames':
//       fs.readFile(FILENAME, function(err, data) {
//         if(!data) data = '[]';
//         var names = JSON.parse(data);
//         res.write(names);
//         res.end();
//       })
//       break;
      
//     default:
//     res.end();
//   }


// });

// var server = http.createServer(app);

// server.listen(PORT, function() {
//   console.log(`Server listneing on port ${PORT}`);
// });










// var newTimestamp = moment().format('h:mm:ss');

// fs.readFile(FILENAME, function(err, data) {
//   if(err) {
//     console.log('err:', err);
//   }

//   console.log('data:', data);
//   console.log('JSON.parse(data: ', JSON.parse(data));


//   // fs.writeFile(FILENAME, JSON.stringify(timestamps), function(err) {
//   //   console.log('done!');
//   // });
// });



// fs.readFile(FILENAME, function(err, data) {
//   if(err) {
//     console.log('err:', err);
//     return;
//   }

//   var timestamps = JSON.parse(data);

//   timestamps.push(newTimestamp);

//   fs.writeFile(FILENAME, JSON.stringify(timestamps), function(err) {
//     console.log('done!');
//   });
// });


// fs.readFile('./data.json', function(err, data) => {      //read a file in terminal
//   console.log('err', err);
//   console.log('data', data);
//   console.log('data.toString', data.toString());

//   console.log('JSON.parse(data.toString()): ', JSON.parse(data.toString()));

// })

// fs.writeFile('./data.json', 'hey!!!!', function(err) {       //write a file in json file
//   console.log('err', err);

// });
