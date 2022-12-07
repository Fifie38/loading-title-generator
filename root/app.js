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

// Constants
let letter = ".letter {font-size: 0; animation: 0.1s linear anim-letter; animation-fill-mode: forwards;}"


// Variables
let textList; // a list of all characteres
let fontSizeValue; // size value (int)
let fontSizeTypeValue; // size type (em,rem, px, cm)
let delayNumberValue; // delay value (float / int)
let cursorActiveValue; // cursor value (bool)



generateButton.addEventListener("click", generate);



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

    // reset results
    resetResultHtml();
    resetResultCss();

    // add .letter class
    pushResultCss(newLetter());
    return "Done";
}


function resetResultHtml(){
    resultHtml.textContent = '';
}

function resetResultCss(){
    resultCss.textContent = '';
}

function pushResultHtml(){
    
}

function pushResultCss(text){
    let newP = document.createElement("p");
    let newContent = document.createTextNode(text);
    newP.appendChild(newContent);

    resultCss.appendChild(newP);
}

function newLetter(_fontSizeValue=fontSizeValue) {
    letter = ".letter {font-size: "+ _fontSizeValue +"; animation: 0.1s linear anim-letter; animation-fill-mode: forwards;}"
    return letter;
}

pushResultCss(letter);