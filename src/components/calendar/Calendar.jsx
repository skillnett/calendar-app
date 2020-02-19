import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { actionCreators } from '../../store/calendar/calendarStore';
import { EventPopup } from './EventPopup';
import './Calendar.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'antd/dist/antd.css';

const DnDCalendar = withDragAndDrop(BigCalendar);
const localizer = momentLocalizer(moment);

const Calendar = ({ events, onEventDateChange, onPropertyChange, selectedEventId, eventName, eventDate, eventTime, notes, setInitialFields, 
  setEventInfo, createEvent, deleteEvent }) => {

  const [popupShown, setPopupShown] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState({ x: null, y: null });

  const closePopup = () => {
    setPopupShown(false);
    setInitialFields();
  }

  const showDetailsPopup = (event, target) => {

    if (popupShown) {
      closePopup();
      return;
    }
    else {
      const isCreatedEvent = !!event.id;
      if (isCreatedEvent) {
        setEventInfo(event.id);
      }

      if (target) {
        const bounds = target.getBoundingClientRect();
        const { x, y, width, height } = bounds;
        const coordX = x - (width / 2);
        const coordY = y + height + 20;

        setPopupCoordinates({ x: coordX, y: coordY });
        setPopupShown(!popupShown);
      }

      if (event.action === 'click') {
        const { x, y } = event.box;
        setPopupCoordinates({ x: x - 100, y: y + 20 })
        setPopupShown(!popupShown);
      }
    }
  }

  const eventPopupProps = {
    popupCoordinates, closePopup, popupShown, onPropertyChange, createEvent,
    eventName, eventDate, eventTime, notes, selectedEventId, deleteEvent
  };

  return (
    <div className="calendar">
      <EventPopup {...eventPopupProps} />
      <DnDCalendar
        onSelectSlot={showDetailsPopup}
        onEventResize={() => null}
        onSelectEvent={(event, { target }) => showDetailsPopup(event, target)}
        onEventDrop={onEventDateChange}
        style={{ height: "700px" }}
        defaultDate={new Date()}
        localizer={localizer}
        defaultView="month"
        events={events}
        selectable
      />
    </div>
  );
}

const connectedCalendar = connect(
  state => ({ ...state.calendar }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Calendar);

export { connectedCalendar as Calendar };