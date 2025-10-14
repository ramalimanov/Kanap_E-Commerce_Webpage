const urlId = new URL(location.href).searchParams.get("id");
const itemImg = document.querySelector(".item__img");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const posColor = document.querySelector("#colors");

/**
 * Greating showProduct function to connection urlId to get information from product API.
 */
async function showProduct() {
  const response = await fetch(`http://localhost:3000/api/products/${urlId}`);
  if (response.ok) {
    const data = await response.json();
    // Inserting data into HTML
    itemImg.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerHTML = data.name;
    price.innerHTML = data.price;
    description.innerHTML = data.description;
    for (data.color of data.colors) {
      posColor.innerHTML += `<option value="${data.color}">${data.color}</option>`;
    }
    populateStorage(data);
  } else {
    console.error("Populate error: ", response.status);
  }
}
showProduct();

// ----Adding product to the cart----//
/**
 * Making papulateStorage function and adding items to the cart woth using eventListener function.
 */
function populateStorage(data) {
  const btnAddCart = document.querySelector("#addToCart");
  btnAddCart.addEventListener("click", () => {
    const cartProduct = {
      _id: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      altTxt: data.altTxt,
      /* 
      Here I put comment to save price stay hidden and not show up on storage, because safety reasion.If doing uncomment " price: data.price," it will show item priice on localStorage.
      */
      //price: data.price,
      id: urlId,
      quantity: parseInt(document.querySelector("#quantity").value),
      color: posColor.value,
    };

    // If user put wrong infor it will give alart
    if (
      cartProduct.quantity <= 0 ||
      cartProduct.quantity > 100 ||
      cartProduct.color == ""
    ) {
      alert("Not aviable entering count or color on stock");
    } else {
      addProductStorage(cartProduct);
    }
  });
}

// ----- Adding product to the localStorage -----//

function addProductStorage(cartProduct) {
  const cart = JSON.parse(localStorage.getItem("Cart")) || [];
  // console.log(cart);

  for (let i = 0; i < cart.length; i++) {
    if (cartProduct.id === cart[i].id && cartProduct.color === cart[i].color) {
      cart[i].quantity += cartProduct.quantity;
      // console.log(cart);

      localStorage.setItem("Cart", JSON.stringify(cart));
      return;
    }
  }
  cart.push(cartProduct);
  localStorage.setItem("Cart", JSON.stringify(cart));
}
