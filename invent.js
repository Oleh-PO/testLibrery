var inventory = {
	0 : 0,
	1 : 1,
	2 : false,
	pasive : [],
}
var updateHud = function() {
	for (var i = 0; i < 3; i++) {
		if (inventory[i] !== false) {
			switch (i) {
				case 0:
					first.textContent = weapon[inventory[0]].name[0];
					first.title = weapon[inventory[0]].name;
					first.disabled = false;
					break;
				case 1:
					second.textContent = weapon[inventory[1]].name[0];
					second.title = weapon[inventory[1]].name;
					second.disabled = false;
					break;
				case 2:
					third.textContent = weapon[inventory[2]].name[0];
					third.title = weapon[inventory[2]].name;
					third.disabled = false;
					break;
			}
		} else {
			switch (i) {
				case 0:
					first.disabled = true;
					break;
				case 1:
					second.disabled = true;
					break;
				case 2:
					third.disabled = true;
					break;
			}
		}
	}
	can.title = titlel;
}
var openInventory = function() {
	if (mapFlag) {
		ctx.beginPath();
		ctx.fillStyle = "Grey";
		ctx.fillRect(145 + size * mapSize.x - size * 0.26, 60, (size * 3) - size * 0.16, size * mapSize.y - size * 0.25);
		ctx.stroke();
		ctx.fillStyle = "Black";
		for (var i = 0; i < 3; i++) {
			ctx.beginPath();
			square(145 + size * mapSize.x - size * 0.26 + size * 1.5 + (size * 0.75) * (i - 1), 175 + size, size / 3.5);
			ctx.fill();
			if (inventory[i] !== false) {
				ctx.fillStyle = "White";
				ctx.fillText(weapon[inventory[i]].name[0], 145 + size * mapSize.x - size * 0.26 + size * 1.5 + (size * 0.75) * (i - 1) - 7, 175 + size + 7);
				ctx.fillStyle = "Black";
			}
		}
		for (var i = 0; i < stats.invSlots; i++) {
			ctx.beginPath();
			square(145 + size * mapSize.x + (size) * (i - Math.floor(i / 3) * 3) + (size * 0.24), 175 + (size * 0.75) * 3 + size * Math.floor(i / 3), size / 3);
			ctx.fill();
		}
	}
}
updateHud();