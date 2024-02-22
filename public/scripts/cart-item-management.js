// update cart:-
const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartBadgeElement = document.querySelector(".nav-items .badge");
const cartTotalPriceElement = document.querySelector("#cart-total-price");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const newQuantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/item", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: newQuantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }); 
  } catch (error) {
    alert("Something wrong in update cart function!!!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong in update cart response!!!");
    return;
  }

  const responseData = await response.json();
  console.log(responseData.updatedCartData);

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement =
      form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPriceElement.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);
  cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
