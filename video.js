var interactions = [
	{
		time: 3,
		document: "interactions/first.html"
	},
	{
		time: 10,
		document: "interactions/second.html"
	}
];

let player = new Vimeo.Player('video', {
	id: '65107797',
	width: window.innerWidth,
	height: window.innerHeight
});

let slot = document.querySelector('#slot');

interactions.forEach(function(interaction) {
	player.addCuePoint(interaction.time, interaction.document)
		.then(function(id) {
			console.log(`Added cuepoint ${id}`);
		}).catch(function(error) {
			console.log(`Cannot add cuepoint, error: ${error.name}`);
		});
})

player.on('cuepoint', function({data, id, time}) {
	player.pause();
	console.log(`Triggered cuepoint ${id} at ${time} second(s)`);
	
	let interaction_frame = document.createElement('iframe');
	interaction_frame.src = data;
	slot.appendChild(interaction_frame);
});

player.on('play', function(_) {
	slot.removeChild(slot.firstElementChild);
})