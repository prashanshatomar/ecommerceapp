export function loadCart(data) {
  // console.log("---gdfgdfgdf ", data);
  return {
    type: "LOAD_CART",
    payload: data,
  };
}

export function addToCart(data) {
  return function (dispatch) {
    // console.log("============cart data===", data);
    return dispatch(loadCart(data));
  };
}
