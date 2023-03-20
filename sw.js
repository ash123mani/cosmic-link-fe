window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service worker registered!')
    }).catch((error) => {
      console.warn('Error registering service worker:')
      console.warn(error)
    })
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    console.log('👍', 'beforeinstallprompt', event)
  })
})
