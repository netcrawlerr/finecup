import { create } from "zustand";

const useStore = create((set, get) => ({
  products: [], 
  setProducts: (products) => set({ products }),

  selectedProduct: null,
  cart: [],


  setSelectedProduct: (productId) => {
    const product = get().products.find((p) => p._id === productId); 
    set({ selectedProduct: product });
  },

  clearSelectedProduct: () => set({ selectedProduct: null }),

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item._id === product._id); 
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity }] };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId), 
    }));
  },

  updateCartItemQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === productId 
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  placeOrder: (orderDetails) => {
    const state = get();
    const order = {
      items: state.cart,
      total: state.getCartTotal(),
      ...orderDetails,
    };

    console.log("Placing order:", order);
    set({ cart: [] });
    return order;
  },
}));

export default useStore;
