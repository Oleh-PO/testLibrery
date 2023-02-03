var gameObject = function(thisRadius, thisColor, thisFigure, thisFill) {
	this.x = (size / 2) * 5;
	this.y = (size / 2) * 5;
	this.raidus = thisRadius;
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
				this.y -= size;
				break;
			case "bottom" : 
				this.y += size;
				break;
			case "left" : 
				this.x += size;
				break;
			case "right" : 
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
			circle(this.x, this.y, this.raidus);
			break;
		case "square" :
			square(this.x, this.y, this.raidus);
			break;
		case "triangle" :
			triangle(this.x, this.y, this.raidus);
			break;
	};
	if (player.fill) {
		ctx.fill()
	} else (
		ctx.stroke()
	);
};