/*
	Thorough attention to detail is important. Including a comment in your finished product that contains 
	this paragraph will signal that you pay close attention to detail, which will reflect favorably on your 
	application. While it is to be expected that a webpage will have some degree of variation from the 
	original comps, we aim for as close to pixel perfect as we can get—size, color, gradients, positioning, the 
	works.
*/
var fps = 300;
var fpms = 1000/fps;
var loopTimer;
var canvas, ballContext, featherContext;
var width = 300, height = 320;
var startingHeight = 50;
var textColor = '#000000';


var ball = {
	position: {
		x: width * (1/4),
		y:startingHeight
	},
	velocity: {
		x:0,
		y:0
	},
	mass: 1, //kg
	radius: 15,
	restitution: -0.5,
	color: '#000000',
	label: 'Bowling Ball'
};

var feather = {
	position: {
		x: width * (3/4),
		y: startingHeight
	},
	velocity: {
		x:0,
		y:0
	},
	mass: 0.001, //kg
	radius: 15,
	image: new Image(),
	restitution: 0,
	label: 'Feather'
};

var Cd = 0.47;
var rho = 1.22;
var A = Math.PI * ball.radius * ball.radius / (10000);
var ag = 9.81;

jQuery(document).ready(function() {
	setup();
	$('#rho').on('change', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var newRho = $(this).val();

		if(parseFloat(newRho) == newRho) {
			rho = newRho;

			ball.position.y = startingHeight;

			feather.position.y = startingHeight;

			ball.velocity.x = 0;
			ball.velocity.y = 0;

			feather.velocity.x = 0;
			feather.velocity.y = 0;

			switch(newRho) {
				case "1.22":
					canvas.style.background = '#FFFFFF';
					textColor = '#000000';
					ball.color = '#000000';
					ball.label = 'Bowling Ball';
					break;
				case "100":
					canvas.style.background = '#329A7F';
					textColor = "#FFFFFF";
					ball.color = '#000000';
					ball.label = 'Bowling Ball';
					break;
				case "0":
					canvas.style.background = '#000000';
					textColor = '#FFFFFF';
					ball.color = "#09C570";
					ball.label = 'Glowing Ball';
					break;
			}
		}
	});
});

function setup() {
	canvas = document.getElementById('canvas');
	canvas.style.background = '#FFFFFF';

	ballContext = canvas.getContext('2d');
	featherContext = canvas.getContext('2d');
	textContext = canvas.getContext('2d');

	feather.image.src = 'img/feather.png';

	looptimer = setInterval(loop, fpms);
}

function loop() {
		var ballFx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
		var ballFy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

		var featherFx = -0.5 * Cd * A * rho * feather.velocity.x * feather.velocity.x * feather.velocity.x / Math.abs(feather.velocity.x);
		var featherFy = -0.5 * Cd * A * rho * feather.velocity.y * feather.velocity.y * feather.velocity.y / Math.abs(feather.velocity.y);

		ballFx = isNaN(ballFx) ? 0 : ballFx;
		ballFy = isNaN(ballFy) ? 0 : ballFy;

		featherFx = isNaN(featherFx) ? 0 : featherFx;
		featherFy = isNaN(featherFy) ? 0 : featherFy;

		//Acceleration
		var ballAx = ballFx / ball.mass;
		var ballAy = ag + (ballFy / ball.mass);

		var featherAx = featherFx / feather.mass;
		var featherAy = ag + (featherFy / feather.mass);

		//Velocity
		ball.velocity.x += ballAx * (1/fps);
		ball.velocity.y += ballAy * (1/fps);

		feather.velocity.x += featherAx * (1/fps);
		feather.velocity.y += featherAy * (1/fps);

		//Position
		ball.position.x += ball.velocity.x * (1/fps) * 100;
		ball.position.y += ball.velocity.y * (1/fps) * 100;

		feather.position.x += feather.velocity.x * (1/fps) * 100;
		feather.position.y += feather.velocity.y * (1/fps) * 100;		

		if(ball.position.y > (height - ball.radius)) {
			ball.velocity.y *= ball.restitution;
			ball.position.y = height - ball.radius;

			if(feather.position.y > (height - feather.radius)) {
				ball.velocity.y = 0;
				ball.position.y = startingHeight;

				feather.velocity.y = 0;
				feather.position.y = startingHeight;
			}
		}

		if(ball.position.x > (width - ball.radius)) {
			ball.velocity.x *= ball.restitution;
			ball.position.x = width - ball.radius;
		}

		if(ball.position.x < ball.radius) {
			ball.velocity.x *= ball.restitution;
			ball.position.x = ball.radius;
		}

		if(feather.position.y > (height - feather.image.height/2)) {
			feather.velocity.y *= feather.restitution;
			feather.position.y = height - feather.radius;

			if(ball.position.y > (height - ball.radius)) {
				ball.velocity.y = 0;
				ball.position.y = startingHeight;

				feather.velocity.y = 0;
				feather.position.y = startingHeight;
			}
		}

		if(feather.position.x > (width - feather.radius)) {
			feather.velocity.x *= feather.restitution;
			feather.position.x = width - feather.radius;
		}

		if(feather.position.x < feather.radius) {
			feather.velocity.x *= feather.restitution;
			feather.position.x = feather.radius;
		}

		ballContext.clearRect(0,0,width, height);
		featherContext.clearRect(0,0, width, height);

		ballContext.save();

		ballContext.translate(ball.position.x, ball.position.y);
		ballContext.fillStyle = ball.color;
		ballContext.beginPath();
		ballContext.arc(0,0,ball.radius, 0, Math.PI * 2, true);
		ballContext.fill();
		ballContext.closePath();

		ballContext.restore();

		featherContext.save();

		//Subtract ball radius from feather y position to compensate for canvas drawing images from top right and arcs from center
		featherContext.drawImage(feather.image, feather.position.x, feather.position.y - ball.radius, ball.radius * 2, ball.radius * 2);

		featherContext.restore();

		var font = 'lighter 20px sans-serif';

		var featherTextWidth = textContext.measureText(feather.label).width;
		var ballTextWidth = textContext.measureText(ball.label).width;

		textContext.fillStyle = textColor;
		textContext.font = font;
		textContext.fillText(ball.label, width * (1/4) - (ballTextWidth / 2), 50);
		textContext.fillText(feather.label, width * (3/4) - (featherTextWidth / 2), 50);
}