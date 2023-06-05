const inputs = document.querySelectorAll(".input");
const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people__num");
const tipAmount = document.querySelector(".tip__amount-amount");
const totalAmount = document.querySelector(".total__amount-amount");
const tips = document.querySelectorAll(".list__el");
const customTip = document.querySelector("#custom");
const reset = document.querySelector(".reset");

let billAmount = 0,
  tipPercentage = 0,
  numPeople = 0;

// ADD CLASS ACTIVE TO TIP ON CLICK AND SAVE DISCOUNT % TO VARIABLE

tips.forEach((tip) => {
  tip.classList.remove("active");
  tip.addEventListener("click", () => {
    tips.forEach((tip) => tip.classList.remove("active"));
    tip.classList.toggle("active");
    tipPercentage = +tip.textContent.slice(0, -1);
    calculateTipAmount(billAmount, tipPercentage, numPeople);
  });
});

// CHANGE DISCOUNT % VALUE IF USER PUT ANY VALUE. IF NOT, DON'T CHANGE IT. IF USER DID INPUT and THEN REMOVED - RESET DISCOUNT.

customTip.addEventListener("blur", () => {
  if (customTip.value) {
    if (customTip.value > 50 || customTip.value < 0) {
      customTip.parentElement.querySelector(".discount__error").textContent =
        "Please input number between 1 and 50";
      customTip.style.borderColor = "#fa9884";
    } else if (!/^\d{1,2}$/.test(customTip.value)) {
      customTip.parentElement.querySelector(".discount__error").textContent =
        "Please input number between 1 and 50";
      customTip.style.borderColor = "#fa9884";
    } else {
      customTip.style.borderColor = "transparent";
      customTip.parentElement.querySelector(".discount__error").textContent =
        "";
      tipPercentage = +customTip.value;
      calculateTipAmount(billAmount, tipPercentage, numPeople);
      tips.forEach((tip) => tip.classList.remove("active"));
    }
  } else {
    customTip.style.borderColor = "transparent";
    customTip.parentElement.querySelector(".discount__error").textContent = "";
  }
});

// SHOW ERROR MSG IS INPUTS ARE EMPTY OR DON'T HAVE NUMBER (FORMAT 12.5 or 12.50, part after dot only 1 or 2 digits, before dot - as many as you want)

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (!input.value || +input.value === 0) {
      input.style.borderColor = "#fa9884";
      input.parentElement.querySelector(".error__text").textContent =
        "Can't be zero";
    } else if (
      !/^\d+\.*\d{1,2}$/.test(input.value) &&
      !/^\d{1}$/.test(input.value)
    ) {
      input.style.borderColor = "#fa9884";
      input.parentElement.querySelector(".error__text").textContent =
        "Must be digits or valid sum";
    } else {
      input.style.borderColor = "transparent";
      input.parentElement.querySelector(".error__text").textContent = "";
    }
  });
});

// ADD VALUE FROM BILL TO VARIABLE

billInput.addEventListener("blur", () => {
  billAmount = +billInput.value;
  calculateTipAmount(billAmount, tipPercentage, numPeople);
});

// ADD VALUE FROM PEOPLE TO VARIABLE

peopleInput.addEventListener("blur", () => {
  numPeople = +peopleInput.value;
  calculateTipAmount(billAmount, tipPercentage, numPeople);
});

function calculateTipAmount(bill, percentage, people) {
  if (bill === 0 || people === 0) {
    console.log("ERR");
    return;
  } else {
    console.log("SUCC");
    const personTip = (bill * percentage) / 100 / people;
    const personTotal = personTip + bill / people;

    tipAmount.textContent = `$${personTip.toFixed(2)}`;
    totalAmount.textContent = `$${personTotal.toFixed(2)}`;
  }
}

// RESET STUFF

reset.addEventListener("click", resetCalculator);

function resetCalculator() {
  billAmount = 0;
  tipPercentage = 0;
  numPeople = 0;

  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";

  inputs.forEach((input) => {
    input.value = "";
    input.style.borderColor = "transparent";
    input.parentElement.querySelector(".error__text").textContent = "";
    input.blur();
  });

  customTip.value = "";
  customTip.style.borderColor = "transparent";
  customTip.parentElement.querySelector(".discount__error").textContent = "";
  customTip.blur();

  tips.forEach((tip) => tip.classList.remove("active"));
}
