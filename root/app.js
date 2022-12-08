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

// Get copy buttons
const htmlButton = document.getElementById("copy-button-html");
const cssButton = document.getElementById("copy-button-css");

// Get result elements : 
const generatorBox2 = document.getElementById("generator-box-2");

// Variables in start
let letter = ".letter {font-size: 0; animation: 0.05s linear anim-letter; animation-fill-mode: forwards;}";
let keyframesLetter = "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: 2em;}}";
const keyframesCursor = "@keyframes anim-cursor { 0%{opacity: 1;} 50%{opacity: 0;} 100%{opacity: 1;}";
let startDelay = 1.5; // Delay before first letter animation 
const htmlHead = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Loading Title</title>
    <link rel="stylesheet" href="style.css">
</head>`;
const bodyStart = `<body>
<section id="section-1">
    <h1 >`;
const bodyEnd = `</h1>
</section>
</body>
</html>`;
const cursor = `<span id="cursor">|</span>`;

const displaySectionHead = '<section id="section-1"> <h1 >'
const displaySectionEnd = '</h1> </section>'


// Variables
let textList = []; // a list of all characteres
let fontSizeValue; // size value (int)
let fontSizeTypeValue; // size type (em,rem, px, cm)
let delayNumberValue; // delay value (float / int)
let cursorActiveValue; // cursor value (bool)


// Buttons event
htmlButton.addEventListener("click", () => {
    navigator.clipboard.writeText(resultHtml.innerText);
    resultHtml.innerHTML = "Copy !";
});
cssButton.addEventListener("click", () => {
    navigator.clipboard.writeText(resultCss.innerText);
    resultCss.innerHTML = "Copy !";
});


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

    // push all elements in html and css results
    pushAll();
}

function pushAll(){
    // reset results
    resetResultHtml();
    resetResultCss();
    resetDisplayResult();

    // ==== HTML ====//
    // add head of the html file
    pushResultHtml(htmlHead);
    // add body start
    pushResultHtml(bodyStart);
    // add all .letter span
    pushAllLetterSpan(textList.length, textList);
    // Check if cursor are select
    if (cursorActiveValue) {
        // add #cursor span
        pushResultHtml(cursor);
    }
    // add body end 
    pushResultHtml(bodyEnd);


    // ==== CSS ====//
    // add .letter style
    pushResultCss(letter);
    // add keyframes anim-letter
    pushResultCss(newKeyframesLetter(fontSizeValue, fontSizeTypeValue));
    // add all .letter:nth-child
    pushAllLetterNthChild(textList.length);
    // Check if cursor are select
    if (cursorActiveValue) {
        // add #cursor style
        pushResultCss(newCursor(fontSizeValue, fontSizeTypeValue));
        // add keyframes anim-cursor
        pushResultCss(keyframesCursor);
    }

    // ==== Display Result ==== //
    // Display all .letter span
    displayAllLetterSpan(textList.length, textList);
    // Check if cursor are select
    if (cursorActiveValue) {
        // add #cursor span
        pushDisplayResult("<h1 id='cursor'>" + cursor + "</h1>");
    }
    // Push all style
    pushDisplayResult( "<style>"+ letter + "\n"+ newKeyframesLetter(fontSizeValue, fontSizeTypeValue) + "\n" + displayAllLetterNthChild() 
    + "\n" + newCursor(fontSizeValue, fontSizeTypeValue) + "\n" + keyframesCursor +"</style>");
    
    // start animations
    letter.style.animationPlayState = 'running';

    
}


function resetResultHtml(){
    resultHtml.textContent = '';
}

function resetResultCss(){
    resultCss.textContent = '';
}

function resetDisplayResult(){
    generatorBox2.textContent = '';
}

function pushResultHtml(text){
    let newP = document.createElement("p");
    let newContent = document.createTextNode(text);
    newP.appendChild(newContent);

    resultHtml.appendChild(newP);
}

function pushResultCss(text){
    let newP = document.createElement("p");
    let newContent = document.createTextNode(text);
    newP.appendChild(newContent);

    resultCss.appendChild(newP);
}

function pushDisplayResult(text) {
    generatorBox2.innerHTML += text;
}

function newKeyframesLetter(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue) {
    return "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: "+ _fontSizeValue + _fontSizeTypeValue +";}}"; 
}

function newCursor(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue){
    return "#cursor {font-size: "+ _fontSizeValue + _fontSizeTypeValue +"; animation: 0.8s infinite anim-cursor;}"
}


function newLetterNthChild(_number, _startDelay= startDelay, _delayNumberValue = delayNumberValue){
    return ".letter:nth-child(" + String(_number + 1) + "){animation-delay: " + String((_startDelay + (_number)* _delayNumberValue).toFixed(2)) + "s;}";
}

function pushLetterSpanHtml(element) {
    pushResultHtml(element);
}

function pushLetterNthChildCss(element) {
    pushResultCss(element);
}


function pushAllLetterNthChild(_number = textList.length) {
    let nthChild;
    for (let i = 0; i < _number; i++){
        nthChild = newLetterNthChild(i);
        pushLetterNthChildCss(nthChild);
    }
}



function newLetterSpan(letter){
    return `<span class="letter">` + String(letter) + `</span>`; 
}

function pushAllLetterSpan(_number = textList.length, list = textList) {
    let letterSpan;
    for (let i = 0; i < _number; i++){
        if (textList[i] === " ") {
            letterSpan = newLetterSpan("&nbsp;");
        } else {
            letterSpan = newLetterSpan(textList[i]);
        }
        pushLetterSpanHtml(letterSpan);
    }
}

function displayAllLetterSpan(_number = textList.length, list = textList) {
    let letterSpan;
    for (let i = 0; i < _number; i++){
        if (textList[i] === " ") {
            letterSpan = "<h1 class='letter'>" + newLetterSpan("&nbsp;") + "</h1>";
        } else {
            letterSpan = "<h1 class='letter'>" + newLetterSpan(textList[i]) + "</h1>";
        }
        pushDisplayResult(letterSpan);
    }
}

function displayAllLetterNthChild(_number = textList.length) {
    let nthChild;
    for (let i = 0; i < _number; i++){
        nthChild += newLetterNthChild(i) + " \n";
    }
    return nthChild
}