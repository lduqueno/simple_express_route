class Game {

	constructor(id, title, price, tags, releaseDate) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.tags = tags;
		this.releaseDate = releaseDate;
	}

	toString() {
		return `Le jeu ${this.title} est sorti le ${this.releaseDate} 
			au prix de ${this.price}. Tags : ${this.tags}, ID : ${this.id}`;
	}

}


module.exports = {Game}