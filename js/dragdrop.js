function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {

    ev.preventDefault();

    let divCartUnit = document.createElement("div");
    let dateSpan = document.createElement('span')
    dateSpan.innerHTML = "Precio1";
    divCartUnit.appendChild(dateSpan);


    ev.target.appendChild(divCartUnit);

//    var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
}