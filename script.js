var currentValue = 0;
var newNumber = false; // solves bug where clicking two arithmetic operations in a row yield ad
var start = true;
var total = 0;
var op = "no-op"

function computeLastOp() {
    if (start) {
        return parseInt(document.getElementById("display").innerText);
    }
    switch (op) {
    case "add":
        return total + currentValue;
    case "subtract":
        return total - currentValue;
    case "multiply":
        return total * currentValue;
    case "divide":
        return total / currentValue;
    default:
        return total;    
    }
}

function arithmeticFunction() {
    total = computeLastOp();
    console.log(currentValue)
    console.log(total)
    // handle new data
    var classes = this.classList;
    if (classes.contains("add")) {
        op = "add";
    } else if (classes.contains("subtract")) {
        op = "subtract";
    } else if (classes.contains("multiply")) {
        op = "multiply";
    } else if (classes.contains("divide")) {
        op = "divide";
    }
    
    document.getElementById("display").innerText = 0;
    currentValue = parseInt(document.getElementById("display").innerText);
    newNumber = true;
    start = false;
}
function assignFunction() {
    total = computeLastOp();
    document.getElementById("display").innerText = total;
    start = true;
}

function clearFunction() {
    document.getElementById("display").innerText = 0;
    total = currentValue = 0;
}

function deleteFunction() {
    var text = document.getElementById("display").innerText;
    text = (text.length > 1) ? text.slice(1) : text;
    document.getElementById("display").innerText = text;
}

function numberFunction() {
    var displayedValue = document.getElementById("display").innerText;
    switch (displayedValue) { // switches use strict comparison
    case "0": // 0 is displayed
        document.getElementById("display").innerText = this.innerText;
        break;
    default: // something non-zero is displayed
        document.getElementById("display").innerText += this.innerText;
    }
    currentValue = parseInt(document.getElementById("display").innerText);
    newNumber = true;
}
  


function init() {
    /* ADD EVENT LISTENERS */
    // get the tags with class "number"
    var numberElements = document.getElementsByClassName("clickable");
    var eventFunction;
    // add mouse click functionality
    for (var i = 0; i < numberElements.length; i++) {
        if (numberElements[i].classList.contains("number")) {
            eventFunction = numberFunction;                            // number buttons
        } else if (numberElements[i].classList.contains("add") ||
                   numberElements[i].classList.contains("subtract") ||
                   numberElements[i].classList.contains("multiply") ||
                   numberElements[i].classList.contains("divide")) {
            eventFunction = arithmeticFunction;                        // arithmetic buttons
        } else if (numberElements[i].classList.contains("delete")) {
            eventFunction = deleteFunction;                            // <- button
        } else if (numberElements[i].classList.contains("assign")) {
            eventFunction = assignFunction;                            // = button
        } else if (numberElements[i].classList.contains("clear")) {
            eventFunction = clearFunction;                             // C button
        }
        
        numberElements[i].addEventListener("click", eventFunction);
    }
}