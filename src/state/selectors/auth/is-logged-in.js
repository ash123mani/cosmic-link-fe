const isLoggedIn = (state) => {
  const isLoggedIn = !!state.auth.token

  return isLoggedIn
}

export default isLoggedIn
