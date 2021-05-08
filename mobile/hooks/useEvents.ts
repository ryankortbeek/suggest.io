import { useState, useEffect } from 'react';
import {
  getAllEvents,
  postMatch,
  IEvent,
  EventError,
  FETCH_ERROR,
  NONE,
  POST_ERROR,
} from './api/events';

export interface IEventData {
  events: IEvent[];
  error: EventError;
  handleSwipe: (userId: number, isMatch: boolean) => void;
}

// TODO:
// - make request on mount
// - make request when it's empty / triggered
// - handle if backend has no more events to show!!
export const useEvents = (userId: number): IEventData => {
  const [events, setEvents] = useState(new Array<IEvent>());
  const [error, setError] = useState<EventError>(NONE);

  useEffect(() => {
    if (events.length === 0) {
      getAllEvents()
        .then((resp) => {
          setEvents(resp.data.events);
        })
        .catch((_err) => {
          setError(FETCH_ERROR);
          console.log('something went wrong :(');
        });
    }
  }, [events]);

  // handles popping events from stack and making POST request
  const handleSwipe = (userId: number, isMatch: boolean) => {
    postMatch(userId, events[events.length - 1].id, isMatch)
      .then((_resp) => {
        events.pop();
      })
      .catch((_) => {
        setError(POST_ERROR);
        console.log('something went wrong :(');
      });
  };
  return { events, error, handleSwipe };
};
