"use strict";

window.onload = init;

function init() {
  var calcButtons = document.getElementsByClassName("calcButton");


  for (var i = 0; i < calcButtons.length; i++) {
    calcButtons[i].addEventListener("click", buttonClick);
  }

  document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

function buttonClick(e) {
  var calcValue = document.getElementById("calcWindow").value;
  var calcDecimal = document.getElementById("decimals").value;
  var buttonValue = e.target.value;

  switch (buttonValue) {
    case "del":
      calcValue = "";
      break;
    case "bksp":
      calcValue = eraseChar(calcValue);
      break;
    case "enter":
      calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
      break;
    case "prev":
      calcValue += lastEq(calcValue);
      break;
    default:
      calcValue += buttonValue;
      break;
  }

  document.getElementById("calcWindow").value = calcValue;
  document.getElementById("calcWindow").focus();

}

function calcKeys(e) {

  var calcValue = document.getElementById("calcWindow").value;
  var calcDecimal = document.getElementById("decimals").value;

  switch (e.key) {
    case "Delete":
      calcValue = "";
      break;
    case "Enter":
      calcValue += " = " + evalEq(calcValue, calcDecimal);
      break;
    case "ArrowUp":
      e.preventDefault();
      calcValue += lastEq(calcWindow.value);
      break;
  }
  document.getElementById("calcWindow").value = calcValue;

}




/* ===================================================================== */

function eraseChar(textStr) {
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}
