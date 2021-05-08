import { useState, useEffect } from 'react';
import { getAllEvents, postMatch, IEvent } from './api/events';

export interface IEventData {
  events: IEvent[];
  handleSwipe: (isMatch: boolean) => void;
}

// TODO:
// - make request on mount
// - make request when it's empty / triggered
// - handle if backend has no more events to show!!
export const useEvents = (): IEventData => {
  const [events, setEvents] = useState(new Array<IEvent>());

  useEffect(() => {
    if (events.length === 0) {
      getAllEvents()
        .then((resp) => {
          setEvents(resp.data.events);
        })
        .catch((_err) => {
          // TODO: do some UI response
          console.log('something went wrong :(');
        });
    }
  }, [events]);

  // handles popping events from stack and making POST request
  const handleSwipe = (isMatch: boolean) => {
    postMatch(events[events.length - 1].id, isMatch)
      .then((_resp) => {
        events.pop();
      })
      .catch((_) => {
        // TODO: do some UI response
        console.log('something went wrong :(');
      });
  };
  return { events, handleSwipe };
};
