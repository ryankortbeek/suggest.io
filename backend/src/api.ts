import axios, { AxiosResponse } from 'axios';
import { response } from 'express';
import { each } from 'jquery';

interface IEvent {
    id: string,
    name: string,
    image_url: string,
    description: string
}

export interface IEventResponse {
    id: number;
    events: IEvent[];
}

const YELP_API_KEY = "1ivgB27DrOOF9NbyWW95E1w3eWxw1MD21uhjZaxI1jPXWaEn-m06uNVdvXVecLc9nt663pSNIdiHIyGYi-UMqBiIw0o_BPhTy50GUYhBMmWyfRNXnOYZurdy7LOWYHYx"

// e.g.getEvents("53.53216861500475", "-113.57363822706881", "40000")
export function getEvents(latitude: string, longitude: string, radius: string) {

    const res = axios.get(`https://api.yelp.com/v3/events?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`, {
        headers: {
          "Authorization": `Bearer ${YELP_API_KEY}`
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

export function getMatchedEvents(userId: string) {

  // Function that gets array of event IDs for a given user ID
  let eventIds: string[] = ["edmonton-virtual-yelp-event-gourmai-dumplings-with-mai-nguyen", "edmonton-yelps-prohibition-party"].map(id => `https://api.yelp.com/v3/events/${id}`);
  console.log(eventIds);

  const res = axios.all(eventIds.map(url => axios.get(url, {headers: {"Authorization": `Bearer ${YELP_API_KEY}`}})))
    .then(responseArr => {
      const results = responseArr.map(({data})=>({data}));
      return results;
    });
  return res;
}

// getEvent("edmonton-virtual-yelp-event-gourmai-dumplings-with-mai-nguyen").then((val) => {
//   console.log(val)
// })

// getMatchedEvents("3005").then((val) => {
//   console.log(val);
// });