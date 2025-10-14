const cartSelectItem = document.querySelector("#cart__items");
let cart = JSON.parse(localStorage.getItem("Cart")) || [];
addInsertCart(true);

/**
 * Making addInsertCart function to get each item from localStorage.
 */
function addInsertCart(hasProduct) {
  const selectTotalQuantity = document.querySelector("#totalQuantity");
  const selectTotalPrice = document.querySelector("#totalPrice");

  let quantityTotal = 0;
  let priceTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    quantityTotal += product.quantity;
    priceTotal += product.quantity * product.price;
    if (hasProduct) {
      if (hasProduct) {
        fetchProduct(product._id).then((data) => {
          product.price = data.price;
          displayProduct(product);
        });
      }
    }
  }
  selectTotalPrice.innerHTML = priceTotal;
  selectTotalQuantity.innerHTML = quantityTotal;
}
function fetchProduct(id) {
  return new Promise((resolve) => {
    fetch("http://localhost:3000/api/products/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((product) => resolve(product));
  });
}

// ----- Calling API to bring all date from localStorage ----- //

function displayProduct(product) {
  const article = document.createElement("article");
  const imgContainer = document.createElement("div");
  const cartContent = document.createElement("div");
  const cartDescription = document.createElement("div");
  const cartSetting = document.createElement("div");
  const cartSettingQuantity = document.createElement("div");
  const cartDelete = document.createElement("div");
  const imgSrc = document.createElement("img");
  const cartName = document.createElement("h2");
  const cartColor = document.createElement("p");
  const cartPrice = document.createElement("p");
  const cartQuantity = document.createElement("p");
  const itemDelete = document.createElement("p");
  const qteItems = document.createElement("p");
  const qtyInput = document.createElement("input");

  console.log(product);

  qtyInput.addEventListener("change", () => {
    product.quantity = qtyInput.value;
    qteItems.textContent = "Qté : " + qtyInput.value;
    modQuantity(product.id, product.color, qtyInput.value);
    addInsertCart(false);
  });

  itemDelete.addEventListener("click", () => {
    deleteItem(product.id, product.color);
    article.remove();
    addInsertCart(false);
  });

  //Cotent
  cartName.textContent = product.name;
  cartColor.textContent = product.color;
  cartPrice.textContent = product.prce;
  qteItems.textContent = "Qté : " + product.quantity;

  //Setting atributes
  cartSettingQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", product._id);
  article.setAttribute("data-color", product.color);
  article.setAttribute("data-price", product.price);
  cartQuantity.setAttribute("value", product.quantity);
  imgContainer.setAttribute("class", "cart__item__img");
  cartContent.setAttribute("class", "cart__item__content");
  cartDescription.setAttribute("class", "cart__item__content__description");
  imgSrc.setAttribute("src", product.imageUrl);
  imgSrc.setAttribute("alt", product.altTxt);
  cartSetting.setAttribute("class", "cart__item__content__settings__delete");
  qtyInput.setAttribute("type", "number");
  qtyInput.setAttribute("class", "itemQuantity");
  qtyInput.setAttribute("name", "itemQuantity");
  qtyInput.setAttribute("min", "1");
  qtyInput.setAttribute("max", "100");
  qtyInput.setAttribute("value", product.quantity);
  cartDelete.setAttribute("class", "cart__item__content__settings__delete");
  itemDelete.setAttribute("class", "deleteItem");
  itemDelete.textContent = "Delete";

  //Appends

  cartDescription.appendChild(cartName);
  cartDescription.appendChild(cartColor);
  cartDescription.appendChild(cartPrice);
  imgContainer.appendChild(imgSrc);
  cartContent.appendChild(cartDescription);
  cartContent.appendChild(cartSetting);
  cartSetting.appendChild(cartSettingQuantity);
  cartSettingQuantity.appendChild(qteItems);
  cartSettingQuantity.appendChild(qtyInput);
  article.appendChild(imgContainer);
  article.appendChild(cartContent);
  cartSetting.appendChild(cartDelete);
  cartSelectItem.appendChild(article);
  cartDelete.appendChild(itemDelete);
  cartSetting.appendChild(cartDelete);
}

/**
 * Modifier and change total using change eventListener
 */
function modQuantity(id, colour, value) {
  const modifyQuantity = parseInt(value);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id && cart[i].color === colour) {
      cart[i].quantity = modifyQuantity;
      localStorage.setItem("Cart", JSON.stringify(cart));
      break;
    }
  }
}

/**
 * Using deleteItem function to delete item from cart
 */

function deleteItem(id, colour) {
  const newCart = cart.filter((it) => it.id !== id || it.color !== colour);
  cart = newCart;
  localStorage.setItem("Cart", JSON.stringify(cart));
  // addInsertCart();
}

//-----Form-------//
/**
 * Checking user information
 */

function checkFirstName() {
  let nameCheck = new RegExp("^[A-Za-z éèê-]+$");
  if (nameCheck.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Enter correct name please";
    return false;
  }
}

function checklastName() {
  let lastNameCheck = new RegExp("^[A-Za-z éèê-]+$");
  if (lastNameCheck.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Enter correct last name please";
    return false;
  }
}

function checkAddress() {
  let addressCheck = new RegExp("^([a-zA-z0-9/\\ ''(),-s]{2,255})$");
  if (addressCheck.test(address.value)) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Enter correct adress adress please";
    return false;
  }
}

function checkCity() {
  let cityCheck = new RegExp("^[A-Za-z éèê-]+$");
  if (cityCheck.test(city.value)) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Enter correct city name please";
    return false;
  }
}

function checkEmail() {
  let emailCheck = new RegExp(".+@.+..+");
  if (emailCheck.test(email.value)) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Enter correct mail please";
    return false;
  }
}

let firstName = document.querySelector("#firstName");
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

firstName.addEventListener("change", () => {
  checkFirstName();
});

let lastName = document.querySelector("#lastName");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

lastName.addEventListener("change", () => {
  checklastName();
});

let address = document.querySelector("#address");
let addressErrorMsg = document.querySelector("#addressErrorMsg");

address.addEventListener("change", () => {
  checkAddress();
});

let city = document.querySelector("#city");
let cityErrorMsg = document.querySelector("#cityErrorMsg");

city.addEventListener("change", () => {
  checkCity();
});

let email = document.querySelector("#email");
let emailErrorMsg = document.querySelector("#emailErrorMsg");

email.addEventListener("change", () => {
  checkEmail();
});

function submit() {
  let order = document.querySelector("#order");
  order.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      checkFirstName(firstName) &&
      checklastName(lastName) &&
      checkAddress(address) &&
      checkCity(city) &&
      checkEmail(email)
    ) {
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };
      let products = [];
      for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].id);
      }
      console.log(products);
      apiPost({
        contact,
        products,
      });
    } else {
    }
  });
}
submit();
async function apiPost(contact, products) {
  let res = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(contact, products),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    let data = await res.json();
    document.location.href = "confirmation.html?orderId=" + data.orderId;
  } else {
    console.error("Error: ", res.status);
  }
}
