let createCardProduct = (divShowCase, product) => {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "product-card");

    let divImage = document.createElement("div");
    divImage.setAttribute("class", "product-image");
    
    let elementImage = document.createElement("img");
    elementImage.setAttribute("id", product.id);
    elementImage.setAttribute("src", product.image);
    elementImage.setAttribute("alt", "Imagen del producto");
    elementImage.setAttribute("draggable", "true");
    elementImage.setAttribute("ondragstart", "drag(event)");
    divImage.appendChild(elementImage);

    let divProductDetails = document.createElement("div");
    divProductDetails.setAttribute("class", "product-details");

    let productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.innerHTML = product.name;

    let productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;

    let divPrice = document.createElement("div");
    divPrice.setAttribute("class", "product-price");
    let elementPrice = document.createElement("span");
    elementPrice.setAttribute("id", "price_" + product.id);
    elementPrice.innerHTML = product.price;
    let elementCurrency = document.createElement("span");
    elementCurrency.innerHTML = product.currency;

    divPrice.appendChild(elementPrice);
    divPrice.appendChild(elementCurrency);

    divProductDetails.appendChild(productName);
    divProductDetails.appendChild(productDescription);
    divProductDetails.appendChild(divPrice);

    divCard.appendChild(divImage);
    divCard.appendChild(divProductDetails);
    divShowCase.appendChild(divCard);
}

let products = JSON.parse(productsJSON);

let objectDivShowCase = document.getElementById("show-case");

for (const product of products) {
    createCardProduct(objectDivShowCase, product);
}