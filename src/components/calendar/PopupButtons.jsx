import React from 'react';
import cn from 'classnames';

export const PopupButtons = ({ onClose, onSubmit, closeText, submitText, toUpperCase }) => {
  const buttonClassName = 'calendar__popup__btn';
  return (
    <div className="d-flex justify-content-between mt-2">
      <button
        type="button"
        onClick={onClose}
        className={cn(buttonClassName, `${buttonClassName}--close`, toUpperCase && `${buttonClassName}--upper`)}
      >
        {closeText}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        className={cn(buttonClassName, toUpperCase && `${buttonClassName}--upper`)}
      >
        {submitText}
      </button>
    </div>
  )
}