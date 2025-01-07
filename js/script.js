(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
				{
					clue: "Kepler was known for his work in astronomy. He was interested in optics as well, and was one of the first to scientifically analyse atmospheric optics, which is really just a fancy wat to describe a ______.",
					answer: "mirage",
					position: 1,
					orientation: "across",
					startx: 4,
					starty: 1
				},
			 	{
					clue: "astronomer Ulugh Beg's day gig",
					answer: "emir",
					position: 5,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "Ilya Sutskever will likely go down in history as creating the first popular machine that can do this.",
					answer: "chat",
					position: 6,
					orientation: "across",
					startx: 7,
					starty: 3
				},
				{
					clue: "This scientist's work was so influential that a whole scientific revolution that lasted over a hundred years was named after him.",
					answer: "copernicus",
					position: 8,
					orientation: "across",
					startx: 1,
					starty: 5
				},
				{
					clue: "This scientist discovered caesium and rubidium, was a pioneer in multiple fields of chemistry...but you probably only remember him for his most famous invention...or even as a muppet.",
					answer: "bunsen",
					position: 9,
					orientation: "across",
					startx: 3,
					starty: 7
				},
				{
					clue: "Waldemar Lindgren first proposed the scheme for classifying this material.",
					answer: "ore",
					position: 12,
					orientation: "across",
					startx: 3,
					starty: 8
				},
				{
					clue: "Louis E. Brus is known for studying this nano material. It's appropriately called the quantum ___.",
					answer: "dot",
					position: 13,
					orientation: "across",
					startx: 7,
					starty: 8
				},
				{
					clue: "Speaking of folks dealing with the itty bitty, Anatoli Bugorski not only studied proton beam's, he was ___ by one.",
					answer: "hit",
					position: 15,
					orientation: "across",
					startx: 3,
					starty: 9
				},
				{
					clue: "This 'robot scientist' has already made plenty of enemies.",
					answer: "eve",
					position: 16,
					orientation: "across",
					startx: 7,
					starty: 9
				},
				{
					clue: "Tycho Brahe's death is fascinating. If you've never studied it, do so right now. Anywho, he should have just said, '____, I'll be right back. I need to use the restroom.'",
					answer: "sire",
					position: 17,
					orientation: "across",
					startx: 1,
					starty: 10
				},
				{
					clue: "Despite being primarily known for his work on gravity, calculus, and other disciplines, this scientist wrote over twice as much on theology as he did all scientific and mathematic disciplines combined.",
					answer: "isaac",
					position: 18,
					orientation: "across",
					startx: 6,
					starty: 10
				},
				{
					clue: "This scientist discovered polonium and radium in addition to developing the mobile x-ray for battlefield hospitals.",
					answer: "mariecurie",
					position: 1,
					orientation: "down",
					startx: 4,
					starty: 1
				},
				{
					clue: "While this scientist first discovered buoyancy and exhaustion, he's probably most associated with the world's most pun-worthy number.",
					answer: "archimedes",
					position: 2,
					orientation: "down",
					startx: 7,
					starty: 1
				},
				{
					clue: "Biologist Rachel Carson's <i>Silent Spring</i> influenced Richard Nixon's founding of this organization. It would be interesting to imagine Carson's take on the organization now, given her critique of the USDA's conflict of interests in her own day.",
					answer: "epa",
					position: 3,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					clue: "Like the scientists mentioned in 1 and 18 across, this person is not primarily known for his work in optics, despite discovering the law of refraction. He is primarily known, not for science, but for the world's most popular philisophical one-liner.",
					answer: "descartes",
					position: 4,
					orientation: "down",
					startx: 1,
					starty: 2
				},
				{
					clue: "easily the most exploited person in this puzzle, both in his life and to the present day...I mean, hands down, there's no competition",
					answer: "tesla",
					position: 7,
					orientation: "down",
					startx: 10,
					starty: 3
				},
				{
					clue: "This physicist's model for describing the atom is still used today despite it only being accurate for atoms with a single electron.",
					answer: "bohr",
					position: 9,
					orientation: "down",
					startx: 3,
					starty: 7
				},
				{
					clue: "Jacques Cousteau would have used this tool much more often than other scientists in this puzzle.",
					answer: "net",
					position: 10,
					orientation: "down",
					startx: 5,
					starty: 7
				},
				{
					clue: "Tycho Brahe is credited for naming this phenomenon in which an apparently 'new' star appears and then fades away.",
					answer: "nova",
					position: 11,
					orientation: "down",
					startx: 8,
					starty: 7
				},
				{
					clue: "Botanist Robert Fortune introducted much flora from China to Europe, but arguable the most significant introduction he made was bringing these Chinese plants to India.",
					answer: "tea",
					position: 14,
					orientation: "down",
					startx: 9,
					starty: 8
				},
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}