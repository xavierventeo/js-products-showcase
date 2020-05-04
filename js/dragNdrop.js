const generateShoppingCartItem = (ev, totalAmount) => {
    let product_id = ev.dataTransfer.getData("text");
    let price = document.getElementById("price_" + product_id).innerHTML;
    let name = document.getElementById("name_" + product_id).innerHTML;
    let currency = document.getElementById("currency_" + product_id).innerHTML;

    let table = document.getElementById("modal-shopping-cart-products");

    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    let elementName = document.createElement("span");
    elementName.setAttribute("class","product-name");
    elementName.innerHTML = name;
    cell1.appendChild(elementName);

    let elementPrice = document.createElement("span");
    elementPrice.setAttribute("class","product-price");
    elementPrice.innerHTML = price.toString() + currency;
    cell2.appendChild(elementPrice);

    let elementRemove = document.createElement("span");
    elementRemove.setAttribute("class","remove");
    elementRemove.setAttribute("title","Eliminar este producto de mi carrito");
    elementRemove.innerHTML = "×";
    cell3.appendChild(elementRemove);

    let itemTotalAmount = document.getElementById("total-shopping-cart");
    itemTotalAmount.innerHTML = totalAmount + currency;
}

const allowDrop = ev => {
    ev.preventDefault();
}


const getTotalAmountOfShoppingCartAfterEvent = ev => {
    let product_id = ev.dataTransfer.getData("text");
    let price = document.getElementById("price_" + product_id).innerHTML;
    prize = price.replace(",", ".");

    let currentAmount = document.getElementById("total_amount").innerHTML;
    currentAmount = currentAmount.replace(",", ".");

    let totalAmount = parseFloat(currentAmount) + parseFloat(prize);
    totalAmount = totalAmount.toString().replace(".", ",");
    return totalAmount;
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

    generateShoppingCartItem(ev, totalAmount);
}