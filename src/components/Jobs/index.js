import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'

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
    employeeTypeSelected: employmentTypesList[0].employmentTypeId,
    salaryRangeSelected: salaryRangesList[0].salaryRangeId,
    jobData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const url = 'https://apis.ccbp.in/jobs'
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
      this.setState({jobData: formattedData})
    }
  }

  onChangeEmploymentType = event => {
    this.setState({employeeTypeSelected: event.target.value})
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRangeSelected: event.target.value})
  }

  render() {
    const {
      apiStatus,
      jobSearch,
      employeeTypeSelected,
      salaryRangeSelected,
      jobData,
    } = this.state
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
              <AiOutlineSearch className="search-icon" />
            </div>
            <ul className="jobDetailsUnOrderList">
              {jobData.map(eachJobData => (
                <JobCard key={eachJobData.id} details={eachJobData} />
              ))}
            </ul>
          </div>
          <div className="profileAndOptionsContainer">
            <Profile />
            <hr className="horizontalLine" />
            <h1 className="typesOfEmployment">Types Of Employment</h1>
            <ul className="unOrder">
              {employmentTypesList.map(eachEmploymentType => (
                <li className="employeeTypeList">
                  <input
                    type="checkbox"
                    id={eachEmploymentType.employmentTypeId}
                    onChange={this.onChangeEmploymentType}
                    value={eachEmploymentType.label}
                  />
                  <label
                    htmlFor={eachEmploymentType.employmentTypeId}
                    className="employmentType"
                  >
                    {eachEmploymentType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="horizontalLine" />
            <ul className="unOrder">
              {salaryRangesList.map(salaryRange => (
                <li className="employeeTypeList">
                  <input
                    type="radio"
                    id={salaryRange.salaryRangeId}
                    value={salaryRange.label}
                    name="salaryRange"
                    onChange={this.onChangeSalaryRange}
                  />
                  <label
                    htmlFor={salaryRange.salaryRangeId}
                    className="employmentType"
                  >
                    {salaryRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <ul className="jobDetailsUnOrderListSmall">
            {jobData.map(eachJobData => (
              <JobCard key={eachJobData.id} details={eachJobData} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Jobs
