const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

// add all the countries' currency codes to the "To" and "From" dropdown menus
for(let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(select.name === 'from' && currencyCode === 'USD') {
            newOption.selected = "selected";
        }
        if(select.name === 'to' && currencyCode === 'INR') {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newFlagSrc;
}

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    // access  the user input
    let amount = document.querySelector(".amount input");
    let value = amount.value;

    // validate input
    if(value === "" || value < 1) {
        value = 1; 
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await(fetch(URL));
    let data = await response.json();
    let fromData = fromCurr.value.toLowerCase();
    let toData = toCurr.value.toLowerCase()
    let exchangeRate = data[fromData][toData];

    message.innerText = `${value} ${fromCurr.value} = ${exchangeRate * value} ${toCurr.value}`
})