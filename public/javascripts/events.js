var events = [
	{
		type: "monster",
		info: {
			name: "pig",
			hp: 10,
			agility: 1,
			strength: 1,
			intelligence: 1,
			power: 1
		},
		returns: {
			exp: 5
		}
	}
];

function getEvent(num) {
	switch(num) {
		case 0:
			return {
				type: "monster",
				info: {
					name: "pig",
					hp: 10,
					agility: 1,
					strength: 1,
					intelligence: 1,
					power: 1
				},
				returns: {
					exp: 5
				}
			};
	}
}