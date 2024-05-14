var typedTextSpan = document.querySelector(".typed-text")

var textArray = ["coding is", "fun", "life"];

var typingDelay = 200;
var erasingDelay = 100;
var newTextDelay = 1000;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
	if (charIndex < textArray[textArrayIndex].length) {
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	} else {
		setTimeout(erase , newTextDelay);
	}
}

function erase () {
	if (charIndex > 0) {
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1)
		charIndex--;
		setTimeout(erase, erasingDelay);
	} else {
		textArrayIndex++;
		if (textArrayIndex >= textArray.length)
			textArrayIndex=0;
		setTimeout(type, typingDelay + 1100);
	}
}
export function Annimation()
{
    setTimeout(type, newTextDelay)
}

export function clearAnnimation()
{
    clearInterval(Annimation)
}
