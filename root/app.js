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

// Variables in start
let letter = ".letter {font-size: 0; animation: 0.1s linear anim-letter; animation-fill-mode: forwards;}";
let keyframesLetter = "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: 2em;}}";

const keyframesCursor = "@keyframes anim-cursor { 0%{opacity: 1;} 50%{opacity: 0;} 100%{opacity: 1;}";


// Variables
let textList; // a list of all characteres
let fontSizeValue = 0; // size value (int)
let fontSizeTypeValue = "em"; // size type (em,rem, px, cm)
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

    // add .letter style
    pushResultCss(letter);

    // add keyframes anim-letter
    pushResultCss(newKeyframesLetter(fontSizeValue, fontSizeTypeValue));

    // add #cursor style
    pushResultCss(newCursor(fontSizeValue, fontSizeTypeValue));
    // add keyframes anim-cursor
    pushResultCss(keyframesCursor);

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

function newKeyframesLetter(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue) {
    return "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: "+ _fontSizeValue + _fontSizeTypeValue +";}}"; 
}

function newCursor(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue){
    return "#cursor {font-size: "+ _fontSizeValue + _fontSizeTypeValue +"; animation: 0.8s infinite anim-cursor;}"
}
