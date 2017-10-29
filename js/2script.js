var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var end, letters = [], bool = 0, position = 0;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.addEventListener("keydown", keyDownTextField, false);
    ctx.font="12pt courier new"; 
}

function loop() {
    end = setInterval(function() {draw();}, 1.5);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < letters.length; i++) {
	ctx.fillText(letters[i][0], letters[i][1], letters[i][2]);
	letters[i][2] += letters[i][3];
	remv(i);
    }
}

function remv(i) {
    if (letters[i][2] > canvas.height) {
	letters.splice(i, 1);
    }
}

function addletter(letter) {
    var pos = position;
    var speed = Math.random()+.2;
    var temp = [letter, pos, 25, speed]; 
    letters.push(temp);
}

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    var letter = String.fromCharCode(keyCode).toLowerCase();
    if (keyCode >= 48 && keyCode <= 90) {
	addletter(letter);	
	if (position < canvas.width) position += 25;
	else position = 0;
	if (bool == 0) {
	    loop();
	    bool = 1;
	}
    }
}
init();
