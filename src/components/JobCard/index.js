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
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobListCard">
        <div className="logoAndTitleContainer">
          <img
            src={companyLogoUrl}
            className="companyLogoUrl"
            alt="company logo"
          />
          <div className="typeAndRatingContainer">
            <h className="typeOfEngineer">{title}</h>
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
        <h1 className="descriptionText">Description</h1>
        <p className="descriptionPara">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
