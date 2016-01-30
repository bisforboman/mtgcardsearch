var Card = require('./models/cards');
var HashMap = require('hashmap');

function getCard(cardId, res){
	Card.findOne({multiverseid: cardId},function(err, card) {
		if (err)
			res.send(err)
		res.send(card); // return all todos in JSON format
	});
};

function findCards(searchStr, options, res) {

	/* TODO:
		create hashmap for different search options.
		*/

	// searches for any name containing the sequence "searchStr".
	var query = new RegExp('^' +searchStr+ '$', "i");
	var contains = { 
		"$regex": searchStr, 
		"$options": "i"
	};

	var config_json = {};
	
	/* COLOR CONFIGURATION ---- */

	// shall we exclude the other colors?
	if(options.colorsForce === 'true') {
		config_json.colors = {
			'$in': options.colors,
			'$not': {
				'$in': options.noColors
			}
		};
	}
	else {
	// any combinations with the chosen will do
		config_json.colors = {
			"$in": options.colors,
		};
	}

	// json passed to the DB.

	switch(options.target) {
		case 'name':
			config_json.name = contains;
			break;
		case 'type':
			config_json.type = contains;
			break;
		case 'text':
			config_json.text = contains
			break;
		default: 
			config_json.name = contains
	};

	Card.find(config_json, function(err, cards) {
		if(err)
			res.send(err);

		var cardMap = new HashMap();

		for(var cardsindex in cards) {
			var c = cards[cardsindex]; 
			if(cardMap.has(c.name)) {
				var cardList = cardMap.get(c.name);
				cardList.push(c);
				cardMap.set(c.name,cardList);
			}
			else {
				var cardList = [];
				cardList.push(c);
				cardMap.set(c.name,cardList);
			}
		}
		console.log("Amount found: " + cardMap.count());
		reCards = [];
		var val=0,
			k = 0;

		cardMap.forEach(function(value,key) {
			val=0, k=0;
			for(var i=0; i<value.length; i++) {
				if(value[i].multiverseid && value[i].multiverseid > val) {
					val = value[i].multiverseid;
					k = i;
				}
			}
			reCards.push(value[k]);
			// show found card in console for testing
			//console.log(value[k]); 
		});
		res.send(reCards);
	});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/card/:cardId', function(req, res) {
		var cardId = req.params.cardId;
		getCard(cardId,res);
	});

	/* currently not working */
	app.get('/api/cards/:searchStr', function(req,res) {
		var searchStr = req.params.searchStr;
		findCards(searchStr, {target: 'name', colors: ['Blue'], noColors:['Red','White'], colorsForce: false},res);
	});

	app.post('/api/cards/', function(req,res) {
		var options = req.body.options;
		var searchStr = req.body.searchStr;
		findCards(searchStr,options,res);
	});

	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};