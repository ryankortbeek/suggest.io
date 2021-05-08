import axios, { AxiosResponse } from 'axios';

interface IEvent {
    id: string,
    name: string,
    image_url: string,
    description: string
}

export interface IEventResponse {
    id: number;
    events: Event[];
}

// e.g.getEvents("53.53216861500475", "-113.57363822706881", "40000")
export function getEvents(latitude: string, longitude: string, radius: string) {

    const res = axios.get(`https://api.yelp.com/v3/events?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`, {
        headers: {
          "Authorization": "Bearer 1ivgB27DrOOF9NbyWW95E1w3eWxw1MD21uhjZaxI1jPXWaEn-m06uNVdvXVecLc9nt663pSNIdiHIyGYi-UMqBiIw0o_BPhTy50GUYhBMmWyfRNXnOYZurdy7LOWYHYx"
        }
      })
      .then((response) => {
        const results: IEventResponse = {
          id: new Date().getTime(),
          events: response.data.events.map(({id, name, image_url, description}: IEvent)=>({id, name, image_url, description}))
        };
        return results;
      });
      return res;
  }

export function getMatchedEvents(userId: string) {}