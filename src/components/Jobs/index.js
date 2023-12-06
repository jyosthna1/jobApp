import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryCard from '../SalaryCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobSearch: '',
    employeeTypeSelected: [],
    salaryRangeSelected: '',
    jobData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {employeeTypeSelected, salaryRangeSelected, jobSearch} = this.state
    const employeeTypeSelectedAll = employeeTypeSelected.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeSelectedAll}&minimum_package=${salaryRangeSelected}&search=${jobSearch}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeEmploymentType = event => {
    const {employeeTypeSelected} = this.state
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          employeeTypeSelected: [
            ...prevState.employeeTypeSelected,
            event.target.value,
          ],
        }),
        this.getJobsData,
      )
    } else {
      const updatedData = employeeTypeSelected.filter(
        eachEmployee => eachEmployee !== event.target.value,
      )
      this.setState({employeeTypeSelected: updatedData}, this.getJobsData)
    }
    console.log(employeeTypeSelected)
  }

  onChangeSalaryRange = value => {
    this.setState({salaryRangeSelected: value}, this.getJobsData)
  }

  onChangeSearch = event => {
    this.setState({jobSearch: event.target.value}, this.getJobsData)
  }

  renderLoadingViewJob = () => (
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

  renderJob = () => {
    const {jobData} = this.state
    return (
      <>
        {jobData.length === 0 ? (
          <div className="no-jobs-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs"
            />
            <h1 className="no-jobs-head">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters
            </p>
          </div>
        ) : (
          <>
            <ul className="jobDetailsUnOrderList">
              {jobData.map(eachJobData => (
                <JobCard key={eachJobData.id} details={eachJobData} />
              ))}
            </ul>
            <ul className="jobDetailsUnOrderListSmall">
              {jobData.map(eachJobData => (
                <JobCard key={eachJobData.id} details={eachJobData} />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  renderFailureJobView = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="failure-head">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <Link to="/jobs">
          <button type="button" className="failure-button">
            Retry
          </button>
        </Link>
      </div>
      <div className="failure-container-small">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="failure-head">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <Link to="/jobs">
          <button type="button" className="failure-button">
            Retry
          </button>
        </Link>
      </div>
    </>
  )

  renderJobPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoadingViewJob()
      case apiStatusConstants.success:
        return this.renderJob()
      case apiStatusConstants.failure:
        return this.renderFailureJobView()
      default:
        return null
    }
  }

  render() {
    const {jobSearch} = this.state
    return (
      <div className="jobsContainer">
        <Header />
        <div className="jobData">
          <div>
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                value={jobSearch}
                className="searchBox"
                onChange={this.onChangeSearch}
              />
              <div>
                <AiOutlineSearch className="search-icon" />
              </div>
            </div>
            <div className="large-devices">{this.renderJobPage()}</div>
          </div>
          <div className="profileAndOptionsContainer">
            <Profile />
            <hr className="horizontalLine" />
            <h1 className="typesOfEmployment">Type Of Employment</h1>
            <ul className="unOrder">
              {employmentTypesList.map(eachEmploymentType => (
                <TypeOfEmployment
                  employmentType={eachEmploymentType}
                  key={eachEmploymentType.employmentTypeId}
                  onChangeEmploymentType={this.onChangeEmploymentType}
                />
              ))}
            </ul>
            <hr className="horizontalLine" />
            <h1 className="typesOfEmployment">Salary Range</h1>
            <ul className="unOrder">
              {salaryRangesList.map(salaryRange => (
                <SalaryCard
                  salaryDetails={salaryRange}
                  key={salaryRange.salaryRangeId}
                  onChangeSalaryRange={this.onChangeSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="small-devices">{this.renderJobPage()}</div>
        </div>
      </div>
    )
  }
}
export default Jobs
