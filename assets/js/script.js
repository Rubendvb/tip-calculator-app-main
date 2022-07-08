const inputBill = document.getElementById("bill");
let btns = document.querySelectorAll(".containerTip--btns-btn");
const inputPeople = document.getElementById("people");
let inputCustom = document.querySelector(".btn-custom");
const tipAmount = document.getElementById("tipPerson");
const totalAmount = document.getElementById("totalPerson");
const btnReset = document.querySelector(".btn-reset");
let zeroBill = document.querySelector(".zeroBill");
let zeroPeople = document.querySelector(".zeroPeople");

function formatarValor(valor) {
  console.log(valor);

  valor = valor.replace(/[,.]/g, "");

  if (valor.length > 2) {
    valor = valor.replace(/([0-9]{2})$/g, ".$1");
  }

  // if (valor.length > 6) {
  //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  // }

  console.log(valor);
  inputBill.value = valor;
}

function calcTip(percentage) {
  let bill = parseFloat(inputBill.value);
  let people = parseFloat(inputPeople.value);
  percentage = parseInt(percentage);
  console.log(bill, percentage, people);

  let array = [];

  let tip = bill * (percentage / 100);
  let tipPerPerson = tip / people;
  let total = bill + tip;
  let totalPerPerson = total / people;

  if (isNaN(tipPerPerson) || isNaN(totalPerPerson)) {
    return;
  } else {
    array.push(tipPerPerson, totalPerPerson);
  }

  showOnScreen(array);
}

function showOnScreen(values) {
  console.log(values);

  tipAmount.innerHTML = `$${values[0].toFixed(2)}`;
  totalAmount.innerHTML = `$${values[1].toFixed(2)}`;
}

function validaInputZerado() {
  input1 = parseInt(inputBill.value);
  input2 = parseInt(inputPeople.value);

  if ((isNaN(input1) && isNaN(input2)) || input1 == 0 || input2 == 0) {
    zeroBill.style.display = "block";
    zeroPeople.style.display = "block";
    inputPeople.classList.add("input-person-invalid");
    inputBill.classList.add("input-person-invalid");
    return;
  } else if (input1 > 0 && isNaN(input2)) {
    inputBill.classList.remove("input-person-invalid");
    zeroBill.style.display = "none";
    inputPeople.classList.add("input-person-invalid");
    zeroPeople.style.display = "block";
    return;
  } else if (input2 > 0 && isNaN(input1)) {
    zeroBill.style.display = "block";
    inputPeople.classList.remove("input-person-invalid");
    zeroPeople.style.display = "none";
    inputBill.classList.add("input-person-invalid");
    return;
  } else {
    inputBill.classList.remove("input-person-invalid");
    inputPeople.classList.remove("input-person-invalid");
    zeroBill.style.display = "none";
    zeroPeople.style.display = "none";
  }
}

function stateHandle() {
  btnReset.disabled = true;

  if (inputPeople.value > 0 && inputBill.value > 0) {
    btnReset.disabled = false;
  }
}

function startingFunctions() {
  inputPeople.addEventListener("keyup", () => {
    stateHandle();
    validaInputZerado();
  });

  inputBill.addEventListener("keyup", () => {
    stateHandle();
    validaInputZerado();
    formatarValor(inputBill.value);
  });

  btns.forEach((btn) => {
    if (btn.classList.contains("btn-custom")) {
      btn.addEventListener("keyup", () => {
        calcTip(btn.value);
      });
    }
    btn.addEventListener("click", () => {
      // inputCustom.value = "";

      if (btn != inputCustom) {
        inputCustom.value = "";
      }

      validaInputZerado();
      calcTip(btn.value);

      inputPeople.addEventListener("keyup", () => {
        calcTip(btn.value);
      });

      inputBill.addEventListener("keyup", () => {
        calcTip(btn.value);
      });
    });
  });

  btnReset.addEventListener("click", () => {
    inputBill.value = "";
    inputPeople.value = "";
    tipAmount.innerHTML = "$0.00";
    totalAmount.innerHTML = "$0.00";
    inputCustom.value = "";
  });
}

startingFunctions();
