//planeten informatie (info van solarsystem.nasa.gov)

var planets = {
	mercury: {
		el: document.querySelector(".mercury"),
		orbitalPeriod: 0.2408467 * 31536000000,
		rotation: 0,
		startRotation: 90,
		radius: 60,
		info: {
			name: 'mercury',
			icon: '&#9791;',
			description: "Mercury—the smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
			distanceFromSun: '0.4 AU',
			lengthOfYear: '88 earth days',
			moonCount: 0
		}
	},
	venus: {
		el: document.querySelector(".venus"),
		orbitalPeriod: 0.61519726 * 31536000000,
		rotation: 0,
		startRotation: 260,
		radius: 90,
		info: {
			name: 'venus',
			icon: '&#9792;',
			description: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
			distanceFromSun: '0.7 AU',
			lengthOfYear: '255 earth days',
			moonCount: 0
		}
	},
	earth: {
		el: document.querySelector(".earth"),
		orbitalPeriod: 1.0000174 * 31536000000,
		rotation: 0,
		startRotation: 70,
		radius: 140,
		info: {
			name: 'earth',
			icon: '&#9793;',
			description: "Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
			distanceFromSun: '1 AU',
			lengthOfYear: '365.25 earth days',
			moonCount: 1
		}
	},
	mars: {
		el: document.querySelector(".mars"),
		orbitalPeriod: 1.8808476  * 31536000000,
		rotation: 0,
		startRotation: 154,
		radius: 180,
		info: {
			name: 'mars',
			icon: '&#9794;',
			description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
			distanceFromSun: '1.5 AU',
			lengthOfYear: '1.88 earth years',
			moonCount: 2
		}
	},
	jupiter: {
		el: document.querySelector(".jupiter"),
		orbitalPeriod: 11.862615  * 31536000000,
		rotation: 0,
		startRotation: 338,
		radius: 240,
		info: {
			name: 'jupiter',
			icon: '&#9795;',
			description: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
			distanceFromSun: '5.2 AU',
			lengthOfYear: '11.86 earth years',
			moonCount: 79
		}
	},
	saturn: {
		el: document.querySelector(".saturn"),
		orbitalPeriod: 29.447498 * 31536000000,
		rotation: 0,
		startRotation: 143,
		radius: 320,
		info: {
			name: 'saturn',
			icon: '&#9796;',
			description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
			distanceFromSun: '9.5 AU',
			lengthOfYear: '29.45 earth years',
			moonCount: 62
		}
	},
	uranus: {
		el: document.querySelector(".uranus"),
		orbitalPeriod: 84.016846 * 31536000000,
		rotation: 0,
		startRotation: 355,
		radius: 380,
		info: {
			name: 'uranus',
			icon: '&#9797;',
			description: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
			distanceFromSun: '19.8 AU',
			lengthOfYear: '84 earth years',
			moonCount: 27
		}
	},
	neptune: {
		el: document.querySelector(".neptune"),
		orbitalPeriod: 164.79132 * 31536000000,
		rotation: 0,
		startRotation: 300,
		radius: 420,
		info: {
			name: 'neptune',
			icon: '&#9798;',
			description: "Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.",
			distanceFromSun: '30.1 AU',
			lengthOfYear: '164.81 earth years',
			moonCount: 14
		}
	}
};


//elementen

var elPlayButton = document.querySelector("#play-button");
var elDateField = document.querySelector("#date-field");
var elSetToday = document.querySelector("#set-today");
var elSpeedField = document.querySelector("#speed-field");

var elTimeline = document.querySelector("#timeline");

var elInfoWindow = document.querySelector(".info");

//simulatie variabelen

var running = false;
var myInterval;
var speed = elSpeedField.value;

var timestamp = parseInt(elTimeline.value);
var date = new Date(timestamp);


//zet een interval voor de simulatie op 100fps of stopt de simulatie

function toggleSimulation() {
	if(running) {
		clearInterval(myInterval);
		running = false;
		elPlayButton.innerHTML = '<img src="/img/play-icon.svg" alt="play button">';
	} else {
		myInterval = setInterval(simulate, 10);
		running = true;
		elPlayButton.innerHTML = '<img src="/img/pause-icon.svg" alt="pause button">';
	}
}


//simuleert 1 stap afhangkelijk van de snelheid

function simulate() {

	//loopt door alle planeten en berekend hun positie op basis van de timestamp

	for (var p in planets) {
		var planet = planets[p];
		planet.rotation = planet.startRotation - 360 / planet.orbitalPeriod * timestamp;
		planet.el.style.transform = "rotate(" + planet.rotation + "deg) translateX(" + planet.radius + "px)";
	}

	//zet de timestamp 1 stap verder als de simulatie draait

	if(running) {
		timestamp += (26298000 * speed);
	}

	//zet de timestamp om naar een datum in yyyy-mm-dd voor het datumveld

	date = new Date(timestamp);
	elTimeline.value = timestamp;
	elDateField.value = date.toISOString().split('T')[0]; //https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

	//stopt de simulatie als het einde van de timeline berijkt is

	if ((timestamp >= 4102444800000 || timestamp <= 946684800000) && running) {
		toggleSimulation();
	}
}


//stop de simulatie en geeft info weer voor de planeet waar op geklikt wordt

function toggleInfo(planet) {
	if(running) {
		toggleSimulation();
	}
	elInfoWindow.classList.toggle("show");
	elInfoWindow.innerHTML = `
		<div>
			<img src="/img/${planet.info.name}.png" alt="${planet.info.name}">
		</div>
		<div>
			<h1>${planet.info.name} ${planet.info.icon}</h1>
			<p>${planet.info.description}</p>
			<table>
				<tr>
					<th>${planet.info.distanceFromSun}</th>
					<th>${planet.info.lengthOfYear}</th>
					<th>${planet.info.moonCount}</th>
				</tr>
				<tr>
					<td><span>&#10231;</span><br>Distance from the sun</td>
					<td><span>&#10226;</span><br>Length of year</td>
					<td><span>&#9789;</span><br>Moon count</td>
				</tr>
			</table>
		</div>
		<button id="close-button" onclick="toggleInfo()">&#9746;</button>
	`;
}


// eventlisteners elementen

elPlayButton.addEventListener("click", toggleSimulation);

elTimeline.addEventListener("input", function(){
	timestamp = parseInt(elTimeline.value);
	date = new Date(timestamp);
	elDateField.value = date.toISOString().split('T')[0]; //https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
	simulate();
});

elDateField.addEventListener("input", function(){
	date = new Date(elDateField.value);
	timestamp = date.getTime();
	elTimeline.value = timestamp;
	simulate();
});

elSetToday.addEventListener("click", function(){
	date = new Date();
	timestamp = date.getTime();
	elTimeline.value = timestamp;
	elDateField.value = date.toISOString().split('T')[0]; //https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
	simulate();
});

elSpeedField.addEventListener("input", function(){
	speed = elSpeedField.value;
});


// eventlisteners planeten voor weergeven info

planets.mercury.el.addEventListener("click", function(){
	toggleInfo(planets.mercury);
});

planets.venus.el.addEventListener("click", function(){
	toggleInfo(planets.venus);
});

planets.earth.el.addEventListener("click", function(){
	toggleInfo(planets.earth);
});

planets.mars.el.addEventListener("click", function(){
	toggleInfo(planets.mars);
});

planets.jupiter.el.addEventListener("click", function(){
	toggleInfo(planets.jupiter);
});

planets.saturn.el.addEventListener("click", function(){
	toggleInfo(planets.saturn);
});

planets.uranus.el.addEventListener("click", function(){
	toggleInfo(planets.uranus);
});

planets.neptune.el.addEventListener("click", function(){
	toggleInfo(planets.neptune);
});


// eventlisteners keypresses

document.addEventListener("keypress", function(key){
	switch(key.which) {
		case 32: //spatiebalk
			toggleSimulation();
			break;
	}
});

document.addEventListener("keydown", function(key){
	switch(key.which) {
		case 38: //uparrow
			if(speed < 10) {
				speed++;
				elSpeedField.value = speed;
			}
			break;
		case 40: //downarrow
			if(speed > -10) {
				speed--;
				elSpeedField.value = speed;
			}
			break;
	}
});


// eerste simulate voor startpositie

simulate();



