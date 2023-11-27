import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaEnvelope} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    keySkills: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getProductDetailsInfo()
  }

  getFormattedJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    lifeAtCompanyDescription: data.life_at_company.description,
    imageUrlLogo: data.life_at_company.image_url,
    title: data.title,
  })

  getProductDetailsInfo = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const jobDetails = this.getFormattedJobDetails(data.job_details)
      const keySkills = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const SimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        location: eachItem.location,
        title: eachItem.title,
      }))
      this.setState({jobDetails, keySkills, similarJobsData: SimilarJobs})
    }
  }

  render() {
    const {keySkills, jobDetails, similarJobsData} = this.state
    return (
      <div className="job-card-details-container">
        <Header />
        <div className="job-details-and-company">
          <div className="company-logo-role">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div className="type-and-rating-container">
              <h1 className="type-of-engineer">{jobDetails.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-container">
              <MdLocationOn className="location-logo" />
              <p className="location-text">{jobDetails.location}</p>
              <FaEnvelope className="location-logo" />
              <p className="location-text">{jobDetails.employmentType}</p>
            </div>
            <p className="package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line-list" />
          <div className="description-and-visit">
            <p className="type-of-engineer">Description</p>
            <div className="website-link-container">
              <p className="visit">Visit</p>
              <FiExternalLink className="link-icon" />
            </div>
          </div>
          <p className="job-description">{jobDetails.jobDescription}</p>
          <p className="type-of-engineer">Skills</p>
          <ul className="skills-container">
            {keySkills.map(eachKeySkill => (
              <li className="skill-list">
                <img
                  src={eachKeySkill.imageUrl}
                  alt={eachKeySkill.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachKeySkill.name}</p>
              </li>
            ))}
          </ul>
          <p className="type-of-engineer">Life At Company</p>
          <div className="description-image">
            <p className="job-description">
              {jobDetails.lifeAtCompanyDescription}
            </p>
            <img
              src={jobDetails.imageUrlLogo}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
          <p className="type-of-engineer">Similar Jobs</p>
          <ul className="similar-jobs-list-container">
            {similarJobsData.map(eachSimilarItem => (
              <SimilarJobCard
                details={eachSimilarItem}
                id={eachSimilarItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
