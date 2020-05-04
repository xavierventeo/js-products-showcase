const createContainerImage = (product) => {
    let divImage = document.createElement("div");
    divImage.setAttribute("class", "product-image");
    
    let elementImage = document.createElement("img");
    elementImage.setAttribute("id", product.id);
    elementImage.setAttribute("src", product.image);
    elementImage.setAttribute("alt", "Imagen del producto");
    elementImage.setAttribute("draggable", "true");
    elementImage.setAttribute("ondragstart", "drag(event)");
    divImage.appendChild(elementImage);

    return divImage;
}

const createContainerProductPrice = (product) => {
    let divPrice = document.createElement("div");
    divPrice.setAttribute("class", "product-price");
    let elementPrice = document.createElement("span");
    elementPrice.setAttribute("id", "price_" + product.id);
    elementPrice.innerHTML = product.price;
    let elementCurrency = document.createElement("span");
    elementCurrency.setAttribute("id", "currency_" + product.id);
    elementCurrency.innerHTML = product.currency;

    divPrice.appendChild(elementPrice);
    divPrice.appendChild(elementCurrency);

    return divPrice;
}

const createContainerProductDetails = (product) => {
    let divProductDetails = document.createElement("div");
    divProductDetails.setAttribute("class", "product-details");

    let productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.setAttribute("id", "name_" + product.id);
    productName.innerHTML = product.name;

    let productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;

    let divPrice = createContainerProductPrice(product);

    divProductDetails.appendChild(productName);
    divProductDetails.appendChild(productDescription);
    divProductDetails.appendChild(divPrice);

    return divProductDetails;
}

const createCardProduct = (product) => {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "product-card");

    let divImage = createContainerImage(product);
    let divProductDetails = createContainerProductDetails(product);

    divCard.appendChild(divImage);
    divCard.appendChild(divProductDetails);
    return divCard;
}

/* Load Products and render show case to index.html */
let products = JSON.parse(productsJSON);
let divShowCase = document.getElementById("show-case");

for (const product of products) {
    divShowCase.appendChild(createCardProduct(product));
}