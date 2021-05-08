import { useState, useEffect } from 'react';
import {
  EventError,
  FETCH_ERROR,
  getMatchedEvents,
  IEvent,
  NONE,
} from './api/events';

export interface IEventData {
  events: IEvent[];
  error: EventError;
}

// TODO:
// - make GET request on mount
// - should we remove events as we scroll?
export const useMatches = (userId: number): IEventData => {
  const [events, setEvents] = useState(new Array<IEvent>());
  const [error, setError] = useState<EventError>(NONE);

  useEffect(() => {
    getMatchedEvents(userId)
      .then((resp) => {
        setEvents([...events, ...resp.data.events]);
      })
      .catch((_err) => {
        setError(FETCH_ERROR);
        console.log('something went wrong :(');
      });
  });

  return { events, error };
};
