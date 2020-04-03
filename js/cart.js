$(document).ready(function(){
    var podaciIzMeniJsona;
    $.ajax({
        url : "data/meni.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzMeniJsona = data;
            prikazMenija(podaciIzMeniJsona);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisMenija(meni){
        return `<li>
						<a href="${meni.putanja}">${meni.naslov}</a>
				</li>`
    }

    function prikazMenija(podaciIzMeniJsona){
        var ispis = "";
        for(let meni of podaciIzMeniJsona){
            ispis += ispisMenija(meni);
        }
        document.getElementById("prikaz").innerHTML = ispis;
    }

    document.getElementById("tbDugme").addEventListener("click", proveriEmail);

    var email = document.getElementById("tbEmail");
    var reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    function proveriEmail(){
        if(reEmail.test(email.value)){
            email.style.border = "3px solid green"
        } else{
            email.style.border = "3px solid red"
        }
    }

    let products = productsInCart();
    
    if(products != null){
        if(!products.length){
            showEmptyCart();
        } else{
            displayCartData();
        }
    } else{
        showEmptyCart();
    }

    
});
function clearCart() {
    let products = productsInCart();
    if(products != null){
        if(products.length > 0){
            localStorage.removeItem("products");
            alert("You have successfully deleted the product.");
            displayCartData();
        } else{
            alert("You have not ordered any product.");
        }
    } else{
        alert("You have not ordered any product.");
    }    
}

function showEmptyCart() {
    document.getElementById("content").innerHTML = "<h1 class='prazno'>Your cart is empty!</h1>"
}

function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}
function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
function displayCartData() {
    let products = productsInCart();
    if(products == null){
        showEmptyCart();
        return;
    }
    
    $.ajax({
        url : "data/sviProizvodi.json",
        success : function(data) {
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                            
                }
                return false;
            });
            generateTable(data)
        }
    });
}
function generateTable(products) {

    if(products.length == 0){
        showEmptyCart();
        return;
    }

    let html = `
            <table class="timetable_sub">
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Base Price</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>`;
                
    for(let p of products) {
        html += generateTr(p);
    }

    html +=`    </tbody>
            </table>`;

    document.getElementById("content").innerHTML = html;

    function generateTr(p) {
       return  `<tr class="rem1">
        <td class="invert">${p.id}</td>
        <td class="invert-image">
            <a href="#">
                <img src="${p.slika.src}" style='height:100px' alt="${p.slika.alt}" class="img-responsive">
            </a>
        </td>
        <td class="invert">${p.naslov}</td>
        <td class="invert">${p.cena}</td>
        <td class="invert">${p.quantity}</td>
        <td class="invert">${parseInt(p.cena) * p.quantity}$</td>
        <td class="invert">
            <div class="rem">
                <button id="btnRemove" onclick='removeFromCart(${p.id})'>Remove</button>
            </div>
        </td>
    </tr>`
    }
}


