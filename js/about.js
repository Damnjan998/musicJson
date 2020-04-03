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
        if(meni.naslov == "About"){
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