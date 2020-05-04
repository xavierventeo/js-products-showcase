const getTotalAmountOfShoppingCartAfterEvent = ev => {
    let product_id = ev.dataTransfer.getData("text");
    let prize = document.getElementById("price_" + product_id).innerHTML;
    prize = prize.replace(",", ".");

    let currentAmount = document.getElementById("total_amount").innerHTML;
    currentAmount = currentAmount.replace(",", ".");

    let totalAmount = parseFloat(currentAmount) + parseFloat(prize);
    totalAmount = totalAmount.toString().replace(".", ",");
    return totalAmount;
}

const generateShoppingCartItem = ev => {
    let product_id = ev.dataTransfer.getData("text");
    let prize = document.getElementById("price_" + product_id).innerHTML;
    prize = prize.replace(",", ".");

    let currentAmount = document.getElementById("total_amount").innerHTML;
    currentAmount = currentAmount.replace(",", ".");

    let totalAmount = parseFloat(currentAmount) + parseFloat(prize);
    totalAmount = totalAmount.toString().replace(".", ",");
    return totalAmount;
}

const allowDrop = ev => {
    ev.preventDefault();
}
  
const drag = ev => {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
const drop = ev => {
    //Intentionally don't transfer the data dragged: the image
    //If we want to do that: Try with
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();

    totalAmount = getTotalAmountOfShoppingCartAfterEvent(ev);
    let divCartUnit = document.getElementById("total_amount");
    divCartUnit.innerHTML = totalAmount;

    let divItemForShoppingCart =  generateShoppingCartItem(ev);
    let divShoppingCart = document.getElementById("modal-shopping-cart-products");
    divShoppingCart.innerHTML = divItemForShoppingCart;
}