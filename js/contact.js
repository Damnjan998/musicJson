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
        if(meni.naslov == "Contact"){
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

window.onload = function() {
    document.getElementById("btnPosalji").addEventListener("click", proveraKontakt);
}

    function proveraKontakt() {
        var nameContact = document.getElementById("tbIme");
        var emailContact = document.getElementById("tbFormaMail")
        var phoneContact = document.getElementById("tbMobilni");
        var textContact = document.getElementById("textContact");
    
        var reName = /^[A-Z][a-z]{1,11}(\s[A-Z][a-z]{1,11})+$/;
        var reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        var rePhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var reText = /^[a-zA-Z0-9_ ]{2,}$/;
        var greske = [];

    
        if(!reName.test(nameContact.value)) {
            nameContact.style.border = "3px solid red"
            document.getElementById("greskaName").style.visibility = "visible";
            greske.push(nameContact.value);
        } else {
            nameContact.style.border = "3px solid green"
        }
    
        if(!reEmail.test(emailContact.value)) {
            emailContact.style.border = "3px solid red"
            document.getElementById("greskaMail").style.visibility = "visible";
            greske.push(emailContact.value);
        } else {
            emailContact.style.border = "3px solid green"
        }
    
        if(!rePhone.test(phoneContact.value)) {
            phoneContact.style.border = "3px solid red"
            document.getElementById("greskaMobilni").style.visibility = "visible";
            greske.push(phoneContact.value);
        } else {
            phoneContact.style.border = "3px solid green"
        }
    
        if(!reText.test(textContact.value)) {
            textContact.style.border = "3px solid red"
            document.getElementById("greskaSubject").style.visibility = "visible";
            greske.push(textContact.value);
        } else {
            textContact.style.border = "3px solid green"
        }

        if(greske.length == 0){
            document.getElementById("porukaPoslata").style.visibility = "visible";
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