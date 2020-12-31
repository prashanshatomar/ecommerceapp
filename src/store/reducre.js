const reducer = function (
  state = {
    cart: [],
  },
  action
) {
  switch (action.type) {
    case "LOAD_CART": {
      let newCart = [...state.cart];
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        //item exist in the list
        let extrctItem = newCart.splice(index, 1);
        state = { ...state, cart: newCart };
        action.payload.quantity = extrctItem[0].quantity + 1; //increase quantity as item already in the list
      }
      // console.log("index  -> ", state.cart, action.payload);
      return { ...state, cart: [...state.cart, action.payload] };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
