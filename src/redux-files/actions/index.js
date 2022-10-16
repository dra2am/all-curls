export const addToCart = (id, qty) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      id,
      qty
    }
  }
}

export const deleteFromCart = (id) => {
  return {
    type: "DELETE_FROM_CART",
    payload: id
  }
}

export const userDataServer = (user) => {
  return {
    type: "SERVER_ACTION",
    payload: {
      user,
    },
  };
};

export const userDataClient = (user) => {
  return {
    type: "CLIENT_ACTION",
    payload: {
      user,
    },
  };
};

export const authUser = () => {
  return {
    type: "AUTH_USER",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
