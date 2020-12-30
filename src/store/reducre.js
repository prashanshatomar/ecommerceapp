const reducer = function (
  state = {
    cart: [],
  },
  action
) {
  switch (action.type) {
    case "LOAD_CART": {
      let cart = state.cart;
      cart.map((v) => {
        if (v._id === action.payload._id) {
          v.quatity = v.quatity + 1;
        }
      });
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
