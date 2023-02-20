var keyPress;
var mapFlag = false;
var isMoving = false;
var isRotation = false;
var trail = [];
var stats = {
	energyMax : 5,
	energyLeft : 0,
	room : {
		x : 4,
		y : 4,
	},
	invSlots : 10,
}
var output = document.getElementById("number");
document.addEventListener('keydown', function(event) {
	player.moveBS(keyPress);
	screenWork();
});
var trailSupport = function(xF, yF) {
	if (testRoom(xF, yF)) {
		return ["x", xF];
	} else if (testRoom(xF - 1 , yF + 1)) {
		return ["y", yF + 1];
	} else if (testRoom(xF - 1 , yF - 1)) {
		return ["y", yF - 1];
	} else {
		return [false];
	}
}
var faindTrail = function(xF, yF) {
	trail = [];
	ctx.strokeStyle = "Black";
	ctx.moveTo(player.x, player.y);
	var coord = {
		x : (player.x - size / 2) / size,
		y : (player.y - size / 2) / size,
	}
	for (var i = 0; i < stats.energyMax * 2; i++) {
		if (coord.x !== xF || coord.y !== yF) {
			if (Math.abs(coord.x - xF) > Math.abs(coord.y - yF)) {
				if (coord.x - xF > 0) {
					coord.x--;
				} else {
					if (trailSupport(coord.x + 1, coord.y)[0] === "x") {
						coord.x = trailSupport(coord.x + 1, coord.y)[1];
					} else if (trailSupport(coord.x + 1, coord.y)[0] === "y") {
						coord.y = trailSupport(coord.x + 1, coord.y)[1];
					}
				}
			} else {
				if (coord.y - yF > 0) {
					coord.y--;
				} else {
					coord.y++;
				}
			}
			// if (testRoom(coord.x, coord.y)) {
				trail.push({x : coord.x, y : coord.y});
				ctx.lineTo(coord.x * size + size / 2, coord.y * size + size / 2);
			// }
		}
	}
}

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