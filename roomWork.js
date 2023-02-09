var roomMap = {};
roomMap = {
	0 : {
		1 : "rock",
	},
	3 : {
		10 : "rock",
	},
	6 : {
		2 : "rock",
	},
	8 : {
		5 : "rock",
	},
};
var testRoom = function(xF, yF) {
	if (roomMap[yF]) {
		if (roomMap[yF][xF]) {
			return true;
		} else {
			return false;
		};
	};
};
var roomDrow = function() {
	ctx.fillStyle = "Peru";
	ctx.strokeStyle = "Black";
	ctx.fillRect(0, 0, size * 16, size * 9);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(size * 16, 0);
	ctx.lineTo(size * 16, size * 9);
	ctx.lineTo(0, size * 9);
	ctx.lineTo(0, 0);
	ctx.stroke();
	ctx.fillStyle = "DarkGrey";
	for(var key in roomMap) {
		for (var keyX in roomMap[key]) {
			ctx.fillRect(keyX * size, key * size, size, size);
		};
	};
};
