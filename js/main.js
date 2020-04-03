$(document).ready(function(){
    var podaciIzMeniJsona;
    var podaciIzAlbumJson;
    var podaciIzSpecialJson;
    var podaciIzKategorijeJson;
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
        if(meni.naslov == "Home"){
            return `<li class = "active">
						<a href="${meni.putanja}">${meni.naslov}</a>
				</li>`
        }
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

    $.ajax({
        url : "data/albumi.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzAlbumJson = data;
            prikazProizvoda(podaciIzAlbumJson);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisProizvoda(pro){
        return `<div class="grid_1_of_3 images_1_of_3">
                    
                        <img src="${pro.slika.src}" alt="${pro.slika.alt}" />
                    
                    <a href="#">
                        <h3>${pro.naslov}</h3>
                    </a>
                    <span class="price">
                        <sup>${pro.cena}</sup>
                        <sub>pm</sub>
                    </span>
                    <div class="btn">
                        <a href="#" data-id=${pro.id} class="add-to-cart">${pro.dugme}</a>
                    </div>
                </div>`
    }

    function prikazProizvoda(podaciIzAlbumJson){
        var ispis = "";
        for(let pro of podaciIzAlbumJson){
            ispis += ispisProizvoda(pro);
        }

        document.getElementById("prikazProizvoda").innerHTML = ispis;
    }

    function bindCartEvents() {
        $(".add-to-cart").click(addToCart);
    }

    function productsInCart() {
        return JSON.parse(localStorage.getItem("products"));
    }

    function addToCart() {
        let id = $(this).data("id");
    
        var products = productsInCart();
    
        if(products) {
            if(productIsAlreadyInCart()) {
                updateQuantity();
            } else {
                addToLocalStorage()
            }
        } else {
            addFirstItemToLocalStorage();
        }
    
        alert("You have successfully added the product!");
    
        function productIsAlreadyInCart() {
            return products.filter(p => p.id == id).length;
        }
    
        function addToLocalStorage() {
            let products = productsInCart();
            products.push({
                id : id,
                quantity : 1
            });
            localStorage.setItem("products", JSON.stringify(products));
        }
    
        function updateQuantity() {
            let products = productsInCart();
            for(let i in products)
            {
                if(products[i].id == id) {
                    products[i].quantity++;
                    break;
                }      
            }
    
            localStorage.setItem("products", JSON.stringify(products));
        }
    
        
    
        function addFirstItemToLocalStorage() {
            let products = [];
            products[0] = {
                id : id,
                quantity : 1
            };
            localStorage.setItem("products", JSON.stringify(products));
        }
    }

    $.ajax({
        url : "data/special.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzSpecialJson = data;
            prikazSpecial(podaciIzSpecialJson);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisSpecial(special){
        return `<div class="grid_1_of_3 images_1_of_3">
                        <img src="${special.slika.src}" alt="${special.slika.alt}" />
                        <h3>${special.naslov}</h3>
                    <span class="price">
                        <sup>${special.cena}</sup>
                        <sub>pm</sub>
                    </span>
                    <div class="btn">
                        <a href="#" data-id=${special.id} class="add-to-cart">Add to Cart</a>
                    </div>
                </div>`
    }

    function prikazSpecial(podaciIzSpecialJson){
        var ispis = "";
        for(let pro of podaciIzSpecialJson){
            ispis += ispisSpecial(pro);
        }

        document.getElementById("prikazSpecial").innerHTML = ispis;

        bindCartEvents();
    }

    $.ajax({
        url : "data/kategorije.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzKategorijeJson = data;
            prikazKategorije(podaciIzKategorijeJson);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisKategorije(kat){
        return `<li class = 'kat'>
                    <a href="${kat.putanja}">${kat.naziv}</a>
                </li>`
    }

    function prikazKategorije(podaciIzKategorijeJson){
        var ispis = "";
        for(let kat of podaciIzKategorijeJson){
            ispis += ispisKategorije(kat);
        }

        document.getElementById("prikazKategorije").innerHTML = ispis;
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

});

function clearCart() {
    let products = productsInCart();
    if(products != null){
        if(products.length > 0){
            localStorage.removeItem("products");
            alert("You have successfully deleted the product.");
        } else{
            alert("You have not ordered any product.");
        }
    } else{
        alert("You have not ordered any product.");
    }    
}
function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}