const BEACH = "beach";

const PIG = 0;

const WIN = 0;
const LOSE = 1;
const TIE = 2;

function generateEvent(map, user) {
	var eventNumber;
	var event;
	var eventStatus;
	switch(map) {
		case BEACH:
			eventNumber = 0;
			break;
	}
	event = getEvent(eventNumber);
	if (event.type === "monster") {
		eventStatus = battle(user.combatstats, event.info);
		
		if (eventStatus.status === "win") {
			user.exp += event.returns.exp;
		}

		return eventStatus;
	}
};

function battle(char1, char2) {
	var log = "\n\n\n\n\n\n\n\n\n\n";
	var char1dmg;
	var char2dmg;
	for (var i = 0; i < 200; i++) {
		
		//each hit each other
		char1dmg = char1.power;
		char2dmg = char2.power;

		char2.hp -= char1dmg;
		log += "\nyou hit " + char2.name + " for " + char1dmg + "(" + char2.hp + ")";
		if (char2.hp <= 0) {
			return {
				status: "win",
				hp: char1.hp,
				fightLog: log,
			};
		}

		char1.hp -= char2dmg;
		log += "\n" + char2.name + " hit you for " + char2dmg + "(" + char1.hp + ")";
		if (char1.hp <= 0) {
			return {
				status: "lose",
				hp: 0,
				fightLog: log
			};
		}
	}
	return {
		status: "tie",
		hp: char1.hp,
		fightLog: log
	};
};
