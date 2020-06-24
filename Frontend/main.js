//Declare the list of global variable to be used outside of the functions***********************************************************************************************************
var Panier = JSON.parse(window.localStorage.getItem('User1'));
if (Panier === null) {var Panier = []};

var ConfirmedOrders = JSON.parse(window.localStorage.getItem('ConfirmedOrdersUser1'));
if (ConfirmedOrders === null) {var ConfirmedOrders = []};
//*********************************************************************************************************************************************************************************













//FUNCTION PRODUCTLIST PAGE + creating productlist (Function productlist) + displaying the list (Fucnction insertlisthtml)***********************************************************
async function DisplayProductList() {
    let response = await fetch('http://localhost:3000/api/cameras');
    if (response.ok) {
        var json = await response.json();
        console.log(json);
        console.log(json[0].name);
        
        //create an array productlist containing all the camera
        productlist(json);

    } else {
    alert("HTTP-Error: " + response.status);
}
}
//*************************************************************************************************************************************************************************************


//Fucnction creating an array of all the caracteristics of the product called "productlist" *****************************************************************************************
function productlist(a) {
    class Product {
        constructor(id, name, price, description, imageUrl) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.description = description;
            this.imageUrl = imageUrl;
        }
    }

    var productlist = [];
    for (let i = 0; i < a.length; i++) {
        productlist.push(new Product(a[i]._id, a[i].name, a[i].price, a[i].description, a[i].imageUrl))
    }

    //display this productlist
    console.log(productlist);
    console.log(productlist.length);

    //Display the elements of productlist in HTML
    insertlisthtml(productlist);
}
//***********************************************************************************************************************************************************************************



//Function to display the content of the list on the page HTML***********************************************************************************************************************
function insertlisthtml(a) {
    let section = document.getElementById("products");

    for (let i = 0; i < a.length; i++) {

        //Create new HTML content for every product of the array

        var newDiv = document.createElement('div');
        newDiv.classList.add('productlist');

        var newLink = document.createElement('div');

        var newTitle = document.createElement('h2');
        newTitle.innerText = a[i].name;

        var newDescription = document.createElement('p');
        newDescription.classList.add('text-center');
        newDescription.innerText = a[i].description;

        var newPrice = document.createElement('p');
        newPrice.classList.add('priceproductslist');
        newPrice.innerText = "Price of the article: " + a[i].price/100 + '.' + a[i].price % 100;

        var newImage = document.createElement('img');
        newImage.classList.add('imageproduct');
        newImage.src = a[i].imageUrl;

        var newButton = document.createElement('a');
        newButton.classList.add('button');
        newButton.setAttribute("id", a[i].id);
        newButton.innerText = 'Select';
        newButton.addEventListener("click", function getqueryParams() {

            //Insérer l'ID du produit sélectionné dans l'URL de destination par Query Parameters
            let queryParams = new URLSearchParams(window.location.search);
            queryParams.set("id", a[i].id);
            history.pushState(null, null, "?" + queryParams.toString());

            window.location.replace("confirmation.html" + "?" + queryParams.toString());
        });

        newLink.append(newTitle);
        newLink.append(newDescription);
        newLink.append(newPrice);
        newLink.append(newImage);
        section.append(newDiv);
        newDiv.append(newLink);
        newDiv.append(newButton);
    }
}
//***********************************************************************************************************************************************************************************





















//FUNCTION PAGE CONFIRMATION PRODUCT - Afficher les informations du produit selectionné par l'utilisateur******************************************************************************
async function getProductChoosen() {

    //Récupérer l'ID du produit sélectionné par Query Parameter
    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    console.log(_id);

    //Récupérer les caractéristiques d'un produit particulier grace à son ID
    let response = await fetch('http://localhost:3000/api/cameras'+'/'+_id);
    console.log(response);

    if (response.ok) {

        let Myproduct = await response.json();
        console.log(Myproduct);

        //Créer du contenu HTML correspondant au produit sélectionné
        detailofproduct(Myproduct);

    } else {

        alert("HTTP-Error: " + response.status);
    }
}
//************************************************************************************************************************************************************************************







//Fuction to Display the details of a product*****************************************************************************************************************************************
function detailofproduct(a) {
    

    var section = document.getElementById("productchoosen");
    var newDiv = document.createElement('div');
    newDiv.classList.add('productlist');

    var newLink = document.createElement('div');

    var newTitle = document.createElement('h2');
    newTitle.innerText = a.name;

    var newDescription = document.createElement('p');
    newDescription.classList.add('text-center');
    newDescription.innerText = a.description;

    var newImage = document.createElement('img');
    newImage.classList.add('imageproduct');
    newImage.src = a.imageUrl;

    var newPrice = document.createElement('p');
    newPrice.classList.add('priceproductslist');
    newPrice.innerText = "Price of the article: " + a.price / 100 + '.' + a.price % 100;

    var newOptions = document.createElement('ul');
    newOptions.classList.add('priceproductslist-ul');
    newOptions.innerText = "Options available for this Item :"
    
    newLink.append(newTitle);
    newLink.append(newDescription);
    newLink.append(newImage);
    newLink.append(newPrice);
    section.append(newDiv);
    newDiv.append(newLink);
    newLink.append(newOptions);

    for (let i = 0; i < a.lenses.length; i++) {
        var newOptionItem = document.createElement('li');
        newOptionItem.innerText = a.lenses[i];
        newLink.append(newOptionItem);
    }
}
//************************************************************************************************************************************************************************************















//La fonction submitProduct() permet d'enregistrer un produit dans la base LocalHost (Panier)*****************************************************************************************
async function submitProduct() {

    //Récupérer l'ID du produit selectionné par Query Parameter
    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    console.log(_id);

    //Récupérer les caractéristiques d'un produit particulier grace à son ID
    let response = await fetch('http://localhost:3000/api/cameras' + '/' + _id);
    if (response.ok) {
        let Myproduct = await response.json();
        console.log(Myproduct);

        //Ajouter le produit à l'array Panier défini en dehors de la session.
        Panier.push(Myproduct);
        console.log(Panier);

        window.localStorage.setItem('User1', JSON.stringify(Panier));

        setTimeout(window.location.replace("panier.html"), 5000);

    } else {

        alert("HTTP-Error: " + response.status);
    }
}
//************************************************************************************************************************************************************************************





//La fonction confirmOrder() permet d'obtenir le numero d'order puis d'enregistrer tout cela dans localhost***************************************************************************
async function OrderPanier(e) {

    var inputOrder = document.getElementsByTagName("input");
    var contact = {
            firstName: inputOrder[0].value,
            lastName: inputOrder[1].value,
            address: inputOrder[2].value,
            city: inputOrder[3].value,
            email: inputOrder[4].value
    }
    console.log(contact);

    let ListofOrder = JSON.parse(window.localStorage.getItem('User1'));

    var products = [];
    for (let i = 0; i<ListofOrder.length; i++) {
            var _id =  products.push(ListofOrder[i]._id);
    }

    console.log(products);

    let order = { contact, products };

    console.log(order);

    let response = await fetch('http://localhost:3000/api/cameras/order', { method: "POST", headers: { 'Content-Type': "application/json" }, body: JSON.stringify(order) })

    let responseOrder = await response.json();
    console.log(responseOrder);

    //Ajouter le produit à l'array Panier défini en dehors de la session.
    ConfirmedOrders.push(responseOrder);
    console.log(ConfirmedOrders);

    window.localStorage.setItem('ConfirmedOrdersUser1', JSON.stringify(ConfirmedOrders));

    window.localStorage.removeItem('User1');

        setTimeout(window.location.replace("ConfirmationOrder.html"), 5000);
     
}
//*******************************************************************************************************************








//This function is used to display the confirmation that the order was well saved into the database ******************************************************************************
function confirmationOrder() {

    //Récupérer l'ID du produit sélectionné par Query Parameter
    let ConfirmOrder = JSON.parse(window.localStorage.getItem('ConfirmedOrdersUser1'));
    console.log(ConfirmOrder);

    let latestorder = ConfirmOrder.length - 1;
    console.log(latestorder);

    //Display the caractéristiques of this Order
    var section = document.getElementById("orderedproducts");
    var TotalPrice = 0;

    for (let i = 0; i < ConfirmOrder[latestorder].products.length; i++) {

        var TotalPrice = TotalPrice + ConfirmOrder[latestorder].products[i].price;

        //Create new HTML content for every product of the array
        let newDiv = document.createElement('div');
        newDiv.classList.add('productlist');

        let newLink = document.createElement('div');

        let newTitle = document.createElement('h2');
        newTitle.innerText = ConfirmOrder[latestorder].products[i].name;

        let newDescription = document.createElement('p');
        newDescription.classList.add('text-justify');
        newDescription.innerText = ConfirmOrder[latestorder].products[i].description;

        var newPrice = document.createElement('p');
        newPrice.classList.add('priceproductslist');
        newPrice.innerText = "Price of the article: " + ConfirmOrder[latestorder].products[i].price / 100 + '.' + ConfirmOrder[latestorder].products[i].price % 100;

        let newImage = document.createElement('img');
        newImage.classList.add('imageproduct');
        newImage.src = ConfirmOrder[latestorder].products[i].imageUrl;

        newLink.append(newTitle);
        newLink.append(newDescription);
        newLink.append(newPrice);
        newLink.append(newImage);
        section.append(newDiv);
        newDiv.append(newLink);

    }

    console.log(TotalPrice);
    TotalPriceEurosconfirm(TotalPrice);
}









//********************************************************************************************************************


function ClearAllOrder() {

    window.localStorage.removeItem('User1');

    setTimeout(window.location.replace("panier.html"), 5000);

}




//*********************************************************************************************************************

function DisplayPanier() {


    //Récupérer un tableau de tous les produits enregistrés dans LocalHost (Panier)
    let ListofOrder = JSON.parse(window.localStorage.getItem('User1'));
    console.log(ListofOrder);

    //display this productlist
    let section = document.getElementById("panierproducts");

    var TotalPrice = 0;

    for (let i = 0; i < ListofOrder.length; i++) {

        var TotalPrice = TotalPrice + ListofOrder[i].price;

        //Create new HTML content for every product of the array
        let newDiv = document.createElement('div');
        newDiv.classList.add('productlist');

        let newLink = document.createElement('div');

        let newTitle = document.createElement('h2');
        newTitle.innerText = ListofOrder[i].name;

        let newDescription = document.createElement('p');
        newDescription.classList.add('text-justify');
        newDescription.innerText = ListofOrder[i].description;

        var newPrice = document.createElement('p');
        newPrice.classList.add('priceproductslist');
        newPrice.innerText = "Price of the article: " + ListofOrder[i].price / 100 + '.' + ListofOrder[i].price % 100;

        let newImage = document.createElement('img');
        newImage.classList.add('imageproduct');
        newImage.src = ListofOrder[i].imageUrl;

        newLink.append(newTitle);
        newLink.append(newDescription);
        newLink.append(newPrice);
        newLink.append(newImage);
        section.append(newDiv);
        newDiv.append(newLink);
    
    }

console.log(TotalPrice);

TotalPriceEuros(TotalPrice);


}



function TotalPriceEuros(a) {
    
    var TotalPriceEuros = a / 100 + '.' + a % 100;
    console.log(TotalPriceEuros);

    DisplayTotalPriceEuros(TotalPriceEuros);
}


function DisplayTotalPriceEuros(b) {

let section = document.getElementById("pricetotal");

let newDiv = document.createElement('div');
    newDiv.classList.add('pricetotal');

        let newTitle = document.createElement('h3');
        newTitle.innerText = 'Total price: ' + b + ' Euros';

        section.append(newDiv);
        newDiv.append(newTitle);

}



function TotalPriceEurosconfirm(a) {

    var TotalPriceEuros = a / 100 + '.' + a % 100;
    console.log(TotalPriceEuros);

    DisplayTotalPriceEurosconfirm(TotalPriceEuros);
}


function DisplayTotalPriceEurosconfirm(b) {

    let section = document.getElementById("orderedproductsprice");

    let newDiv = document.createElement('div');
    newDiv.classList.add('pricetotal');

    let newTitle = document.createElement('h3');
    newTitle.innerText = 'You have paid in total: ' + b + ' Euros';

    section.append(newDiv);
    newDiv.append(newTitle);

}









