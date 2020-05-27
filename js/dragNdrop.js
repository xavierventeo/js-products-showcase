const removeProductFromShoppingCart = (elementRemove, productPrice) => {
    elementTD = elementRemove.parentElement;
    elementTR = elementTD.parentElement;

    document.getElementById("modal-shopping-cart-products").deleteRow(elementTR.rowIndex);

    let currentAmount = document.getElementById("total_amount").innerHTML;

    productPrice =  productPrice.replace(",", ".");
    currentAmount = currentAmount.replace(",", ".").replace(globalCurrency,"");

    let totalAmount = (parseFloat(currentAmount) - parseFloat(productPrice)).toFixed(2);
    totalAmount = totalAmount.toString().replace(".", ",")+globalCurrency;

    document.getElementById("total_amount").innerHTML = totalAmount;
    document.getElementById("total-shopping-cart").innerHTML = totalAmount;
}


const removeItemFromShoppingCart = (elementRemove, productPrice) => {
    console.log(elementRemove);
    row = elementRemove.parentElement;
    row.parentElement.removeChild(row);


/*


    document.getElementById("modal-shopping-cart-products").deleteRow(elementTR.rowIndex);
    let currentAmount = document.getElementById("total_amount").innerHTML;

    productPrice =  productPrice.replace(",", ".");
    currentAmount = currentAmount.replace(",", ".").replace(globalCurrency,"");

    let totalAmount = (parseFloat(currentAmount) - parseFloat(productPrice)).toFixed(2);
    totalAmount = totalAmount.toString().replace(".", ",")+globalCurrency;

    document.getElementById("total_amount").innerHTML = totalAmount;
    document.getElementById("total-shopping-cart").innerHTML = totalAmount;
*/
}

const addItemToShoppingCart = (ev) => {
    let product_id = ev.dataTransfer.getData("text");

    let $shoppingCart = document.getElementById("summary-shopping-cart");
    $shoppingCart.textContent = '';
    cartArray.push(product_id);
    let products = JSON.parse(productsJSON);

    let shoppingCartWithoutDuplicates = [...new Set(cartArray)];

    shoppingCartWithoutDuplicates.forEach(function (item) {
        let fullItem = products.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = cartArray.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);

        let divRow = document.createElement("div");
        divRow.setAttribute("class", "row");
        
        let elementProduct = document.createElement("span");
        elementProduct.textContent = `${fullItem[0]['name']}`;
        elementProduct.setAttribute("class", "column product-name");

        let elementPrice = document.createElement("span");
        elementPrice.textContent = `${numeroUnidadesItem} x ${fullItem[0]['price']}€`;
        elementPrice.setAttribute("class", "column product-price");

        let elementRemove = document.createElement("span");
        elementRemove.setAttribute("class","column");
        elementRemove.setAttribute("title","Eliminar este producto de mi carrito");
        elementRemove.setAttribute("onclick",`removeItemFromShoppingCart(this, "${fullItem[0]['price']}")`);
        elementRemove.innerHTML = "🗑️";

        divRow.appendChild(elementProduct);
        divRow.appendChild(elementPrice);
        divRow.appendChild(elementRemove);

        $shoppingCart.appendChild(divRow);           
    })
}

const generateShoppingCartItemAtModal = (ev, totalAmount) => {
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
    elementRemove.setAttribute("onclick",`removeProductFromShoppingCart(this, "${price.toString()}")`);

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
    price = price.replace(",", ".");

    let currentAmount = document.getElementById("total_amount").innerHTML;
    currentAmount = currentAmount.replace(",", ".");

    let totalAmount = parseFloat(currentAmount) + parseFloat(price);
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
    divCartUnit.innerHTML = totalAmount+globalCurrency;

    generateShoppingCartItemAtModal(ev, totalAmount);
    addItemToShoppingCart(ev);
}