const shares = {
  createShare: {
    endPoint: '/api/v1/shares',
    method: 'POST',
    auth: true,
  },
  getShareInbox: {
    endPoint: '/api/v1/shares/inbox',
    method: 'GET',
    auth: true,
  },
  getShareUnseenCount: {
    endPoint: '/api/v1/shares/unseen-count',
    method: 'GET',
    auth: true,
  },
  markSharesSeen: {
    endPoint: '/api/v1/shares/seen',
    method: 'PATCH',
    auth: true,
  },
  moveShare: {
    endPoint: '/api/v1/shares',
    method: 'PATCH',
    auth: true,
  },
}

export default shares
