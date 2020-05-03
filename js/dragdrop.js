function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    let data = ev.dataTransfer.getData("text");
    console.log(data);
    let separador = "_";
    let limite    = 2;
    let product_id = data.split(separador, limite)[1];
    let prize = document.getElementById("prize_"+product_id).innerHTML;

    ev.preventDefault();

    let divCartUnit = document.createElement("div");
    let dateSpan = document.createElement('span')
    dateSpan.innerHTML = prize ;
    divCartUnit.appendChild(dateSpan);


    ev.target.appendChild(divCartUnit);

//    var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
}