var bigMap = {};
var possible = [];
var rCoord = {
	x : 0,
	y : 0,
};
var seed = Math.floor(Math.random() * 1000000);
while (seed < 99999) {
	seed = Math.floor(Math.random() * 1000000);
};
// seed = 721557;

console.log(seed);
var getRandomBySeed = function(chance, mod) { // по стандарту шанс 50%
	var prok = 0;
	if (((Math.sin(seed * mod) + Math.sin(seed) / 2) + (chance / 10)) > 0) {
		return true;
	};
	return false
	};
var scan = function(YF, XF) { // функція яка перевіряє наявність кімнати
	if (bigMap[YF]) {
		if (bigMap[YF][XF] === undefined) {
			possible.push({YF, XF}); //{y : ?, x : ?}
		};
	} else {
		possible.push({YF, XF});
	};
};
var possibleTry = function() {
	for (var i = 0; i < possible.length; i++) {
		if (getRandomBySeed(10 / possible.length, Math.tan(i * Math.sin(seed - 3 * i)))) {
			var select = possible[i];
			var simplify = bigMap[select["YF"]];
			if (bigMap[select["YF"]]) {
				simplify[select["XF"]] = "room";
			} else {
				bigMap[select["YF"]] = {};
				bigMap[select["YF"]][select["XF"]] = "room";
			};
		};
		possible.shift();
	};
};
var detect = function(operator) {
	for (var i = 0; i < mapSize.y; i++) {
		if (bigMap[i]) {
			for (var o = 0; o < mapSize.x; o++) {
				if (bigMap[i][o]) {
					scan(i, o + 1);
					scan(i + 1, o);
					scan(i, o - 1);
					scan(i - 1, o);
				};
			};
		};
	};
};
var setMap = function (number) {
	bigMap = {
		[Math.floor(mapSize.y / 2)] : {
			[Math.floor(mapSize.y / 2)] : "room",
		},
	};
	for (var i = 0; i < 5; i++) {
		detect();
		possibleTry()
	};
};
setMap(10);