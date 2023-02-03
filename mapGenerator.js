var MapX;
var bigMap = {};
var rCoord = {
	x : 0,
	y : 0,
};
var generator;
var seed = Math.floor(Math.random() * 100000);
while (seed < 9999) {
	seed = Math.floor(Math.random() * 100000);
};
var getRandomBySeed = function(chance) {
	var prok = 0;
	for (var i = 0; i < 9; i++) {
		if (Math.tan(seed) > 0) {
			prok++;
		};
		if (prok >= chance) {
			return true;
		};
	};
	return false;
};
var posiblRoom = []; // {x : ?, y : ?};
var roomRandom = function(number) {
	for (var i = 0; i < posiblRoom.length; i++) {
		if (getRandomBySeed(5)) {
			bigMap[number.y][number.x] = "room";
			posiblRoom.shift();
		} else {
			posiblRoom.push(posiblRoom.shift());
		}
	};
};
var checkRoom = function(xDif, yDif) {
	if (bigMap[rCoord.y + yDif] !== undefined) {
		if (bigMap[rCoord.y + yDif][rCoord.x + xDif] === undefined) {
			posiblRoom.push({x : (rCoord.x + xDif), y : rCoord.y});
			console.log(true);
		};
	};
};
var gener = function (roomNumber) {
	console.log(posiblRoom);
	bigMap[0] = {
		0 : "room",
	};
	checkRoom(1, 0);
	if (posiblRoom.length > 0) {
		roomRandom(posiblRoom[0]);

	};
};
gener();
