var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res){

	console.log('GET REQUEST');

	db.contactlist.find(function (err, docs){
		res.json(docs);
	})

});

app.post('/contactlist', function (req, res){
	console.log('POST REQUEST');
	console.log(req.body);

	db.contactlist.insert(req.body, function (err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function (req, res){
	var id = req.params.id;

	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});

})

app.get('/contactlist/:id', function (req, res){

	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res){
	console.log('PUT REQUEST');

	var id = req.params.id;

	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {
			$set:{
				name: req.body.name,
				email: req.body.email,
				number: req.body.number
			}},
			new: true
		}, function (err, doc){
				res.json(doc);
			}
	);
})



app.listen(3030);

console.log("server running on port 3030");