const updateOrderFormElements = document.querySelectorAll(
  ".order-actions form"
);

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);

  const newStatus = formData.get("status");
  const orderId = formData.get("orderid");
  const csrfToken = formData.get("_csrf");

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("order Management is not working well !!!");
    return;
  }

  if (!response.ok) {
    alert("order Management is not working well !!!");
    return;
  }

  // updating the dom:-

  const responseData = await response.json();

  const badgeElement = form.parentElement.parentElement.querySelector(".badge");
  badgeElement.textContent = responseData.newStatus.toUpperCase();
}

for (const orderForm of updateOrderFormElements) {
  orderForm.addEventListener("submit", updateOrder);
}
