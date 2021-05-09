import { useState, useEffect } from 'react';
import {
  EventError,
  FETCH_ERROR,
  getMatchedEvents,
  NONE,
} from './api/events';
import { Event } from './types';

export interface IEventData {
  events: Event[];
  error: EventError;
}

// TODO:
// - make GET request on mount
// - should we remove events as we scroll?
export const useMatches = (userId: string | undefined): IEventData => {
  const [events, setEvents] = useState(new Array<Event>());
  const [error, setError] = useState<EventError>(NONE);
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (events.length == 0 && attempts < 10) {
      getMatchedEvents(userId)
        .then((resp) => {
          setEvents(
            resp.data.events.map((e) => {
              console.log(e)
              return {
                ...e,
                image: {
                  uri: e.image_url,
                },
              };
            })
          );
        })
        .catch((_err) => {
          setError(FETCH_ERROR);
          console.log('something went wrong :(');
        });
        setAttempts(attempts + 1);
        console.log(attempts);
    }
  });

  return { events, error };
};
