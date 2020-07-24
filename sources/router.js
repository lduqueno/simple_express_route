const database = require('./database.js')
const express = require('express')
const router = express()

const LISTENING_PORT = 3000


router.use(express.json());

router.get('/game', (req, res) => {
	database.fetch_game_by_name(req.query.name, (result) => {
		if (result.length == 0)
			res.status(404).send("No games found for this name.")
		else
			res.status(200).send(result)
	})
})


router.get('/game/:ids', (req, res) => {
	ids = req.params.ids.split(",")
	database.get_game_by_ids(ids, (result) => {
		if (result.length == 0)
			res.status(404).send("No games found for these IDs.")
		else
			res.status(200).send(result)
	})
})


router.delete('/game/:id', (req, res) => {
	database.delete_game_by_id(req.params.id, (success) => {
		res.status(success ? 200 : 400).send("Success: " + success)
	})
})


router.patch('/game/:id', (req, res) => {
	success = database.update_game(req.params.id, req.body, (success) => {
		res.status(success ? 200 : 400).send("Success: " + success)
	})
})


router.post('/game', (req, res) => {
	database.create_game(req.body, (result_id) => {
		res.status(result_id != undefined ? 200 : 400).send("Created game " + result_id)
	})
})


router.listen(LISTENING_PORT, () => {
	console.log('Router is now listening on port', LISTENING_PORT)
})
