









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
        newDescription.classList.add('text-justify');
        newDescription.innerText = a[i].description;

        var newImage = document.createElement('img');
        newImage.classList.add('imageproduct');
        newImage.src = a[i].imageUrl;

        var newButton = document.createElement('a');
        newButton.classList.add('button');
        newButton.setAttribute("id", a[i].id);
        newButton.innerText = 'cHOOSE THIS OPTION';
        newButton.addEventListener("click", function getqueryParams() {

            //Insérer l'ID du produit sélectionné dans l'URL de destination par Query Parameters
            let queryParams = new URLSearchParams(window.location.search);
            queryParams.set("id", a[i].id);
            history.pushState(null, null, "?" + queryParams.toString());

            window.location.replace("confirmation.html" + "?" + queryParams.toString());
        });

        newLink.append(newTitle);
        newLink.append(newDescription);
        newLink.append(newImage);
        section.append(newDiv);
        newDiv.append(newLink);
        newDiv.append(newButton);
    }
}
//***********************************************************************************************************************************************************************************
