import { searchUsers, createShare } from '@state/actions/shares'
import { isSearchingUsers, isCreatingShare } from '@state/selectors/shares'

const mapStateToProps = (state) => ({
  isSearching: isSearchingUsers(state),
  isSending: isCreatingShare(state),
})

const actions = {
  searchUsers,
  createShare,
}

export { mapStateToProps, actions }
