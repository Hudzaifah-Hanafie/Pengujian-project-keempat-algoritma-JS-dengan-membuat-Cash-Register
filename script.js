let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const calculateChange = (cash) => {
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
  } else {
    let changeNeeded = cash - price;
    const currencyUnit = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1.0,
      FIVE: 5.0,
      TEN: 10.0,
      TWENTY: 20.0,
      "ONE HUNDRED": 100.0,
    };

    let change = [];

    let closed = false;
    let totalInDrawer = parseFloat(cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2));
    if (changeNeeded === totalInDrawer) {
      closed = true;
    }

    // loop from largest to smallest
    for (let i = cid.length - 1; i >= 0; i--) {
      const denom = cid[i][0];
      let amountInDrawer = cid[i][1];
      let value = currencyUnit[denom];
      let amountToGive = 0;

      while (changeNeeded >= value && amountInDrawer > 0) {
        changeNeeded = Math.round((changeNeeded - value) * 100) / 100;
        amountInDrawer -= value;
        amountToGive += value;
      }

      if (amountToGive > 0) {
        change.push([denom, amountToGive]);
      }
    }

    if (changeNeeded > 0) {
      changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    } else {
      if (closed) {
        changeDue.innerHTML = "<p>Status: CLOSED</p>";
      } else {
        changeDue.innerHTML = "<p>Status: OPEN</p>";
      }
      let changeLength = change.length - 1;
      while (changeLength >= 0) {
        changeDue.innerHTML += `<p>${change[changeLength][0]}: $${change[changeLength][1]}<p>`;
        changeLength--;
      }
    }
  }
};

purchaseBtn.addEventListener("click", () => {
  calculateChange(Number(cashInput.value));
});
