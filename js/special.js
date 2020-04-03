$(document).ready(function(){
    var podaciIzMeniJsona;
    var podaciIzKategorijeJson;
    var podaciIzProizvodJson;
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
        if(meni.naslov == "Specials"){
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
                    <a href="#" class = "filter-category" data-id="${kat.id}">${kat.naziv}</a>
                </li>`
    }

    function prikazKategorije(podaciIzKategorijeJson){
        var ispis = "";
        for(let kat of podaciIzKategorijeJson){
            ispis += ispisKategorije(kat);
        }

        document.getElementById("prikazKategorije").innerHTML = ispis;
        $('.filter-category').click(filtrirajPoKategoriji);
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

    $.ajax({
        url : "data/proizvodi.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzProizvodJson = data;
            prikazProizvoda(podaciIzProizvodJson);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisProizvoda(pro){
        return `<div class="grid_1_of_2 images_1_of_2">
        <a href="#"><img src="${pro.slika.src}" alt="${pro.slika.alt}" /></a>
         <a href="#"><h3>${pro.naslov}</h3></a>
      <span class="price"><sup>${pro.cena}</sup><sub>pm</sub></span>
       <div class="button"><span><a href="#" data-id=${pro.id} class="add-to-cart">${pro.dugme}</a></span></div>
   </div>`
    }

    function prikazProizvoda(podaciIzProizvodJson){
        var brojac = 0;
        var ispis = "<div class='section group example'>";
        for(let pro of podaciIzProizvodJson){
            if(brojac == 5){
                ispis += "<div class='section group example'>";
            }
            ispis += ispisProizvoda(pro);
            if(brojac == 4){
                ispis +="</div>";
            }
            brojac++;
        }
        ispis +="</div>";

        document.getElementById("prikazProizvoda").innerHTML = ispis;

        bindCartEvents();
    }

    document.getElementById("selectPrductSort").onchange = function(vrednost){
        var selektovan = vrednost.target.value;
        if(selektovan == 0) {
            prikazProizvoda(podaciIzProizvodJson);
        } else if(selektovan == 1){
            sortirajRastuce();
        } else if(selektovan == 2){
            sortirajOpadajuce();
        } else if(selektovan == 3){
            sortirajNazivRastuce();
        } else {
            sortirajNazivOpadajuce();
        }
    }

    function sortirajOpadajuce(){
        $.ajax({
            url : "data/proizvodi.json",
            method : "GET",
            dataType : "json",
            success : function(data){
                data.sort(function(a,b){
                    if(parseInt(a.cena) == parseInt(b.cena)){
                        return 0;
                    } else if(parseInt(a.cena) > parseInt(b.cena)){
                        return -1;
                    } else{
                        return 1;
                    }
                });
                prikazProizvoda(data);
            },
            error : function(xhr, status, error){
                console.log(error);
            }
        });
    }

    function sortirajRastuce(){
        $.ajax({
            url : "data/proizvodi.json",
            method : "GET",
            dataType : "json",
            success : function(data){
                data.sort(function(a,b){
                    if(parseInt(a.cena) == parseInt(b.cena)){
                        return 0;
                    } else if(parseInt(a.cena) > parseInt(b.cena)){
                        return 1;
                    } else{
                        return -1;
                    }
                });
                prikazProizvoda(data);
            },
            error : function(xhr, status, error){
                console.log(error);
            }
        });
    }

    function sortirajNazivOpadajuce(){
        $.ajax({
            url : "data/proizvodi.json",
            method : "GET",
            dataType : "json",
            success : function(data){
                data.sort(function(a,b){
                    if(a.naslov == b.naslov){
                        return 0;
                    } else if(a.naslov > b.naslov){
                        return -1;
                    } else{
                        return 1;
                    }
                });
                prikazProizvoda(data);
            },
            error : function(xhr, status, error){
                console.log(error);
            }
        });
    }

    function sortirajNazivRastuce(){
        $.ajax({
            url : "data/proizvodi.json",
            method : "GET",
            dataType : "json",
            success : function(data){
                data.sort(function(a,b){
                    if(a.naslov == b.naslov){
                        return 0;
                    } else if(a.naslov > b.naslov){
                        return 1;
                    } else{
                        return -1;
                    }
                });
                prikazProizvoda(data);
            },
            error : function(xhr, status, error){
                console.log(error);
            }
        });
    }

    function filtrirajPoKategoriji(e){
        e.preventDefault();
        const idKat = this.dataset.id;
        $.ajax({
            url : "data/proizvodi.json",
            method : "GET",
            dataType : "json",
            success : function(proizvod){
                proizvod = proizvod.filter(p=>p.katId == idKat);
                prikazProizvoda(proizvod);
            }
        })
    }

    function bindCartEvents() {
        $(".add-to-cart").click(addToCart);
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