const firstPlayer = {
	initialPosition: {
		x: 416,
		y: 344
	},
	animations: {
		still: {
			frames: {
				start: 0,
				end: 0
			},
			frameRate: 1
		}
	}
};

const secondPlayer = {
	initialPosition: {
		x: 544,
		y: 344
	},
	animations: {
		still: {
			frames: {
				start: 4,
				end: 4
			},
			frameRate: 1
		}
	}
};

const playerAnimations = {
	still: {
		frames: {
			start: 0,
			end: 0
		},
		frameRate: 1
	},
	right: {
		frames: {
			start: 0,
			end: 3
		},
		frameRate: 10
	},
	left: {
		frames: {
			start: 4,
			end: 7
		},
		frameRate: 10
	},
	jump: {
		frames: [8],
		frameRate: 4
	}
};