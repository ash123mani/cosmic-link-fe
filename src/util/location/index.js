export const isLoginPage = (pathname = document.location.pathname) => /\/login$/.test(pathname)

export const isRegisterPage = (pathname = document.location.pathname) => /\/register$/.test(pathname)

export const isHomePage = (pathname = document.location.pathname) => /^\/$/.test(pathname)
