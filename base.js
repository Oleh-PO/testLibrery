var keyPress;
var mapFlag = false;
var isMoving = false;
var isRotation = false;
var stats = {
	energyMax : 5,
	energyLeft : 0,
	room : {
		x : 4,
		y : 4,
	},
	invSlots : 10,
}
document.addEventListener('keydown', function(event) {
	player.moveBS(keyPress);
	screenWork();
});
var moveFlag = function(what) {
	switch (what) {
		case 'mave':
			isMoving = !isMoving
			isRotation = false;
			break;
		case 'map':
			mapFlag = !mapFlag; 
			break;
		case 'rot':
			isRotation = !isRotation; 
			isMoving = false;
			break;
	}
	cursorCheng();
	screenWork();
};
var cursorCheng = function() {
	if (isMoving || isRotation || mapFlag) {
		can.className = 'pointer';
	} else {
		can.className = 'def';
	}
}
var mapDrow = function() {
	if (keyPress === "map") {
		mapFlag = !mapFlag;
	}
	if (mapFlag === false) {
		return;
	}
	ctx.fillStyle = "Grey";
	ctx.fillRect(145, 60, (size * mapSize.x) - size * 0.25, (size * mapSize.y) - size * 0.25);
	ctx.fillStyle = "Black";
	for (var i = 0; i < mapSize.y; i++) {
		for (var o = 0; o < mapSize.x; o++) {
			if (bigMap[i]) {
				if (bigMap[i][o]) {
					ctx.fillRect(145 + size * o, 60 + size * i, (size * 0.75), (size * 0.75));
					ctx.fillRect(145 + size * o + size / 2, 60 + size * i + size / 3, size / 2, size / 10);
					ctx.fillRect(145 + size * o + size / 2.3, 60 + size * i, -(size / 10), size);
				};
			};
		};
	};
};
var screenWork = function() {
	ctx.clearRect(0, 0, screenSive.width, screenSive.height);
	roomDrow();
	player.drow();
	player.rotation();
	mapDrow();
};

document.addEventListener('DOMContentLoaded', screenWork);