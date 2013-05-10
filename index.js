var express = require('express'),
path = require('path'),gallery = require('node-gallery');
var app = express();
app.configure(function() {
   app.use(express.logger('dev')); //what's this ?
   app.use(express.static(path.join(__dirname, 'public')));
   app.use(gallery.middleware({static: 'public', directory: 'pics', rootURL: "/gallery"}));
});
app.get('/gallery*', function(req, res){
   var data = req.gallery;
   data.layout = false; // Express 2.5.* support, don't look for layout.ejs
   //rederiing the html page, Album or Photo
   res.render(data.type + '.ejs', data);
});
app.get('/', function(req, res){
   res.redirect('/gallery');
});

app.listen(3000);
console.log("Listening on port 3000");
