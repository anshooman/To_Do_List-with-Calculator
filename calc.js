let screen = document.getElementById('calculator-screen');
let screenValue = screen.textContent;
let firstvalue=   0;
let previousOperator=null; 
let waitingforsecondvalue=false;

function inputDigit(digit){
    if(waitingforsecondvalue){
        waitingforsecondvalue=false;
        screenValue=digit;

    }
    else{
        screenValue=screenValue==='0'?digit:screenValue+digit;
    }
     
    updateScreenDisplay();
}

function inputDecimal(){
    if(waitingforsecondvalue){
        inputDigit('0.')
    }
    if(!screenValue.includes('.')){
        screenValue += '.';
    }
    updateScreenDisplay();
}

function toggleSign(){
    screenValue = screenValue * -1;
    if(waitingforsecondvalue){
        firstvalue = screenValue;
    }
    updateScreenDisplay();
}

function getSquareRoot(){
    
    screenValue = Math.sqrt(parseInt(screenValue));
    firstvalue=screenValue;
    updateScreenDisplay();
     
}

function clearEntry(){
    screenValue=screenValue.slice(0,-1);
    if(screenValue.length===0){
        screenValue='0';
    }
    updateScreenDisplay();
}

function clearAll(){
    firstvalue=0;
    screenValue='0';
    updateScreenDisplay();
}

function handleOperator(currentoperator){

    if(waitingforsecondvalue){
        previousOperator=currentoperator;
        return;
    }

    firstvalue=calculate(firstvalue,previousOperator, parseFloat(screenValue));
    screenValue=firstvalue;
    previousOperator=currentoperator;
    waitingforsecondvalue=true;
    updateScreenDisplay();

}
function calculate(first,operator,second){
    if(operator==='+') return first + second;
    if(operator==='-') return first -  second;
    if(operator==='*') return first * second;
    if(operator==='/') return first / second;

    return second; 
}

function separateScreenValueByComma(){
    let parts = screenValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function updateScreenDisplay(){
    screen.textContent=separateScreenValueByComma();
}

