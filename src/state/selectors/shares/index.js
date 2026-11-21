export const getShareInboxItems = (state) => state.shares.inbox || []
export const getShareUnseenCount = (state) => state.shares.unseenCount || 0
export const isShareInboxFetching = (state) => state.shares.isFetchingInbox
export const isSearchingUsers = (state) => state.shares.isSearchingUsers
export const isCreatingShare = (state) => state.shares.isCreatingShare

export const selectSearchedUsers = (state) => state.shares.searchedUsers || []
export const selectIsSearchingUsers = (state) => state.shares.isSearchingUsers
