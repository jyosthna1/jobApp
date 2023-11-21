import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-page-details">
      <h1 className="head">Find The Job That Fits Your Life</h1>
      <p className="description">
        Millions of people are searching for jobs,salary information,company
        reviews.Find the job that fits your ability and potential.
      </p>
      <button type="button" className="findJobsButton">
        Find Jobs
      </button>
    </div>
  </div>
)

export default Home
