var keyPress;
var mapFlag = false;
var isMoving = false;
var isRotation = false;
var weaponSelect = false;
var trail = [];
var stats = {
	hp : 10,
	energyMax : 5,
	energyLeft : 5,
	room : {
		x : 4,
		y : 4,
	},
	invSlots : 9,
}
var moveSwitch = document.getElementById("moveSwitch");
var energySwitch = document.getElementById("energySwitch");
var hpSwitch = document.getElementById("hpSwitch");
var output = document.getElementById("number");
document.addEventListener('keydown', function(event) {
	titlel = "test";
	console.log(true)
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
var vectorHelp = function(xF, yF) {
	if (player.vector === rotor(xF, yF)) {
		return 0;
	}
	return 1;
}
var faindTrail = function(xF, yF) {
	trail = [];
	ctx.strokeStyle = player.color;
	ctx.moveTo(player.x, player.y);
	var coord = {
		x : (player.x - size / 2) / size,
		y : (player.y - size / 2) / size,
	}
	for (var i = 0; i < (stats.energyLeft - vectorHelp(yF*size - player.y, xF*size - player.x)) * 5; i++) {
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
var end = function() {
	stats.energyLeft = stats.energyMax;
	number.textContent = stats.energyLeft;
}

var settings = function(switchType) {
	debugger
	switch (switchType) {
		case 'move':
			moveSwitch.value = Math.abs(moveSwitch.value - 1);
			break;
		case 'energy':
			energySwitch.value = Math.abs(energySwitch.value - 1);
			break;
		case 'hp':
			hpSwitch.value = Math.abs(hpSwitch.value - 1);
			break;
	}
	screenWork();
}
var testSettings = function() {
	if (moveSwitch.value === "1") {
		isMoving = true;
		cursorCheng();
	}
	if (energySwitch.value === "1") {
		stats.energyLeft = stats.energyMax;
		updateHud();
	}
}
var buttonPush = function(number) {
	if (weaponSelect === false || weaponSelect !== inventory[number]) {
		isMoving = false;
		isRotation = false;
		mapFlag = false;
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
		cell();
	}
}
var cell = function() {
	ctx.strokeStyle = "Black";
	ctx.lineWidth = size / 20;
	for (var i = 0; i < 16; i++) {
		ctx.beginPath()
		ctx.moveTo(i * size, 0);
		ctx.lineTo(i * size, screenSive.height);
		ctx.stroke();
	}
	for (var i = 0; i < 10; i++) {
		ctx.beginPath()
		ctx.moveTo(0, i * size);
		ctx.lineTo(screenSive.width, i * size);
		ctx.stroke();
	}
	ctx.lineWidth = size / 10;
}
var moveFlag = function(what) {
	switch (what) {
		case 'mave':
			mapFlag = false;
			isMoving = !isMoving
			isRotation = false;
			weaponSelect = false;
			break;
		case 'map':
			weaponSelect = false;
			isMoving = false;
			isRotation = false;
			mapFlag = !mapFlag; 
			break;
		case 'rot':
			mapFlag = false;
			isRotation = !isRotation;
			weaponSelect = false;
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
					if (stats.room.x === o && stats.room.y === i) {
						ctx.fillStyle = player.color;
						ctx.beginPath();
						circle(145 + size * o + (size * 0.75) / 2, 60 + size * i + (size * 0.75) / 2, size / 4);
						ctx.fill();
						ctx.fillStyle = "Black";
					}
				};
			};
		};
	};
};
var screenWork = function() {
	ctx.clearRect(0, 0, screenSive.width, screenSive.height);
	testSettings();
	roomDrow();
	showTarget();
	player.drow();
	player.rotation();
	mapDrow();
	openInventory();
	updateHud();
};

document.addEventListener('DOMContentLoaded', screenWork);