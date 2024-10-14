export class FetchWithCache {
  constructor() {
    this.cache = new Map()
    this.pendingReqs = new Map()
  }

  async fetchWithCache(url, ttlInSecs) {
    if (this.cache.has(url)) {
      const { time, result } = this.cache.get(url)
      const isAlive = (Date.now() - time) <= ttlInSecs * 1000
      if (isAlive) {
        return result
      }
    }

    if (this.pendingReqs.has(url)) {
      return this.pendingReqs.get(url)
    }

    const request = fetch(url).then(async (res) => {
      const result = await res.json()
      this.cache.set(url, { result, time: Date.now() })
      this.pendingReqs.delete(url)
      return result
    }).catch((error) => {
      this.pendingReqs.delete(url)
      return error
    })

    this.pendingReqs.set(url, request)

    return request
  }
}

const apiWithCache = new FetchWithCache()

export async function fetchAPIWithCache(url) {
  return apiWithCache.fetchWithCache(url)
}
