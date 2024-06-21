const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateinput = document.getElementById("dateinput");
const timeinput = document.getElementById("timeinput");
document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById('dateinput');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

function addtask(e){
    if(inputBox.value===''|| dateinput.value===''||  timeinput.value===''){
        alert("Please fill all the fields");
        return

    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value + "<br>date : " + dateinput.value + "<br>time : " + timeinput.value;
        let span = document.createElement("span");
        span.innerHTML = "&#10006";
        li.appendChild(span);

        listContainer.appendChild(li);
       
    }
    
    savedata();

}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentNode.remove();
        savedata();
    }
    
    savedata();

},false);

// Add event listener for double-click to make li editable
listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        e.target.setAttribute("contenteditable", "true");
        e.target.focus();
    }
});

// Add event listener for when the user presses Enter to finish editing the li
listContainer.addEventListener("keydown", function(e) {
    if (e.target.tagName === "LI" && e.key === "Enter") {
        e.preventDefault(); // Prevents the default action of Enter key, which is to create a new line
        e.target.removeAttribute("contenteditable");
        savedata();
    }
});

function savedata(){
    localStorage.setItem("data",listContainer.innerHTML);
}





