const linkItem = document.querySelector("#items");
/**
 * Connecting with API to bringe data recovery,
 * Greating showItems function
 */
const showItems = async function () {
  let response = await fetch("http://localhost:3000/api/products/");
  if (response.ok) {
    let data = await response.json();
    // Greting for of loop to add each products by one by.
    for (product of data) {
      linkItem.innerHTML += `<a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`;
    }
  } else {
    console.error("Product not found! ", response.status);
  }
};
showItems();
