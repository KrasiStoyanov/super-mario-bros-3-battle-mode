const playerVelocity = {
	x: 250,
	y: 500
};

const enemyVelocity = {
	skeleton: {
		x: 100
	},
	bat: {
		x: 150,
		y: 150
	},
	ghost: {
		x: 200,
		y: 200
	}
};

const exitTubesPositionBoundaries = {
	left: {
		x: 4 * 16,
		y: 32 * 16
	},
	right: {
		x: 56 * 16,
		y: 32 * 16
	}
};

const positionInWhichNewEnemyMustSpawn = {
	x: 0,
	y: 21 * 16
};

const firstPlayer = {
	initialPosition: {
		x: 26 * 16,
		y: 21 * 16
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
		x: 34 * 16,
		y: 21 * 16
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
	},
	lose: {
		frames: [9],
		frameRate: 4
	}
};

const enemies = {
	skeleton: {
		left: {
			initialPosition: {
				x: 4 * 16,
				y: 7 * 16
			}
		},
		right: {
			initialPosition: {
				x: 55 * 16,
				y: 7 * 16
			}
		}
	}
};