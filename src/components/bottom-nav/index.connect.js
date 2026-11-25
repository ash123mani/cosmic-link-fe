import { getShareUnseenCount } from '@state/selectors/shares'

export const mapStateToProps = (state) => ({
  unseenCount: getShareUnseenCount(state),
})
