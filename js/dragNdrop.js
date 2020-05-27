var cartArray = [];


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


const removeItemFromShoppingCart = (elementRemove) => {
    console.log(elementRemove);
    let removedProductID = elementRemove.getAttribute('product_id');
    row = elementRemove.parentElement;
    row.parentElement.removeChild(row);


    cartArray = cartArray.filter(function (productID) {
        return productID !== removedProductID;
    });

    calcularTotal();
}


const calcularTotal = () => {
    let totalAmount = 0;
    let products = JSON.parse(productsJSON);

    for (let item of cartArray) {
        let product = products.filter(function(JSONItem) {
            return JSONItem['id'] == item;
        });
        totalAmount = (parseFloat(totalAmount) + parseFloat(product[0]['price'].replace(",", "."))).toFixed(2);
    }
    document.getElementById("total_amount").innerHTML = totalAmount;
    document.getElementById("total-shopping-cart").innerHTML = totalAmount;
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
        elementRemove.setAttribute('product_id', item);
        elementRemove.setAttribute("onclick",`removeItemFromShoppingCart(this)`);
        elementRemove.innerHTML = "🗑️";

        divRow.appendChild(elementProduct);
        divRow.appendChild(elementPrice);
        divRow.appendChild(elementRemove);

        $shoppingCart.appendChild(divRow);           
    });

    calcularTotal();
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

    addItemToShoppingCart(ev);    
}