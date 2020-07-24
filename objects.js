class Game {

	constructor(id, title, price, publisher, tags, releaseDate) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.publisher = publisher;
		this.tags = tags;
		this.releaseDate = releaseDate;
	}

	toString() {
		return `Le jeu ${this.title}, édité par ${this.publisher.name}, est sorti le ${this.releaseDate} 
			au prix de ${this.price}.\nID : ${this.id}\nTags : ${this.tags}}`;
	}

}

class Publisher {

	constructor(id, name, siret, phone) {
		this.id = id;
		this.name = name;
		this.siret = siret;
		this.phone = phone;
	}

}

module.exports = {Game, Publisher}