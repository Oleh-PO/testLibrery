var blockMouse = {
	x : 0,
	y : 0,
};
canvas.addEventListener('click', function(event) {
	if (isMoving) {
		rotor(event.y - player.y, event.x - player.x);
		player.x = Math.floor(event.x / size) * size + size / 2;
		player.y = Math.floor(event.y / size) * size + size / 2;
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