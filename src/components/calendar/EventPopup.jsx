import React from 'react';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';
import { Form, Icon, Input, DatePicker, TimePicker } from 'antd';
import '../shared/appLayout/styles/animation.scss';
import { FormField } from '../FormField';
import { PopupButtons } from './PopupButtons';

const EventPopup = ({ popupCoordinates, closePopup, popupShown, selectedEventId, eventName, eventTime, eventDate, form, onPropertyChange,
  createEvent, notes, deleteEvent }) => {

  const { validateFields } = form;

  const onEventDelete = eventId => {
    deleteEvent(eventId);
    closePopup();
  }

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (error) {
        return;
      }

      for (let key in values) {
        onPropertyChange(key, values[key])
      }

      createEvent(selectedEventId);
      closePopup();
    });
  };

  const disabledDates = (current) => current && current <= moment().endOf('day');

  return (
    <CSSTransition
      in={popupShown}
      timeout={400}
      classNames="animation__popup"
      unmountOnExit
    >
      <div
        className="calendar__popup"
        style={{ top: popupCoordinates.y, left: popupCoordinates.x }}
      >
        <div className="d-flex justify-content-end">
          <Icon type="close-circle" onClick={closePopup} />
        </div>
        <Form onSubmit={handleSubmit}>
          <FormField
            form={form}
            fieldName='eventName'
            value={eventName}
            content={
              <Input placeholder="Event Name" />
            }
            withValidation
          />
          <FormField
            form={form}
            fieldName='eventDate'
            value={eventDate ? moment(eventDate) : null}
            content={
              <DatePicker disabledDate={disabledDates} />
            }
            withValidation
          />
          <FormField
            form={form}
            fieldName='eventTime'
            value={eventTime ? moment(eventTime) : null}
            content={
              <TimePicker />
            }
            withValidation
          />
          <FormField
            form={form}
            fieldName='notes'
            value={notes}
            content={
              <Input placeholder="Notes" />
            }
            withValidation
          />
          {
            selectedEventId ?
              <PopupButtons
                onClose={() => onEventDelete(selectedEventId)}
                onSubmit={handleSubmit}
                closeText='discard'
                submitText='edit'
                toUpperCase
              /> :
              <PopupButtons
                onSubmit={handleSubmit}
                onClose={closePopup}
                closeText='Cancel'
                submitText='Save'
              />
          }
        </Form>
      </div>
    </CSSTransition>
  )
};

const withFormPopup = Form.create({ name: 'calendar_popup_form' })(EventPopup);

export { withFormPopup as EventPopup };