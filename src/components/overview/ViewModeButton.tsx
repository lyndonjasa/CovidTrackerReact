import React from 'react';
import './ViewModeButton.scss';

type Props = {
  title: string;
  count: number;
  buttonClass: string;
  isActive: boolean;
  onClick?: () => void;
}

const ViewModeButton: React.FC<Props> = (props: Props) => {
  const { title, count, buttonClass, isActive, onClick } = props;

  return (
    <>
      <div onClick={onClick}
        className={`view-mode-button ${buttonClass} ${ isActive ? 'active' : '' }`}>
        <span className="view-mode-title">{title}</span>
        <div className="view-mode-count">
          {count}
        </div>
      </div>
    </>
  )
}

export default ViewModeButton;