import './index.css'

const TypeOfEmployment = props => {
  const {employmentType, onChangeEmploymentType} = props
  const {employmentTypeId, label} = employmentType

  const onChangeEmployment = event => {
    onChangeEmploymentType(event)
  }

  return (
    <li className="employeeTypeList">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onChangeEmployment}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="employmentType">
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmployment
