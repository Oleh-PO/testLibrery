var keyPress;
var mapFlag = false;
var isMoving = false;
var isRotation = false;
var weaponSelect = false;
var trail = [];
var stats = {
	energyMax : 5,
	energyLeft : 0,
	room : {
		x : 4,
		y : 4,
	},
	invSlots : 9,
}
var output = document.getElementById("number");
document.addEventListener('keydown', function(event) {
	player.moveBS(keyPress);
	screenWork();
});
var trailSupport = function(xF, yF, mod) {
	if (mod) {
		if (testRoom(xF, yF)) {
			return ["x", xF];
		} else if (testRoom(xF - 1 , yF + 1)) {
			return ["y", yF + 1];
		} else if (testRoom(xF - 1 , yF - 1)) {
			return ["y", yF - 1];
		} else {
			return ["x", xF - 1];
		}
	} else {
		if (testRoom(xF, yF)) {
			return ["y", yF];
		} else if (testRoom(yF - 1 , xF + 1)) {
			return ["x", xF + 1];
		} else if (testRoom(yF - 1 , xF - 1)) {
			return ["x", xF - 1];
		} else {
			return ["y", yF - 1];
		}
	}
}
var faindTrail = function(xF, yF) {
	trail = [];
	ctx.strokeStyle = player.color;
	ctx.moveTo(player.x, player.y);
	var coord = {
		x : (player.x - size / 2) / size,
		y : (player.y - size / 2) / size,
	}
	for (var i = 0; i < stats.energyMax * 2; i++) {
		if (coord.x !== xF || coord.y !== yF) {
			if (Math.abs(coord.x - xF) > Math.abs(coord.y - yF)) {
				if (coord.x - xF > 0) {
					if (trailSupport(coord.x - 1, coord.y, true)[0] === "x") {
						coord.x = trailSupport(coord.x - 1, coord.y, true)[1];
					} else if (trailSupport(coord.x - 1, coord.y, true)[0] === "y") {
						coord.y = trailSupport(coord.x - 1, coord.y, true)[1];
					}
				} else {
					if (trailSupport(coord.x + 1, coord.y, true)[0] === "x") {
						coord.x = trailSupport(coord.x + 1, coord.y, true)[1];
					} else if (trailSupport(coord.x + 1, coord.y, true)[0] === "y") {
						coord.y = trailSupport(coord.x + 1, coord.y, true)[1];
					}
				}
			} else {
				if (coord.y - yF > 0) {
					if (trailSupport(coord.x, coord.y - 1, false)[0] === "x") {
						coord.x = trailSupport(coord.x, coord.y - 1, false)[1];
					} else if (trailSupport(coord.x, coord.y - 1, false)[0] === "y") {
						coord.y = trailSupport(coord.x, coord.y - 1, false)[1];
					}
				} else {
					if (trailSupport(coord.x, coord.y + 1, false)[0] === "x") {
						coord.x = trailSupport(coord.x, coord.y + 1, false)[1];
					} else if (trailSupport(coord.x, coord.y + 1, false)[0] === "y") {
						coord.y = trailSupport(coord.x, coord.y + 1, false)[1];
					}
				}
			}
			trail.push({x : coord.x, y : coord.y});
			ctx.lineTo(coord.x * size + size / 2, coord.y * size + size / 2);
		} else {
			return;
		}
	}
}
var buttonPush = function(number) {
	if (weaponSelect === false || weaponSelect !== number) {
		weaponSelect = inventory[number];
	} else {
		weaponSelect = false;
	}
	screenWork();
}
var combat = function() {

}
var showTarget = function() {
	if (weaponSelect !== false) {
		for (var i = 0; i < weapon[weaponSelect].map.right['length']; i++) {
  		ctx.beginPath();
			ctx.fillStyle = "#b13c3c";
			square(Math.floor(player.x / size  + weapon[weaponSelect].map.right[i].x) * size + size / 2, Math.floor(player.y / size + weapon[weaponSelect].map.right[i].y) * size + size / 2, size / 2);
			ctx.fill();
		}
		for (var i = 0; i < weapon[weaponSelect].map.top['length']; i++) {
    	ctx.beginPath();
			ctx.fillStyle = "#b13c3c";
			square(Math.floor(player.x / size  + weapon[weaponSelect].map.top[i].x) * size + size / 2, Math.floor(player.y / size + weapon[weaponSelect].map.top[i].y) * size + size / 2, size / 2);
			ctx.fill();
		}
		for (var i = 0; i < weapon[weaponSelect].map.bottom['length']; i++) {
  		ctx.beginPath();
			ctx.fillStyle = "#b13c3c";
			square(Math.floor(player.x / size  + weapon[weaponSelect].map.bottom[i].x) * size + size / 2, Math.floor(player.y / size + weapon[weaponSelect].map.bottom[i].y) * size + size / 2, size / 2);
			ctx.fill();
		}
		for (var i = 0; i < weapon[weaponSelect].map.left['length']; i++) {
    	ctx.beginPath();
			ctx.fillStyle = "#b13c3c";
			square(Math.floor(player.x / size  + weapon[weaponSelect].map.left[i].x) * size + size / 2, Math.floor(player.y / size + weapon[weaponSelect].map.left[i].y) * size + size / 2, size / 2);
			ctx.fill();
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
	showTarget()
	player.drow();
	player.rotation();
	mapDrow();
	openInventory();
};

document.addEventListener('DOMContentLoaded', screenWork);