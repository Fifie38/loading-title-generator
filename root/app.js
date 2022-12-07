// Get form elements :
const textToGenerate = document.getElementById("text-to-generate");
const fontSize = document.getElementById("font-size");
const fontSizeType = document.getElementById("font-size-type");
const delayNumber = document.getElementById("delay-number");
const cursorActive = document.getElementById("cursor-active");
const generateButton = document.getElementById("generate-button");

// Get result elements :
const generatorRight = document.getElementById("generator-right");
const resultHtml = document.getElementById("result-html");
const resultCss = document.getElementById("result-css");


let textList; // a list of all characteres
let fontSizeValue; // size value (int)
let fontSizeTypeValue; // size type (em,rem, px, cm)
let delayNumberValue; // delay value (float / int)
let cursorActiveValue; // cursor value (bool)

generateButton.addEventListener("click", generate());



// Set form result in variables
function generate() {
    textList = textToGenerate.value.split('');
    fontSizeValue = fontSize.value;
    fontSizeTypeValue = fontSizeType.value;
    delayNumberValue = delayNumber.value;
    if (cursorActive.value == "yes") {
        cursorActiveValue = true;
    } else {
        cursorActiveValue = false;
    }
}

