var randonLoc =Math.floor(Math.random()*5)
var location1 = randonLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var guesses = 0;
var hits = 0;
var isSunk = false;

while (isSunk == false) {
	guess = prompt('Ready, aim, fire! enter a number from 0 - 6 : ');
	if (guess < 0 || guess > 6) {
		alert('Please enter a valid cell number!');
	} else {
		guesses = guesses + 1;

		if (guess == location1 || guess == location2 || guess == location3) {
			alert('HIT!');
			hits = hits + 1;
			if (hits == 3) {
				isSunk = true;
				alert('You sunk my ship!');
			}
		} else {
			alert('MISS!');
		}
	}
}

var stats = 'You took ' + guesses + ' guesses to sink the battleship, ' +
				'which means you shooting accurecy was ' + (3/guesses);
alert(stats);