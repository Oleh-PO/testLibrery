var gameObject = function(thisRadius, thisColor, thisFigure, thisFill) {
	this.x = (size / 2) + size * 5;
	this.y = (size / 2) + size * 5;
	this.radius = thisRadius;
	this.speed = 0;
	this.vector = 0;
	this.color = thisColor;
	this.figure = thisFigure; //possible: raund, square, triangle
	this.fill = thisFill;
};
var circle =  function(xF, yF, radiusF) {
	ctx.arc(xF, yF, radiusF, 0, Math.PI * 2);
};
var square = function(xF, yF, radiusF) {
	ctx.moveTo(xF - radiusF, yF - radiusF);
	ctx.lineTo(xF - radiusF, yF + radiusF);
	ctx.lineTo(xF + radiusF, yF + radiusF);
	ctx.lineTo(xF + radiusF, yF - radiusF);
	ctx.lineTo(xF - radiusF, yF - radiusF);
	ctx.lineTo(xF - radiusF, yF + radiusF);
};
var triangle = function(xF, yF, radiusF) {
	ctx.moveTo(xF, yF - radiusF);
	ctx.lineTo(xF - radiusF, yF + radiusF);
	ctx.lineTo(xF + radiusF, yF + radiusF);
	ctx.lineTo(xF, yF - radiusF);
};
var player = new gameObject(size / 2, "red", "raund", true);
gameObject.prototype.moveBS = function(direction) {
	if (direction) {
		switch(direction) {
			case "top" : 
				this.vector = 0;
				this.y -= size;
				break;
			case "bottom" : 
				this.vector = 180;
				this.y += size;
				break;
			case "left" : 
				this.vector = 90;
				this.x += size;
				break;
			case "right" : 
				this.vector = 270;
				this.x -= size;
				break;
		};
	};
};
gameObject.prototype.drow = function() {
	ctx.strokeStyle = this.color;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	switch(this.figure) {
		case "raund" : 
			circle(this.x, this.y, this.radius);
			break;
		case "square" :
			square(this.x, this.y, this.radius);
			break;
		case "triangle" :
			triangle(this.x, this.y, this.radius);
			break;
	};
	if (player.fill) {
		ctx.fill()
	} else (
		ctx.stroke()
	);
};
var rotor = function(yF, xF) {
	if (Math.abs(xF) > Math.abs(yF)) {
		if (xF > 0) {
			player.vector = 90;
		} else {
			player.vector = 270;
		}
	} else {
		if (yF > 0) {
			player.vector = 180;
		} else {
			player.vector = 0;
		}
	}
}
gameObject.prototype.rotation = function() {
	ctx.strokeStyle = "Black";
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	switch(this.vector) {
		case 0 : 
			ctx.lineTo(this.x, this.y - this.radius);
			break;
		case 90 : 
			ctx.lineTo(this.x + this.radius, this.y);
			break;
		case 180 : 
			ctx.lineTo(this.x, this.y + this.radius);
			break;
		case 270 : 
			ctx.lineTo(this.x - this.radius, this.y);
			break;
	};
	ctx.stroke();
};