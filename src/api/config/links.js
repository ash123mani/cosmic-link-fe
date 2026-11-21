const links = {
  getLinkMeta: {
    endPoint: '/api/v1/link/meta',
    method: 'POST',
  },
  addLink: {
    endPoint: '/api/v1/link',
    method: 'POST',
    auth: true,
  },
  getLinks: {
    endPoint: '/api/v1/link',
    method: 'GET',
    auth: true,
  },
  deleteLink: {
    endPoint: '/api/v1/link',
    method: 'DELETE',
    auth: true,
  },
  updateLink: {
    endPoint: '/api/v1/link',
    method: 'PATCH',
    auth: true,
  },
}

export default links
