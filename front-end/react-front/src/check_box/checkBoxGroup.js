import React, { useState } from 'react';

const CheckboxGroup = () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    // ... more options
  ];
  
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        // 선택된 아이템 콘솔 출력
        console.log(event.target.value);
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((v) => v !== value));
    }
  };

  return (
    <div>
      {options.map(({ label, value }) => (
        <div key={value}>
          <label>
            <input
              type="checkbox"
              value={value}
              checked={checkedValues.includes(value)}
              onChange={handleCheckboxChange}
            />
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
