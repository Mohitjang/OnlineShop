const productDeleteButtonElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
//   alert(productId);

  //    now we want to send this data to our backend to delete this product from the database using ajax:-
  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("something went wrong!");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const productDeleteButtonElement of productDeleteButtonElements) {
  productDeleteButtonElement.addEventListener("click", deleteProduct);
}
