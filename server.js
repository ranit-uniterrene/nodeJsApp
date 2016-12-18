var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('mongodb://ranit:ranit@ds139278.mlab.com:39278/test1',['collection1']);


app.use(express.static(__dirname +"/public"));

app.use(bodyParser.json());
app.get('/contactlists', function(req, res){
	
	db.collection1.find(function(err, data){
		console.log(data);
		res.json(data)
	});
});

//post
app.post('/contactlists', function(req, res){
	console.log(req.body);
	db.collection1.insert(req.body, function(err, data){
		res.json(data);
	});
});
//delete
app.delete('/contactlists:id',function(req, res){
	console.log("want to delete: "+req.params.id);
	var id = req.params.id;
	db.collection1.remove({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
});

//edit
app.get('/contactlists/:id', function(req, res){
	var id = req.params.id;
	db.collection1.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
});

//update

app.put('/contactlists/:id',function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	db.collection1.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, data){
			res.json(data);
		});

	
});

app.listen(3000);
console.log("server is running on 3000");