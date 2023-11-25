import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaEnvelope} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {details} = props
  const {
    employmentType,
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    id,
    packagePerAnnum,
  } = details

  return (
    <li className="jobListCard">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logoAndTitleContainer">
          <img
            src={companyLogoUrl}
            className="companyLogoUrl"
            alt="job details company logo"
          />
          <div className="typeAndRatingContainer">
            <h1 className="typeOfEngineer">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="locationContainer">
            <MdLocationOn className="locationLogo" />
            <p className="location">{location}</p>
            <FaEnvelope className="locationLogo" />
            <p className="location">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontalLineList" />
        <p className="descriptionText">Description</p>
        <p className="descriptionPara">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
