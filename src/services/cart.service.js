import Cart from "../dao/mongo/models/cart.model.js";

export const getCartById = async (id) => {
  try {
    const cart = await Cart.findById(id).lean();
    return cart;
  } catch (error) {
    throw new Error(`Error fetching cart: ${error.message}`);
  }
};

export const updateCart = async (id, cartData) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, cartData, {
      new: true,
    });
    return updatedCart;
  } catch (error) {
    throw new Error(`Error updating cart: ${error.message}`);
  }
};
