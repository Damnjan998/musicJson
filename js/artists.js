$(document).ready(function(){
    var podaciIzMeniJsona;
    var podaciIzKategorijeJson;    
    var podaciIzArtistJson;
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
        if(meni.naslov == "Artists"){
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

    $.ajax({
        url : "data/artists.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            podaciIzArtistJson = data;
            prikazArtist(podaciIzArtistJson);
        },
        error : function(xhr, status, error){
            console.log(error);
        }
    });

    function ispisArtist(izvo){
        return `<div class="image group">
                    <div class="grid images_3_of_1">
                        <img src="${izvo.slika.putanja}" alt="${izvo.slika.alt}">
                    </div>
                <div class="grid span_2_of_3">
                    <h3>${izvo.naslov}</h3>
                    <p>${izvo.opis}</p>
                </div>
                </div>`
    }

    function prikazArtist(podaciIzArtistJson){
        var ispis = "";
        for(let izvo of podaciIzArtistJson){
            ispis += ispisArtist(izvo);
        }

        document.getElementById("prikaziArtist").innerHTML = ispis;
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