let radioButtons;
let persons;
let tillägg;
let nights;
let city;
let telephone;
let zipcode;
let campaign;

function init() {
    radioButtons = document.getElementsByName("roomType");
    persons = document.getElementsByName("persons")[0];
    tillägg = document.getElementsByName("addition");
    nights = document.getElementsByName("nights")[0];
    city = document.getElementById("city");
    telephone = document.getElementById("telephone");
    zipcode = document.getElementById("zipcode");
    campaign = document.getElementsByName("campaigncode")[0];

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener("click", checkIfFamilyRoom);
        radioButtons[i].addEventListener("click", calculateTotal);
    }

    for (let i = 0; i < tillägg.length; i++) {
        tillägg[i].addEventListener("change", calculateTotal);
    }

    nights.addEventListener("change", calculateTotal);
    city.addEventListener("input", bigLetters);
    telephone.addEventListener("change", checkTelephone);
    zipcode.addEventListener("change", checkZipcode);
    campaign.addEventListener("input", campaigncode);


    checkIfFamilyRoom();
    calculateTotal();

}

function checkIfFamilyRoom() {

    if (radioButtons[2].checked) {
        persons.disabled = false;
        persons.parentNode.style.color = "#000";
        tillägg[2].disabled = true;
        tillägg[2].parentNode.style.color = "#999";
    } else {
        persons.disabled = true;
        persons.parentNode.style.color = "#999";
        tillägg[2].disabled = false;
        tillägg[2].parentNode.style.color = "#000";
    }



}

function calculateTotal() {
    let roomPrice = 0;
    let additionsSum = 0;
    let nightsValue;

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            let delar = radioButtons[i].value.split(",");
            roomPrice = parseInt(delar[1]);
        }
    }

    for (let i = 0; i < tillägg.length; i++) {
        if (tillägg[i].checked) {
            let delar = tillägg[i].value.split(",");
            additionsSum += parseInt(delar[1]);
        }
    }

    nightsValue = parseInt(nights.value);

    let total = (roomPrice + additionsSum) * nightsValue;

    document.getElementById("totalCost").textContent = total;

}

function bigLetters() {
    city.value = city.value.toUpperCase();
}


function checkTelephone() {
    let mönster = /^0\d{3}[-\s/]?\d{3,8}$/;
    let meddelande = telephone.parentNode.nextElementSibling;


    if (mönster.test(telephone.value)) {
        telephone.style.backgroundColor = "#00FF00";
        meddelande.textContent = "";
    } else {
        telephone.style.backgroundColor = "#FF0000";
        meddelande.textContent = "Felaktigt format";

    }
}

function checkZipcode() {
    let mönster = /^\d{5}$/;
    let meddelande = zipcode.parentNode.nextElementSibling;


    if (mönster.test(zipcode.value)) {
        zipcode.style.backgroundColor = "#00FF00";
        meddelande.textContent = "";
    } else {
        zipcode.style.backgroundColor = "#FF0000";
        meddelande.textContent = "Felaktigt format";

    }
}

function campaigncode() {
    let mönster = /^[A-Z]{3}-\d{2}-[A-Z]\d$/i;

    if (mönster.test(campaign.value)) {
        campaign.style.backgroundColor = "#00FF00";
    } else if (campaign.value === "") {
        campaign.style.backgroundColor = "#FFFFFF";
    }
    else {
        campaign.style.backgroundColor = "#FF0000";
    }
}


    window.onload = init;