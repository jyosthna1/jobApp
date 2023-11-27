import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaEnvelope} from 'react-icons/fa'
import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    rating,
    location,
    title,
  } = details

  return (
    <li className="similar-job-container">
      <div className="company-logo-role">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-details-company-logo"
        />
        <div className="type-and-rating-container">
          <h1 className="type-of-engineer">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-similar">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="locationContainer">
        <MdLocationOn className="locationLogo" />
        <p className="location">{location}</p>
        <FaEnvelope className="locationLogo" />
        <p className="location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
