import axios, {AxiosResponse} from 'axios';
import { time } from 'console';
import {getMatchedEventIds} from './db_handler';

interface IEvent {
    id: string,
    name: string,
    image_url: string,
    description: string,
    time_start?: string,
    time_end?: string,
    event_site_url?: string,
    category?: string
}

export interface IEventResponse {
    id: number;
    events: IEvent[];
}

const YELP_API_KEY = "1ivgB27DrOOF9NbyWW95E1w3eWxw1MD21uhjZaxI1jPXWaEn-m06uNVdvXVecLc9nt663pSNIdiHIyGYi-UMqBiIw0o_BPhTy50GUYhBMmWyfRNXnOYZurdy7LOWYHYx"

/**
 * Call inside .then handler, e.g.
 *   getEvents("53.53216861500475", "-113.57363822706881", "40000")
 *   .then((value) => {
 *      // handle return value here
 *   }, (reject) => {
 *      // handle rejection here
 *   })
 *   .catch((e) => {// handle error here})
 */
export function getEvents(latitude: string, longitude: string, radius: string) {
    const res = axios.get(
        `https://api.yelp.com/v3/events?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`, 
        {headers: {"Authorization": `Bearer ${YELP_API_KEY}`}}
    )
        .then((response) => {
            let all_events: IEvent[] = response.data.events.map(
                ({id, name, image_url, description, time_start, time_end, event_site_url, category}: IEvent) => ({
                    id, name, image_url, description, time_start, time_end, event_site_url, category
                })
            );
            let filtered_events = extractFutureEvents(all_events);
            console.log(`${filtered_events.length} events after extracting current/future events...`);
            if (filtered_events.length == 0) {
                return null;
            }
            const res: IEventResponse = {id: new Date().getTime(), events: filtered_events};
            return res;
        }, (rej) => {
            console.log(rej)
        })
        .catch((e) => console.log(e))
        .finally(() => {return null});
    return res;  
}

/**
 * Call inside .then handler, e.g.
 *   getMatchedEvents("8lzcBdjb0x4t1yev6DBl")
 *   .then((value) => {
 *      // handle return value here
 *   }, (reject) => {
 *      // handle rejection here
 *   })
 *   .catch((e) => {// handle error here})
 */
export function getMatchedEvents(userId: string) {
    // Function that gets array of event IDs for a given user ID
    const eventsArr = getMatchedEventIds(userId)
        .then((val: string[]) => {
            if (val == null) {
                return null;
            } else {
                // Map IDs to API endpoints then make request
                let eventIds = val.map(id => `https://api.yelp.com/v3/events/${id}`);
                // Format and return promise with results
                const res = axios.all(eventIds.map(url => axios.get(url, {headers: {"Authorization": `Bearer ${YELP_API_KEY}`}})))
                    .then(responseArr => {
                        const results = responseArr.map(({data})=>({data}));
                        return results;
                    }, (rej) => {
                        console.log(rej)
                    })
                    .catch((e) => console.log(e))
                    .finally(() => {return null});
                return res;
            }
        }, (rej) => {
            console.log(rej)
        })
        .catch((e) => console.log(e))
        .finally(() => {return null});
    return eventsArr; 
}

function extractFutureEvents(events: Array<IEvent>) {
    let futureEvents: Array<IEvent> = [];
    let now: Date = new Date();
    events.forEach((val, i, arr) => {
        // YYYY-MM-DDTHH:MM:SS+00:00
        let time_ref: string | undefined = (val.time_end != null) ? val.time_end : val.time_start;
        if (time_ref != null) {
            let event_time: Date = new Date();
            event_time.setUTCFullYear(+time_ref.substring(0,4));
            event_time.setUTCMonth(+time_ref.substring(5,7));
            event_time.setUTCDate(+time_ref.substring(8,10));
            event_time.setUTCHours(+time_ref.substring(11,13));
            event_time.setUTCMinutes(+time_ref.substring(14,16));
            event_time.setUTCSeconds(+time_ref.substring(17,19));
            if (event_time >= now) {
                futureEvents.push(val);
            }
        }
    });
    return futureEvents;
}
