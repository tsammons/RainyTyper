var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var end, letters = [], bool = 0, position = 0;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.addEventListener("keydown", keyDownTextField, false);
    ctx.font="bold 18pt helvetica"; //courier new"; //bold Georgia";
    //ctx.fillStyle="brown";
}

function loop() {
    end = setInterval(function() {draw();}, 1.5);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < letters.length; i++) {
	ctx.fillText(letters[i][0], letters[i][1], letters[i][2]);
	//ctx.beginPath();
        //ctx.arc(letters[i][1],letters[i][2],10,0,2*Math.PI);
	//ctx.fill();
	letters[i][2] += letters[i][3];
	remv(i);
    }
}

function remv(i) {
    if (letters[i][2] > canvas.height || letters[i][2] < 0) {
	letters.splice(i, 1);
    }
}

function addletter(letter) {
    var xpos = canvas.width*Math.random(); //canvas.width/2; //canvas.width*Math.random(); // position
    var ypos = canvas.height/2;
    var speed = randn_bm()+.5; //Math.random()+.1; //randn_bm();
    var temp = [letter, xpos, ypos, speed]; 
    //if (Math.floor(Math.random()*10)%9 == 0) speed+=Math.random()*5;
    letters.push(temp);
}

function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
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
