function speak(kind) {
	var defaultSound = '';
	if (kind == 'dog') {
		alert('Woof!');
		console.log('Woof')
	} else if (kind == 'cat') {
		alert('Meow');
		console.log('Meow')
	} else {
		alert(defaultSound);
		console.log('No sound')
	}
}

var pet = prompt('Enter a type of pet : ');
speak(pet);