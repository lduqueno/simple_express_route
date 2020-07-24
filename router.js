const database = require('./database.js')
const express = require('express')
const router = express()

const LISTENING_PORT = 3000


router.get('/game', (req, res) => {
	names = req.query.names
	games = database.fetch_games_by_names(names)
	if (games.length == 0)
		res.status(404).send("No games found for these names.")
	else
		res.status(200).send(games)

	console.log("Games found by names:", games)
})


router.get('/game/:ids', (req, res) => {
	ids = req.params.ids.split("+")
	games = database.get_game_by_ids(ids)
	if (games.length == 0)
		res.status(404).send("No games found for these IDs.")
	else
		res.status(200).send(games)

	console.log("Games found by IDs:", games)
})


router.delete('/game/:id', (req, res) => {
	success = database.delete_game(req.params.id)
	res.status(success ? 200 : 400).send()
})


router.patch('/game/:id', (req, res) => {
	success = database.update_game(req.body)
	res.status(success ? 200 : 400).send()
})


router.post('/game', (req, res) => {
	// for (key in req.body) {
	// 	if (req.body[key] === undefined || req.body[key] === null)
	// 		res.status(500).send("Bad JSON values.")
	// 		return
	// }

	id = database.create_game(req.body)
	res.status(id != undefined ? 200 : 400).send(id)
})



// router.get('/publisher', (req, res) => {
// 	//res.status(500).send('Bad request.')
// })


router.use(express.json());

router.listen(LISTENING_PORT, () => {
	console.log('Router is now listening on port', LISTENING_PORT)
})
