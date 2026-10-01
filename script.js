/*skapar och deklarerar variabler som jag senare ger värden i de olika funktionerna. Använder mig inte utav const eftersom 
alla mina variabler behöver hämtas en gång i init pga eventlistener och sedan igen i olika funktioner. Så det blev enklare
att göra globala variabler och hämta dom i init. */

let radioButtons;
let persons;
let tillägg;
let nights;
let city;
let telephone;
let zipcode;
let campaign;

/*Skapar min init funktion där jag ger mina variabler värden och hämtar dom från min html fil beroende på id eller namn. Anledningen till att jag 
använder [0] efter vissa är för att getElementsByName alltid returnerar en lista & jag har bara ett element per namn på några av dom.  
Jag skapar sedan två forloopar, en för radioknapparna och en för tillägg. Jag lägger på eventListener så att datorn lyssnar efter klick.
När användaren sedan klickar på någon av knapparna så anropas funktionerna som står skrivna. 
Jag bygger sedan addEventlistener på resterande element. Jag använder mig av de inbyggda funktionerna input & change. 
Change = triggas när förändringen är klar och redo. Tex skrivit klart texten.
Input = triggas direkt. Tex när man skriver staden man bor i, blir stora bokstäver direkt. 
Längst ner kallar jag på funktionerna som behöver köras direkt. */

function init() {
    radioButtons = document.getElementsByName("roomType");
    persons = document.getElementsByName("persons")[0];
    tillägg = document.getElementsByName("addition");
    nights = document.getElementsByName("nights")[0];
    city = document.getElementById("city");
    telephone = document.getElementById("telephone");
    zipcode = document.getElementById("zipcode");
    campaign = document.getElementsByName("campaigncode")[0];

    /*Börja räkna på 0 och loopa igenom radioknapparna utefter hur många som finns (radioButtons.length).
    Om ett klick sker så anropas funktionen. [i] används för att gå igenom alla radioknappar och koppla på eventListener.  */

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

/*När man valt rumstyp kommer man till denna funktion. Här säger jag att om man valt familjerum så öppnas rullistan där man kan välja personer 
och tillägget där man kan välja sjöutsikt stängs.
Om man inte väljer familjerum så kan man inte välja personer i rullistan, men man kan välja sjöutsikt. 
Så om man bockat i radioButtons[2](familjerum), så hämtar jag min "persons" som jag deklarerat och gett värde i init och sätter false på den. 
Detta för att den ska öppnas, jag ger den även en ny färg. 
Gör samma sak med tillägg[2] = sjöutsikt som jag deklarerat och gett ett värde i init. 
I else satsen så gör jag tvärtom, jag stänger rullistan och öppnar sjöutsikt.
Jag använder parentNode för att slippa ändra i HTML filen, så persons.parentNode ger mig möjlighet att ändra färgen på label. Detta eftersom
persons är barn till label. Så man går uppåt.*/

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

/* här beräknar jag kostnaden för hotellvistelsen beroende på vad man klickar i. Jag deklarerar 3 nya variabler och ger 2 av dom värden direkt. 
Jag börjar med att loopa igenom vilken radioButtons som är ikryssad (checked), eftersom varje rum har text, summa i sitt value i HTML filen
så behöver jag dela på texten, jag använder då split. Sedan tar jag ut summa med hjälp av parseInt och tar andra värdet [1]. 
Jag gör sedan samma sak på tilläggen, men där använder + innan likamed eftersom man kan välja flera. 
Sedan ger jag nätterna ett värde och gör om till en siffra. 
Sedan slår jag ihop summan och skriver ut det med hjälp av span i HTML filen. */


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

/* Tar hjälp av den inbyggda funktionen toUpperCase för att det ska bli stora bokstäver när man skriver in stad.*/
function bigLetters() {
    city.value = city.value.toUpperCase();
}


/*Dessa 3 funktioner nedanför bygger jag för att kunna bestämma vad användaren ska skriva in. Mer korrekt, jag säger hur användaren ska skriva. 
Jag bestämmer hur telefonnummer/postnummer och kampanjkoden ska skrivas med hjälp av reguljära uttryck. 
Jag börjar med att deklarera nya variabler och ger dom även värden direkt. 
I checkTelephone blir det reguljära uttrycket /^0\d{3}[-\s/]?\d{3,8}$/, som då betyder.
börja med 0 sedan 3 siffror till mellan 0-9, sen om du vill kan du använda bindestreck, mellanslag eller snedstreck 
sedan 3-8 siffror igen mellan 0-9 och avslutar med $.
Max 12 siffror i telefonnumret och minst 7.
Reguljära uttryck börjar alltid med / och avslutas med / i JavaScript. 
Jag väljer också att lägga ett meddelande och ändra färgen i rutan beroende på vad användaren skrivit in. I checkTelephone & checkZipcode
så använder jag change, vilket betyder att rutorna fylls med färg när användaren lämnat rutan. Till skillnad på campaignCode där jag använder
input så rutan fylls direkt. 
På både checkZipcode och checkTelephone så använder jag mig av ett blankt meddelande så att felmeddelandet försvinner när man väl skrivit rätt.
Jag använder mig av parentNode.nextElementSibling för att gå från barnet telephone, till föräldern label som sen letar efter ett syskon till sig själv, 
någon på samma nivå som sig själv, i detta läget då till den tomma <span> 
På campaignCode så ville jag att den röda färgen skulle försvinna om man tog bort texten man skrivit, därför en extra else if
i if funktionen som sätter tillbaka den vita färgen. */

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
    let mönster = /^\d{5}$/; // 5 siffror.
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
    //3 bokstäver ett bindestreck 2 siffror ett bindestreck 1 bokstav och en siffra. Avslutar med i för att man ska kunna använda båda stora och små bokstäver.
    let mönster = /^[A-Z]{3}-\d{2}-[A-Z]\d$/i; // 
    if (mönster.test(campaign.value)) {
        campaign.style.backgroundColor = "#00FF00";
    } else if (campaign.value === "") {
        campaign.style.backgroundColor = "#FFFFFF";
    }
    else {
        campaign.style.backgroundColor = "#FF0000";
    }
}


window.onload = init; // startar init funktionen. 