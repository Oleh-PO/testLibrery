var blockMouse = {
	x : 0,
	y : 0,
};
canvas.addEventListener('click', function(event) {
	if (isMoving && mapFlag === false) {
		if (Math.floor(event.x / size) !== Math.floor(player.x / size) || Math.floor(event.y / size) !== Math.floor(player.y / size)) {
			if (stats.energyLeft > 0) {
				player.vector =  rotor(event.y - player.y, event.x - player.x, true);
				player.x = trail[trail.length - 1]["x"] * size + size / 2;
				player.y = trail[trail.length - 1]["y"] * size + size / 2;
				stats.energyLeft -= (trail.length / 5);
				stats.energyLeft = Math.ceil(stats.energyLeft * 10) / 10;
				isMoving = false;
			}
		}
	} else if (isRotation) {
		if (stats.energyLeft >= 1) {
			player.vector =  rotor(event.y - player.y, event.x - player.x, true);
		}
		isRotation = false;
	} else if (mapFlag) {
		if (event.x > 145 && event.y > 60 && event.x < (mapSize.x + 1) * size && event.y < (mapSize.y + 1) * size) {
			if (bigMap[Math.floor((event.y - 60) / size)]) {
				if (bigMap[Math.floor((event.y - 60) / size)][Math.floor((event.x - 145) / size)]) {
					stats.room = {
						x : Math.floor((event.x - 145) / size),
						y : Math.floor((event.y - 60) / size),
					}
				}
			}
		}
	}
	stats.energyLeft = Math.ceil(stats.energyLeft * 10) / 10;
	number.textContent = Math.floor(stats.energyLeft);
	cursorCheng();
	screenWork();
});
canvas.addEventListener('mousemove', function(event) {
	if (isMoving && mapFlag === false) {
		screenWork();
		cell();
		ctx.beginPath();
		faindTrail(Math.floor(event.x / size), Math.floor(event.y / size));
		ctx.stroke();
		if (trail[trail.length - 1]) {
			blockMouse.x = trail[trail.length - 1]["x"];
			blockMouse.y = trail[trail.length - 1]["y"];
		} else {
			blockMouse.x = player.x;
			blockMouse.y = player.y;
		}
		ctx.strokeStyle = "Red";
		ctx.beginPath();
		circle(blockMouse.x * size + size / 2, blockMouse.y * size + size / 2, size * 0.4);
		ctx.stroke();
	};
});