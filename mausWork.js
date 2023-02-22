var blockMouse = {
	x : 0,
	y : 0,
};
canvas.addEventListener('click', function(event) {
	if (isMoving && mapFlag === false) {
		rotor(event.y - player.y, event.x - player.x);
		player.x = trail[trail.length - 1]["x"] * size + size / 2;
		player.y = trail[trail.length - 1]["y"] * size + size / 2;
		isMoving = false;
	} else if (isRotation) {
		rotor(event.y - player.y, event.x - player.x);
		isRotation = false;
	} else if (mapFlag) {
		console.log(true);
	}
	cursorCheng();
	screenWork();
});
canvas.addEventListener('mousemove', function(event) {
	if (isMoving && mapFlag === false) {
		screenWork();
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