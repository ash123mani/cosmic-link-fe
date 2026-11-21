import {
  getShareInbox, markSharesSeen, getShareUnseenCount, moveShare,
} from '@state/actions/shares'
import { getShareInboxItems, isShareInboxFetching, getShareUnseenCount as getUnseenCount } from '@state/selectors/shares'
import { getUserCategories } from '@state/selectors/auth'
import { setAppBanner } from '@state/actions/app'
import { getUserData } from '@state/actions/auth'

const mapStateToProps = (state) => ({
  shares: getShareInboxItems(state),
  isFetching: isShareInboxFetching(state),
  unseenCount: getUnseenCount(state),
  categories: getUserCategories(state),
})

const actions = {
  getShareInbox,
  markSharesSeen,
  getShareUnseenCount,
  moveShare,
  setAppBanner,
  getUserData,
}

export { mapStateToProps, actions }
