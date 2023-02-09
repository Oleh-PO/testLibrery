var blockMouse = {
	x : 0,
	y : 0,
};
canvas.addEventListener('click', function(event) {
	if (isMoving) {
		while(Math.floor(event.x / size) * size + size / 2 !== player.x || Math.floor(event.y / size) * size + size / 2 !== player.y) {
			if (Math.abs(player.x - event.x) > Math.abs(player.y - event.y)) {
				if (player.x - event.x > 0) {
					keyPress = "right";
				} else {
					keyPress = "left";
				};
			} else {
				if (player.y - event.y > 0) {
					keyPress = "top";
				} else {
					keyPress = "bottom";
				};
			};
			player.moveBS(keyPress);
			screenWork();
		};
	};
	isMoving = false;
});
canvas.addEventListener('mousemove', function(event) {
	if (isMoving) {
		blockMouse.x = Math.floor(event.x / size);
		blockMouse.y = Math.floor(event.y / size);
		screenWork();
		ctx.strokeStyle = "Red";
		ctx.beginPath();
		circle(blockMouse.x * size + size / 2, blockMouse.y * size + size / 2, size * 0.4);
		ctx.stroke();
	};
});