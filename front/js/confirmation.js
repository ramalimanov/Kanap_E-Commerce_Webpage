let orderId = document.getElementById("orderId");
function getOrderId() {
  let urlId = new URL(location.href).searchParams.get("orderId");
  orderId.innerHTML = urlId;
  localStorage.clear();
}
getOrderId();
