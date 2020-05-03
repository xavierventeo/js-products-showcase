function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    let product_id = ev.dataTransfer.getData("text");
    let prize = document.getElementById("prize_" + product_id).innerHTML;
    prize = prize.replace(",", ".");

    let currentAmount = document.getElementById("total_amount").innerHTML;
    currentAmount = currentAmount.replace(",", ".");

    let totalAmount = parseFloat(currentAmount) + parseFloat(prize);
    totalAmount = totalAmount.toString().replace(".", ",");

    ev.preventDefault();

    let divCartUnit = document.getElementById("total_amount");
    divCartUnit.innerHTML = totalAmount;


//    var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
}