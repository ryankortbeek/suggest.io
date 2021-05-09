import { useState, useEffect } from 'react';
import {
  getAllEvents,
  postMatch,
  EventError,
  FETCH_ERROR,
  NONE,
  POST_ERROR,
} from './api/events';
import { Event } from './types';

export interface IEventData {
  events: Event[];
  error: EventError;
  handleSwipe: (userId: string, eventId: number, isMatch: boolean) => void;
}

// TODO:
// - make request on mount
// - make request when it's empty / triggered
// - handle if backend has no more events to show!!
export const useEvents = (
  userId: string,
  lat: string,
  lon: string,
  radius: string,
): IEventData => {
  const [events, setEvents] = useState(new Array<Event>());
  const [error, setError] = useState<EventError>(NONE);

  useEffect(() => {
    if (events.length === 0) {
      getAllEvents(userId, lat, lon, radius)
        .then((resp) => {
          setEvents(
            resp.data.events.map((e) => {
              return {
                ...e,
                image: {
                  uri: e.image,
                },
              };
            })
          );
        })
        .catch((_err) => {
          setError(FETCH_ERROR);
          console.log('something went wrong 1 :(');
        });
    }
  }, [events]);

  // handles popping events from stack and making POST request
  const handleSwipe = (userId: string, eventId: number, isMatch: boolean) => {
    postMatch(userId, eventId, isMatch)
      .then((_resp) => {
        events.pop();
        setError(POST_ERROR);
      })
      .catch((_) => {
        setError(POST_ERROR);
        console.log('something went wrong :(');
      });
  };
  return { events, error, handleSwipe };
};
