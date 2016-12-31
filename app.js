var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

console.log("Express server running on port 3000");
app.listen(3000);