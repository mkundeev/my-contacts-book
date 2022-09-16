export const getToken = state => state.currentUser.token;
export const getIsLoggedIn = state => state.currentUser.isLoggedIn;
export const getName = state => state.currentUser.user.name;
export const getEmail = state => state.currentUser.user.email;
