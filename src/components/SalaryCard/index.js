import './index.css'

const SalaryCard = props => {
  const {salaryDetails, onChangeSalaryRange} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalaryValue = event => {
    onChangeSalaryRange(event.target.value)
  }

  return (
    <li className="employeeTypeList">
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        name="salaryRange"
        onChange={onChangeSalaryValue}
      />
      <label htmlFor={salaryRangeId} className="employmentType">
        {label}
      </label>
    </li>
  )
}

export default SalaryCard
