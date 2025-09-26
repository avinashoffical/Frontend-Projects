let display='';
let memory='';
document.querySelector('.display').value=display;

function appendValue(value){
    display=display+value;
    document.querySelector('.display').value=display;
}

function clearAll(){
    display="";
    document.querySelector('.display').value=display;
}

function calculateResult(){
    try{
        result=eval(display);
        document.querySelector('.display').value=result;

    }catch{
        document.querySelector('.display').value="Error";   
    }
}

function memoryRecall(){
      
}

function memoryAdd(){

}

function memoryClear(){
    memory="";
}

function memorySubtract(){

}

function clearEntry(){
    display.value=display.value.slice(0,-1);
}

function squareRoot(){
    if(display.value){
        display.value=Math.sqrt(parseFloat(display.vale));
    }
}

function toggleSign(){
    if(display.value){
        display.vale=(parseFloat(display.value)*-1).toString();
    }
}
