const coffees = [
  { name: "Brygg Kaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
];

function productsOfCoffee() {
  var select = document.getElementById("coffee");
  select.innerHTML = "";
  for (i = 0; i < coffees.length; i++) {
    let opt = document.createElement("option");
    opt.innerText = `${coffees[i].name} - ${countPrice(i)} kr`;
    opt.value = i;

    select.appendChild(opt);
  }
}

let transaction = [];
function addTransaction(id, amount) {
  const price = countPrice(id);
  const name = coffees[id].name;
  const sum = amount * price;
  transaction.push({ id, name, amount, price, sum });
  return;
}

function countPrice(id) {
  let price = coffees[id].price;
  const TotalSpent = getTotalSpent();
  if (TotalSpent >= 1000) {
    price = Math.ceil(price * 0.85);
  } else if (TotalSpent >= 500) {
    price = Math.ceil(price * 0.9);
  }
  return price;
}

function validation(checkCups) {
  const errorText = document.getElementById("antalError");
  if (checkCups < 0) {
    errorText.innerHTML = "Du har negativt antal";
    errorText.style.color = "red";
    return false;
  } else if (checkCups > 10) {
    errorText.innerHTML = "Du kan inte köpa mer än 10";
    errorText.style.color = "red";
    return false;
  } else {
    errorText.innerHTML = "";
    return true;
  }
}

function getTotalSpent() {
  let totalAmount = 0;
  transaction.forEach((item) => {
    totalAmount += item.sum;
  });
  return totalAmount;
}

function showTransactions() {
  const transactionInfo = document.createElement("p");
  const parentTransaction = document.getElementById("transaction");

  transaction.forEach((item) => {
    transactionInfo.innerHTML = `Du köpte ${item.amount} st 
                ${item.name} för ${item.price} 
                kr styck. Summa: ${item.sum}`;
    // parentTransaction.appendChild(transactionInfo);
    parentTransaction.prepend(transactionInfo);
    // parentTransaction.insertBefore(transactionInfo, parentTransaction.firstChild);
  });
}

const amountInfo = document.createElement("p");

function onBuyButtonClick() {
  const amountOfCups = document.getElementById("amountOfCups").value;
  const coffeeSort = document.getElementById("coffee").value;

  if (validation(amountOfCups)) {
    addTransaction(coffeeSort, amountOfCups);
    showTransactions();
  }

  productsOfCoffee();

  if (transaction.length >= 1) {
    const transactionHeader = document.getElementById("transactionHeader");
    transactionHeader.innerHTML = "Dina Transaktioner";
  }

  const parentAmount = document.getElementById("amount");
  amountInfo.innerHTML = `Du har handlat för ${getTotalSpent()}`;
  parentAmount.appendChild(amountInfo);

  console.log(transaction);
}
