const users = {
  searchUsers: {
    endPoint: '/api/v1/users/search',
    method: 'GET',
    auth: true,
  },
  registerPushToken: {
    endPoint: '/api/v1/users/push-token',
    method: 'POST',
    auth: true,
  },
  unregisterPushToken: {
    endPoint: '/api/v1/users/push-token',
    method: 'DELETE',
    auth: true,
  },
}

export default users
