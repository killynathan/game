const BEACH = "beach";

const PIG = 0;

const WIN = 0;
const LOSE = 1;
const TIE = 2;

//var fightlog = document.getElementById("logo");
//fightlog.innerHTML = "TESTING";

function generateEvent(map, user) {
	var eventNumber;
	var event;
	var eventStatus;
	switch(map) {
		case BEACH:
			eventNumber = 0;
			break;
	}
	event = events[eventNumber];
	if (event.type === "monster") {
		eventStatus = battle(user.combatstats, event.info);
		
		if (eventStatus.status === "win") {
			user.exp += event.returns.exp;
		}

		return eventStatus;
	}
};

function battle(char1, char2) {
	var log = "";
	var char1dmg;
	var char2dmg;
	for (var i = 0; i < 400; i++) {
		//check winner
		if (char1.hp <= 0) {
			return {
				status: "lose",
				hp: 0,
				fightLog: log
			};
		}
		else if (char2.hp <= 0) {
			return {
				status: "win",
				hp: char1.hp,
				fightLog: log,
			};
		}
		//each hit each other
		char1dmg = char1.power;
		char2dmg = char2.power;

		char1.hp -= char2dmg;
		char2.hp -= char1dmg;
		log += "\nyou hit " + char2.name + " for " + char1dmg + "(" + char2.hp + ")";
		log += "\n" + char2.name + " hit you for " + char2dmg + "(" + char1.hp + ")";
	}
	return {
		status: "tie",
		hp: char1.hp,
		fightLog: log
	};
};
