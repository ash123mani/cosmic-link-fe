import {
  GET_SHARE_INBOX_REQUEST,
  GET_SHARE_INBOX_SUCCESS,
  GET_SHARE_INBOX_FAILURE,
  GET_SHARE_UNSEEN_COUNT_SUCCESS,
  MARK_SHARES_SEEN_SUCCESS,
  CREATE_SHARE_SUCCESS,
  MOVE_SHARE_SUCCESS,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  CREATE_SHARE_REQUEST,
  CREATE_SHARE_FAILURE,
} from '@state/constants/shares'

const initialState = {
  inbox: [],
  unseenCount: 0,
  isFetchingInbox: false,
  isSearchingUsers: false,
  isCreatingShare: false,
  searchedUsers: [],
}

const sharesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
  case GET_SHARE_INBOX_REQUEST:
    return {
      ...state,
      isFetchingInbox: true,
    }
  case GET_SHARE_INBOX_SUCCESS:
    return {
      ...state,
      isFetchingInbox: false,
      inbox: payload.shares || [],
      unseenCount: typeof payload.unseenCount === 'number' ? payload.unseenCount : state.unseenCount,
    }
  case GET_SHARE_INBOX_FAILURE:
    return {
      ...state,
      isFetchingInbox: false,
    }
  case GET_SHARE_UNSEEN_COUNT_SUCCESS:
    return {
      ...state,
      unseenCount: typeof payload.count === 'number' ? payload.count : state.unseenCount,
    }
  case MARK_SHARES_SEEN_SUCCESS: {
    const body = payload || {}
    let inbox = state.inbox
    let unseenCount = state.unseenCount

    if (body.all) {
      inbox = state.inbox.map((share) => ({ ...share, status: 'seen' }))
      unseenCount = 0
    } else if (Array.isArray(body.ids) && body.ids.length) {
      const idSet = new Set(body.ids.map(String))
      let changed = 0
      inbox = state.inbox.map((share) => {
        if (idSet.has(String(share.id)) && share.status === 'unseen') {
          changed += 1
          return { ...share, status: 'seen' }
        }
        return share
      })
      unseenCount = Math.max(0, unseenCount - changed)
    }

    return {
      ...state,
      inbox,
      unseenCount,
    }
  }
  case MOVE_SHARE_SUCCESS: {
    const moved = payload.share || payload
    const movedId = moved && moved.id
    const wasUnseen = state.inbox.some((s) => s.id === movedId && s.status === 'unseen')
    return {
      ...state,
      inbox: state.inbox.filter((s) => s.id !== movedId),
      unseenCount: wasUnseen ? Math.max(0, state.unseenCount - 1) : state.unseenCount,
    }
  }
  case SEARCH_USERS_REQUEST:
    return { ...state, isSearchingUsers: true }
  case SEARCH_USERS_SUCCESS:
    return { ...state, isSearchingUsers: false, searchedUsers: payload.users || [] }
  case SEARCH_USERS_FAILURE:
    return { ...state, isSearchingUsers: false, searchedUsers: [] }
  case CREATE_SHARE_REQUEST:
    return { ...state, isCreatingShare: true }
  case CREATE_SHARE_SUCCESS:
  case CREATE_SHARE_FAILURE:
    return { ...state, isCreatingShare: false }
  default:
    return state
  }
}

export default sharesReducer
