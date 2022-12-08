// Get form elements :
const textToGenerate = document.getElementById("text-to-generate");
const fontSize = document.getElementById("font-size");
const fontSizeType = document.getElementById("font-size-type");
const delayNumber = document.getElementById("delay-number");
const delayNumberType = document.getElementById("delay-number-type");
const cursorActive = document.getElementById("cursor-active");
const generateButton = document.getElementById("generate-button");
const tagSpan = document.getElementById("tag-span");
const startDelay = document.getElementById("start-delay");
const cursorDelay = document.getElementById("cursor-delay");
const cursorDelayType = document.getElementById("cursor-delay-type");


// Get result elements :
const generatorRight = document.getElementById("generator-right");
const resultHtml = document.getElementById("result-html");
const resultCss = document.getElementById("result-css");

// Get copy buttons
const htmlButton = document.getElementById("copy-button-html");
const cssButton = document.getElementById("copy-button-css");

// Get display elements : 
const generatorBox2 = document.getElementById("generator-box-2");

// Variables in start
let letter = ".letter {font-size: 0; animation: 0.05s linear anim-letter; animation-fill-mode: forwards;}";
let keyframesLetter = "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: 2em;}}";
const keyframesCursor = "@keyframes anim-cursor { 0%{opacity: 1;} 50%{opacity: 0;} 100%{opacity: 1;}";
const htmlHead = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Loading Title</title><link rel="stylesheet" href="style.css"></head>`;
const bodyStart = '<body><section id="section-1"><h1 >';
const bodyEnd = `</h1></section></body></html>`;
const cursor = `<span id="cursor">|</span>`;

const displaySectionHead = '<section id="section-1"> <h1 >'
const displaySectionEnd = '</h1> </section>'


// Variables from form
let textList = []; // a list of all characteres
let fontSizeValue; // size value (int)
let fontSizeTypeValue; // size type (em,rem, px, cm)
let delayNumberValue; // delay value (float / int)
let cursorActiveValue; // cursor value (bool)
let delayNumberTypeValue; // number delay type (s, ms)
let tagSpanValue; // tag value (h1, h2, h3, p)
let startDelayValue; // Delay before first letter animation 
let cursorDelayValue; // cursor animation delay value
let cursorDelayTypeValue; // cursor animation delay type (s, ms)


// ======== Buttons event ========= //
htmlButton.addEventListener("click", () => {
    navigator.clipboard.writeText(resultHtml.innerText);
    resultHtml.innerHTML = "Copied !";
});
cssButton.addEventListener("click", () => {
    navigator.clipboard.writeText(resultCss.innerText);
    resultCss.innerHTML = "Copied !";
});



// ========= Form submit event ========= //
generateButton.addEventListener("click", generate);


// ========= Main function ========= //
function generate() {
    /** Set form result in variables */ 
    textList = textToGenerate.value.split('');
    fontSizeValue = fontSize.value;
    fontSizeTypeValue = fontSizeType.value;
    delayNumberValue = delayNumber.value;
    delayNumberTypeValue = delayNumberType.value;
    tagSpanValue = tagSpan.value;
    startDelayValue = startDelay.value;
    cursorDelayValue = cursorDelay.value;
    cursorDelayTypeValue = cursorDelayType.value;

    if (cursorActive.value == "yes") {
        cursorActiveValue = true;
    } else {
        cursorActiveValue = false;
    }
    pushAll(); // push all elements in html and css results
}



// ========= Push all elements in html and css results ========= //
function pushAll(){
    /** Push all elements in html and css results */
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




// ========= Reset elements ========= //
function resetResultHtml(){
    /** Reset the hmtl result */
    resultHtml.textContent = '';
}

function resetResultCss(){
    /** Reset the css result */
    resultCss.textContent = '';
}

function resetDisplayResult(){
    /** Reset the display result */
    generatorBox2.textContent = '';
}



// ========= Create new elements ========= //
function newKeyframesLetter(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue,) {
    /** Create new Keyframes for .letter*/
    return "@keyframes anim-letter { 0%{font-size: 0;} 100%{font-size: "+ _fontSizeValue + _fontSizeTypeValue +";}}"; 
}

function newCursor(_fontSizeValue = fontSizeValue, _fontSizeTypeValue = fontSizeTypeValue){
    /** Create new #cursor style (cursor at the end) */
    return "#cursor {font-size: "+ _fontSizeValue + _fontSizeTypeValue +"; animation: 1s infinite anim-cursor;}"
}

function newLetterNthChild(_number, _startDelayValue= startDelayValue, _delayNumberValue = delayNumberValue, _delayNumberTypeValue = delayNumberTypeValue){
    /** Create a new style for a nth-child element of .letter (add animation-delay) */
    let delay = Number(_startDelayValue) + (_number * _delayNumberValue);
    return ".letter:nth-child(" + String(_number + 1) + "){animation-delay: " + String(delay.toFixed(2)) + _delayNumberTypeValue + ";}";
}

function newLetterSpan(letter){
    /** Create new span .letter */
    return `<span class="letter">` + String(letter) + `</span>`; 
}




// ========= Push elements in DOM ========= //
function pushResultHtml(text){
    /** Create a new p with the @param:text and push it to html result */
    let newP = document.createElement("p");
    let newContent = document.createTextNode(text);
    newP.appendChild(newContent);
    resultHtml.appendChild(newP);
}

function pushResultCss(text){
    /** Create a new p with the @param:text and push it to css result */
    let newP = document.createElement("p");
    let newContent = document.createTextNode(text);
    newP.appendChild(newContent);
    resultCss.appendChild(newP);
}

function pushDisplayResult(text) {
    /** Push the @param:text to the display box */
    generatorBox2.innerHTML += text;
}

function pushLetterSpanHtml(element) {
    /** Push the span in the html result */
    pushResultHtml(element);
}
function pushLetterNthChildCss(element) {
    /** Push the .letter style in the css result */
    pushResultCss(element);
}

function pushAllLetterNthChild(_number = textList.length) {
    /** Push all style of .letter (nth-child) in the css result */
    let nthChild;
    for (let i = 0; i < _number; i++){
        nthChild = newLetterNthChild(i);
        pushLetterNthChildCss(nthChild);
    }
}

function pushAllLetterSpan(_number = textList.length, list = textList) {
    /** Push all span of .letter in the css result */
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
    /** Push all .letter span in the display box */
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
    /** Return all .letter style (nth-child) -> used for display box */
    let nthChild;
    for (let i = 0; i < _number; i++){
        nthChild += newLetterNthChild(i) + " \n";
    }
    return nthChild
}
