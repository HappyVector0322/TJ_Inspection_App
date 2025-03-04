import React, { useState } from 'react';

const DateSelector = () => {
    const [date, setDate] = useState('');

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        // Convert the date from yyyy-mm-dd to mm/dd/yyyy
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = `${month}/${day}/${year}`;
        setDate(formattedDate);
    };

    return (
        <div>
            <input 
                type="date" 
                onChange={handleDateChange} 
            />
            <p>Selected Date: {date}</p>
        </div>
    );
};

export default DateSelector;