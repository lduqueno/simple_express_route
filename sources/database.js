const { v4: uuidv4 } = require('uuid');
const mongo = require('mongodb').MongoClient;
const objects = require('./objects.js')

const VALID_KEYS_LIST = ['name', 'price', 'tags', 'releaseDate']


const _execute_mongo_request = (func) => {
	mongo.connect("mongodb://localhost:27017", (err, client) => {
		if (err)
			throw err
		func(client.collection("games"))
		client.close()
	})
}

const _is_request_well_formatted = (dic, keys) => {
	if (!dic)
		return false
	for (prop of keys) {
		let val = dic[prop]
		if (val === null || val === undefined)
			return false
	}
	return true
}


const fetch_game_by_name = (game_name, result_function) => {
	conds = {
		name: game_name
	}

	_execute_mongo_request((games_collection) => {
		games_collection.find(conds).toArray((err, res) => {
			game_array = []
			for (doc of res)
				game_array.push(new objects.Game(doc.id, doc.name, doc.price, doc.tags, doc.releaseDate).toString())
			result_function(game_array)
		})
	})
}

const get_game_by_ids = (games_ids, result_function) => {
	conds = {
		id: { $in: games_ids }
	}

	_execute_mongo_request((games_collection) => {
		games_collection.find(conds).toArray((err, res) => {
			game_array = []
			for (doc of res)
				game_array.push(new objects.Game(doc.id, doc.name, doc.price, doc.tags, doc.releaseDate).toString())
			result_function(game_array)
		})
	})
}

const delete_game_by_id = (game_id, result_function) => {
	conds = {
		id: game_id
	}

	_execute_mongo_request((games_collection) => {
		games_collection.deleteOne(conds, (err, res) => {
			result_function((err || res.result.n == 0) ? false : true)
		})
	})
}

const create_game = (data, result_function) => {
	if (!_is_request_well_formatted(data, VALID_KEYS_LIST)) {
		result_function(undefined)
		return
	}
	id = uuidv4()
	document = {
		...data,
		'id': id
	}

	_execute_mongo_request((games_collection) => {
		games_collection.insertOne(document, (err, _) => {
			if (err)
				id = undefined
			result_function(id)
		})
	})
}

const update_game = (game_id, data, result_function) => {
	_execute_mongo_request((games_collection) => {
		document = {}
		for (key in data)
			if (VALID_KEYS_LIST.includes(key))
				document[key] = data[key]

		conds = {id: game_id}
		values = {$set: document}

		games_collection.updateOne(conds, values, (err, res) => {
			result_function((err || res.result.n == 0) ? false : true)
		})
	})
}


module.exports = {fetch_game_by_name, get_game_by_ids, delete_game_by_id, create_game, update_game}