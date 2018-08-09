
math.config({
	number: 'BigNumber'
     
});

function setCaretPosition(elemId, caretPos) {
//Optimal cross-browser solution made with the help of:
//Mark Pieszak
  
//https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox
  
    var el = document.getElementById(elemId);

    el.value = el.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (el !== null) {

        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        }

        else {
            // (el.selectionStart === 0 added for Firefox bug)
            if (el.selectionStart || el.selectionStart === 0) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
                return true;
            }

            else  { // fail city, fortunately this never happens (as far as I've tested) :)
                el.focus();
                return false;
            }
        }
    }
}

let Button = function (symbol) {


	this.concatToScreen = function (){
		let start;
		start = document.querySelector('#screen').selectionStart;
		console.log("****start is: ");
		console.log(start);

		let screen = document.querySelector('#screen').value.split('');
		screen.splice(start, 0, symbol);
		console.log("screen before join:");
		console.log(screen);
		
		screen = screen.join('');
		console.log("screen after join: ");
		console.log(screen);

		document.querySelector('#screen').value = screen;
		console.log("****start after concat is: ");
		console.log(start);

		
	setCaretPosition('screen', 100);
	//	document.querySelector('#screen').setSelectionStart = document.querySelector('#screen').value.length;
	//	console.log("Selection start is:");
	//	console.log(document.querySelector('#screen').selectionStart);
	}
}


let plusFunc = new Button ("+");
let plus = document.querySelector('#plus');
plus.addEventListener("click", plusFunc.concatToScreen);

let minusFunc = new Button ("-");
let minus = document.querySelector('#minus');
minus.addEventListener("click", minusFunc.concatToScreen);

let multFunc = new Button ("*");
let mult = document.querySelector('#multiply');
mult.addEventListener("click", multFunc.concatToScreen);

let divFunc = new Button ("/");
let divide = document.querySelector('#divide');
divide.addEventListener("click", divFunc.concatToScreen);

let zeroFunc = new Button ("0");
let zero = document.querySelector('#zero');
zero.addEventListener("click", zeroFunc.concatToScreen);

let oneFunc = new Button ("1");
let one  = document.querySelector("#one");
one.addEventListener("click", oneFunc.concatToScreen);

let twoFunc = new Button ("2");
let two = document.querySelector("#two");
two.addEventListener("click", twoFunc.concatToScreen);

let threeFunc = new Button ('3');
let three = document.querySelector('#three');
three.addEventListener("click", threeFunc.concatToScreen);

let fourFunc = new Button ('4');
let four = document.querySelector('#four');
four.addEventListener("click", fourFunc.concatToScreen);

let fiveFunc = new Button ("5");
let five = document.querySelector('#five');
five.addEventListener("click", fiveFunc.concatToScreen);

let sixFunc = new Button ('6');
let six = document.querySelector('#six');
six.addEventListener("click", sixFunc.concatToScreen);

let sevenFunc = new Button ('7');
let seven = document.querySelector('#seven');
seven.addEventListener("click", sevenFunc.concatToScreen);

let eightFunc = new Button ('8');
let eight = document.querySelector('#eight');
eight.addEventListener('click', eightFunc.concatToScreen);

let nineFunc = new Button ('9');
let nine = document.querySelector('#nine');
nine.addEventListener('click', nineFunc.concatToScreen);

let decimalFunc = new Button ('.');
let decimal = document.querySelector('#decimal');
decimal.addEventListener('click', decimalFunc.concatToScreen);

let squareFunc = new Button ('^2');
let square = document.querySelector('#square');
square.addEventListener('click', squareFunc.concatToScreen);

let squareRootFunc = new Button ('sqrt(');
let squareRoot = document.querySelector('#squareRoot');
squareRoot.addEventListener("click", squareRootFunc.concatToScreen);

let exponentFunc = new Button ('^');
let exponent = document.querySelector('#exponent');
exponent.addEventListener("click", exponentFunc.concatToScreen);

let leftParensFunc = new Button ('(');
let leftParentheses = document.querySelector('#left-parentheses');
leftParentheses.addEventListener('click', leftParensFunc.concatToScreen);

let rightParensFunc = new Button (')');
let rightParentheses = document.querySelector('#right-parentheses');
rightParentheses.addEventListener('click', rightParensFunc.concatToScreen);

function output (statement, result) {
	//make a new p element and set it's content to statement
	//add that p elemnt to the register
	let newP = document.createElement('p');
	let register = document.querySelector('#register');
	let newContent = document.createTextNode(statement + "=");

	newP.appendChild(newContent);
	register.appendChild(newP);

	//make result shorter to fit in register for repeating decimals
	result = math.format(result, { precision: 15 });
	console.log(result);
	newP = document.createElement('p');
	newContent = document.createTextNode("\u21B3 " + result);

	newP.appendChild(newContent);
	register.appendChild(newP);

	register.scrollTop = register.scrollHeight;


}

function equalsFunc () {
	let eval = document.querySelector('.eval').value;
	try {
		let answer = math.eval(eval);
	}
	catch(err) {
		let answer = err.message;
		output(eval, answer);
		clearEntry();
		console.log(answer);
	}
	finally {
		let answer = math.eval(eval);
		output(eval, answer);
		clearEntry();
		console.log(answer);
	}
}

let equals = document.querySelector('.equals');
equals.addEventListener("click", equalsFunc);

let input = document.querySelector('#screen');
input.addEventListener('keyup', function(event) {
	event.preventDefault();

	if (event.keyCode === 13) {
		equalsFunc();
	}
});
function clearEntry () {
	document.querySelector('#screen').value = "";
}
let ce = document.querySelector('#ce');
ce.addEventListener('click', clearEntry);

function allClear () {
	let register = document.querySelector('#register');
	let regCount = register.childElementCount;
	for (let i = 0; i < regCount; i++) {
		register.removeChild(register.lastChild);
	}
}

let clearBut = document.querySelector('#ac');
clearBut.addEventListener('click', allClear);

//When input is filled with error, I need the pressing of any button to move it to the register

