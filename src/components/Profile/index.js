import Cookies from 'js-cookie'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileData: []}

  componentDidMount() {
    this.getProfileData()
  }

  getFormattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})

    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = this.getFormattedData(data.profile_details)
      this.setState({
        profileData: profileDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#ffffff"
        height="50"
        width="50"
        className="loader"
      />
    </div>
  )

  renderProfile = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profileName">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    )
  }

  renderFailureProfileView = () => (
    <div className="failure-retry-container">
      <Link to="/jobs">
        <button type="button" className="retryButtonProfile">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailureProfileView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-image-display-container">
        {this.renderJobProfile()}
      </div>
    )
  }
}

export default Profile
