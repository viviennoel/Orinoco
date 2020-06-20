
async function getProductList() {

    let response = await fetch('http://localhost:3000/api/cameras');

    if (response.ok) {
        let json = await response.json();
        console.log(json);
        console.log(json[0].name);

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
        for (let i = 0; i<json.length; i++) {
            productlist.push(new Product(json[i]._id, json[i].name, json[i].price, json[i].description, json[i].imageUrl))
            }

        console.log(productlist);
        console.log(productlist.length);

        var section = document.getElementById("products");

        for (let i = 0; i < productlist.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('productlist');

            var newLink = document.createElement('div');

            var newTitle = document.createElement('h2');
            newTitle.innerText = productlist[i].name;

            var newDescription = document.createElement('p');
            newDescription.classList.add('text-justify');
            newDescription.innerText = productlist[i].description;

            var newImage = document.createElement('img');
            newImage.classList.add('imageproduct');
            newImage.src = productlist[i].imageUrl;

            var newButton = document.createElement('a');
            newButton.classList.add('button');
            newButton.setAttribute("id", productlist[i].id);
            newButton.innerText = 'cHOOSE THIS OPTION';
            newButton.addEventListener("click", function getqueryParams() {

                let queryParams = new URLSearchParams(window.location.search);
                queryParams.set("id", productlist[i].id);
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

    } else {
        alert("HTTP-Error: " + response.status);
    }
}







async function getProductChoosen() {

    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    console.log(_id);

    let response = await fetch('http://localhost:3000/api/cameras'+'/'+_id);
    console.log(response);

    if (response.ok) {
        let Myproduct = await response.json();
        console.log(Myproduct);

        var section = document.getElementById("productchoosen");
        var newDiv = document.createElement('div');
        newDiv.classList.add('productlist');

        var newLink = document.createElement('div');


        var newTitle = document.createElement('h2');
        newTitle.innerText = Myproduct.name;

        var newDescription = document.createElement('p');
        newDescription.classList.add('text-justify');
        newDescription.innerText = Myproduct.description;

        var newImage = document.createElement('img');
        newImage.classList.add('imageproduct');
        newImage.src = Myproduct.imageUrl;


        newLink.append(newTitle);
        newLink.append(newDescription);
        newLink.append(newImage);
        section.append(newDiv);
        newDiv.append(newLink);

    } else {

        alert("HTTP-Error: " + response.status);
    }
}







    var inputOrder = document.getElementsByTagName("input");
    document.getElementById("submitorder").addEventListener("click", async function (e) {
        e.preventDefault();
        let contact = {

            firstName: inputOrder[0].value,
            lastName: inputOrder[1].value,
            address: inputOrder[2].value,
            city: inputOrder[3].value,
            email: inputOrder[4].value

        }

        console.log(contact);

        let products = [
            "5be1ef211c9d44000030b062", "5be1ef211c9d44000030b061"
        ];




        console.log(products);





        let order = { contact, products };

        console.log(order);






        console.log(products);



        let response = await fetch('http://localhost:3000/api/cameras/order', { method: "POST", headers: { 'Content-Type': "application/json" }, body: JSON.stringify(order) })

        let responseData = await response.json();
        console.log(responseData);



    })  













