let coordX = '1231px';

$('.ball').on('click', function () {
	function getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let getCoordY = getRandomInRange(0,602);
	let coordY = getCoordY + 'px';
	$(this).css('transform',`translate(${coordX},${coordY})`);
	switch (coordX) {
		case '1231px':
			coordX = '0px';
			break
		case '0px':
			coordX = '1231px';
			break
	}
	function goalAlert() {
		if ((getCoordY < 345) && (getCoordY > 265)) {
			alert('ГОЛ!');

		}
	}
	setTimeout(goalAlert, 1000);
});