const getStorage = (type) => (type === 'local' ? localStorage : sessionStorage)

const setStorageItem = (type, key, value) => {
  const storageType = getStorage(type)
  const storageValue = JSON.stringify(value)
  storageType.setItem(key, storageValue)
}

const getStorageItem = (type, key) => {
  const storageType = getStorage(type)
  const storageValue = storageType.getItem(key)
  return JSON.parse(storageValue)
}

const removeStorageItem = (type, key) => {
  const storageType = getStorage(type)
  storageType.removeItem(key)
}

const clearStorage = (type) => {
  const storageType = getStorage(type)
  storageType.clear()
}

export {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearStorage,
}
