const isLoginPage = (pathname = document.location.pathname) => /\/login$/.test(pathname)

const isRegisterPage = (pathname = document.location.pathname) => /\/register$/.test(pathname)

const isHomePage = (pathname = document.location.pathname) => /^\/$/.test(pathname)

export {
  isLoginPage,
  isRegisterPage,
  isHomePage,
}
