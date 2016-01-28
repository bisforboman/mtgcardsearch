var Todo = require('./models/todo');
var Card = require('./models/cards');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/card', function(req, res) {

		var card = req.body.card;
		if (
			card.name && 
			card.colors && // check reference
			card.colorIdentity && // check reference
			card.multiverseid &&
			card.artist && 
			card.cmc &&
			card.flavor && 
			card.rarity && // check reference
			card.power &&
			card.toughness &&
			card.type && // check reference
			card.subtypes &&
			card.types &&
			card.text &&
			card.manaCost
			) {
			Card.create(card, 
				function(err, todo) {
					if (err)
						res.send(err, false);
					else
						res.send(null, true)
					// get and return all the todos after you create another
					getTodos(res);
				});

		}
		else {
			console.log(card);
			res.send('Error with card.');
		}

		// create a todo, information comes from AJAX request from Angular
	
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};