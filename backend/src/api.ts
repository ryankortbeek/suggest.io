import axios, { AxiosResponse } from 'axios';

interface IEvent {
    id: number,
    name: string,
    image: string,
    description: string
}

export interface IEventResponse {
    id: number;
    events: Event[];
}

export function getEvents() {

    const res = axios.get("https://api.yelp.com/v3/events?location=edmonton&limit=50&offset=50", {
        headers: {
          "Authorization": "Bearer "
        }
      })
      .then((response) => {
        const results: IEventResponse = {
          id: new Date().getTime(),
          events: response.data.events.map(({id, name, image_url, description})=>({id, name, image_url, description}))
        };
        return results;
        console.log(results);
      });
      return res;
  }

export function getMatchedEvents(userId: string) {

}
