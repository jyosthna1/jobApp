import './index.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showErrorMessage: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMessage: true, errorMessage: errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMessage, errorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="jobbyAppContainer">
        <div className="login">
          <form className="loginForm" onSubmit={this.onSubmitLoginForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
            <label htmlFor="username" className="usernameText">
              USERNAME
            </label>
            <input
              placeholder="username"
              type="text"
              className="input"
              value={username}
              id="username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="usernameText">
              PASSWORD
            </label>
            <input
              placeholder="password"
              type="password"
              className="input"
              value={password}
              id="password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
          {showErrorMessage && <p className="errorMess">*{errorMessage}</p>}
        </div>
      </div>
    )
  }
}

export default Login
