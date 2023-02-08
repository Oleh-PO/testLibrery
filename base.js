var keyPress;
document.addEventListener('keydown', function(event) {
  keyPress = keyList[event.key];
  mapDrow();
  // screenWork();
});
var mapDrow = function() {
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
	player.moveBS(keyPress);
	player.drow();
};
screenWork();
mapDrow();