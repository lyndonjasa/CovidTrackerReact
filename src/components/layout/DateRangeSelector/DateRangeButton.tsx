import React from 'react';
import './DateRangeButton.scss';

type Props = {
  icon: string;
  text: string;
  selected: boolean;
  handleDateRangeClick: () => void;
};

const DateRangeButton: React.FC<Props> = (props: Props) => {
  const { icon, text, selected, handleDateRangeClick } = props;

  return (
    <>
      <div className={`date-range-button ${selected ? 'active' : ''}`} onClick={handleDateRangeClick}>
        <div className="date-range-icon" dangerouslySetInnerHTML={{ __html: icon }}></div>
        <div className="date-range-text">{text}</div>
      </div>
    </>
  );
}

export default DateRangeButton;