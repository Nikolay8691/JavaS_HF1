var view = {
	displayMessage : function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");

// view.displayMessage("Tap tap! Is this thing on?");

var model = {
	boardSize : 7,
	numShips : 3,
	shipsSunk : 0,
	shipLength : 3,

	// ships : [{ locations : ["06", "16", "26"], hits : ["", "", ""]},
	// 		 { locations : ["24", "34", "44"], hits : ["", "", ""]},
	// 		 { locations : ["10", "11", "12"], hits : ["", "", ""]}],
	ships : [{ locations : [0, 0, 0], hits : ["", "", ""]},
			 { locations : [0, 0, 0], hits : ["", "", ""]},
			 { locations : [0, 0, 0], hits : ["", "", ""]}],

	generateShipLocations : function() {
		var locations;
		for (i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
			console.log("ship : ", locations)
		}
	},

	generateShip : function() {
		var direction = Math.floor(Math.random() * 2);
		var row, column;

		if (direction == 1) {
			row = Math.floor(Math.random() * this.boardSize);
			column = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			column = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for (var i = 0; i < this.shipLength; i++) {
			if (direction == 1) {
				newShipLocations.push(row + "" + (column + i));
			} else {
				newShipLocations.push((row + i) + "" + column);
			}
		}

		return newShipLocations;
	},

	collision : function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			// var ship = model.ships[i];
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
			
		}
		return false;
	},

	fire : function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var locations = ship.locations;
			var index = locations.indexOf(guess);
			if (index >= 0) {
				view.displayHit(guess);
				view.displayMessage("HIT!");
				ship.hits[index] = "hit";

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = this.shipLength - 1; i >= 0; i--) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	}
};

// model.fire("10");
// model.fire("11");
// model.fire("12");

// model.fire("56");

var controller = {
	guesses : 0,

	processGuess : function(guess) {
		var location = parseGuess(guess);
		// console.log("location New : ", location);

		if (location) {
			this.guesses++;
			console.log("guesses : ", this.guesses);

			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		// console.log("row : ", row);
		// console.log("column : ", column);

		if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board");
		} else {
			console.log(" row + column : ", row + column);
			return row + column;
		}
	}
	return null;
}

// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));
// console.log(parseGuess("B3"));

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;

	controller.processGuess(guess);
	// console.log(parseGuess(guess));

	guessInput.value = "";

}

function handleKeyPress(ebutton) {
	var fireButton = document.getElementById(("fireButton"));
	if (ebutton.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

window.onload = init;