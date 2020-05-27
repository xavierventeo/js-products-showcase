var cartArray = [];

if (document.getElementById("shopping-cart")){
    let modal = document.getElementById("modal-container");
    let divShoppingCart = document.getElementById("shopping-cart");
    let span = document.getElementsByClassName("close")[0];
    let body = document.getElementsByTagName("body")[0];

    //Open the modal when click on the Shopping Cart in index.html
    divShoppingCart.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    //Close the modal
    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    //Enable to close the modal by clicking outside them
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}