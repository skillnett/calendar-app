import { createReducer } from 'redux-create-reducer';
import moment from 'moment'

const onEventDateChangeType = 'CALENDAR_ON_EVENT_DATE_CHANGE';
const onPropertyChangeType = 'CALENDAR_ON_PROPERTY_CHANGE';
const setInitialFieldsType = 'CALENDAR_SET_INITIAL_FIELDS';
const createEventType = 'CALENDAR_CREATE_EVENT';
const setEventInfoType = 'CALENDAR_SET_EVENT_INFO';
const deleteEventType = 'CALENDAR_DELETE_EVENT';

const initialState = {
  events: [
    {
      start: new Date(),
      end: new Date(),
      title: "Gym",
      notes: '',
      id: 1
    },
    {
      start: new Date(2020, 1, 10, 15, 0),
      end: new Date(2020, 1, 10, 17, 0),
      title: "Chess",
      notes: '',
      id: 2
    },
    {
      start: new Date(),
      end: new Date(),
      title: "Work",
      notes: '',
      id: 3
    },
  ],
  eventName: '',
  eventDate: null,
  eventTime: null,
  selectedEventId: null,
  notes: ''
}

export const actionCreators = {

  onEventDateChange: ({ event, start, end }) => dispatch => dispatch({
    type: onEventDateChangeType,
    payload: { event, start, end }
  }),

  onPropertyChange: (property, value) => dispatch => dispatch({
    type: onPropertyChangeType,
    payload: { property, value }
  }),

  setInitialFields: () => dispatch => dispatch({
    type: setInitialFieldsType
  }),

  createEvent: selectedEventId => dispatch => dispatch({
    type: createEventType,
    payload: { selectedEventId }
  }),

  setEventInfo: id => dispatch => dispatch({
    type: setEventInfoType,
    payload: { id }
  }),

  deleteEvent: selectedEventId => dispatch => dispatch({
    type: deleteEventType,
    payload: { selectedEventId }
  })

}

export const reducer = createReducer(initialState, {

  [onEventDateChangeType]: (state, { payload }) => {
    const { event, start, end } = payload;
    let resizedEvent = state.events.find(({ id }) => id === event.id);
    resizedEvent.start = start;
    resizedEvent.end = end;
    return {
      ...state,
      events: state.events.map(event => event.id === resizedEvent.id ? { ...resizedEvent } : { ...event })
    }
  },

  [onPropertyChangeType]: (state, { payload }) => ({
    ...state,
    [payload.property]: payload.value
  }),

  [setInitialFieldsType]: state => ({
    ...state,
    eventName: '',
    eventDate: null,
    eventTime: null,
    selectedEventId: null,
    notes: ''
  }),

  [createEventType]: (state, { payload }) => {
    const selectedDate = moment(state.eventDate);
    const selectedTime = moment(state.eventTime);
    const eventDateTime = new Date(selectedDate.year(), selectedDate.month(), selectedDate.date(), selectedTime.hours(), selectedTime.minutes(), selectedTime.seconds());
    const event = {
      start: state.eventDate,
      end: moment(eventDateTime),
      title: state.eventName,
      notes: state.notes,
      id: new Date().getTime()
    }

    return {
      ...state,
      events: payload.selectedEventId ? state.events.map(e => payload.selectedEventId === e.id ? { ...event } : { ...e }) :
        [...state.events, { ...event }]
    }
  },

  [setEventInfoType]: (state, { payload }) => {
    const selectedEvent = state.events.find(({ id }) => id === payload.id);
    const { start, end, title, notes, id } = selectedEvent;
    return {
      ...state,
      eventName: title,
      eventDate: start,
      eventTime: end,
      selectedEventId: id,
      notes
    }
  },

  [deleteEventType]: (state, { payload }) => ({
    ...state,
    events: state.events.filter(({ id }) => id !== payload.selectedEventId)
  })

});