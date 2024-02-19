class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    // check is product exists in the cart:-
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = (item.quantity + 1) * product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    // if product is not exist in the cart array
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const oldQuantity = item.quantity;
      if (item.product.id === productId && newQuantity > 0) {
        item.quantity = newQuantity;
        item.totalPrice = item.product.price * newQuantity;

        this.totalQuantity += newQuantity - oldQuantity;
        this.totalPrice += (newQuantity - oldQuantity) * item.product.price;
        console.log(item.totalPrice)
        return { updatedItemPrice: item.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        this.items.splice(i, 1);

        this.totalQuantity = this.totalQuantity - oldQuantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
