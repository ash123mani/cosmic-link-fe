import { getBannerData } from '@state/selectors/app'
import { removeAppBanner } from '@state/actions/app'

const mapStateToProps = (state) => {
  const banner = getBannerData(state)

  return {
    banner,
  }
}

const actions = { removeAppBanner }

export {
  mapStateToProps,
  actions,
}
