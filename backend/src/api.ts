import axios, {AxiosResponse} from 'axios';
import {getMatchedEventIds, getCategoryWeightings, DEFAULT_WEIGHTING} from './db_handler';

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
export function getEvents(userId: string, latitude: string, longitude: string, radius: string) {
    const res = axios.get(
        `https://api.yelp.com/v3/events?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50&sort_on=time_start`, 
        {headers: {"Authorization": `Bearer ${YELP_API_KEY}`}}
    )
        .then((response) => {
            let all_events: IEvent[] = response.data.events.map(
                ({id, name, image_url, description, time_start, time_end, event_site_url, category}: IEvent) => ({
                    id, name, image_url, description, time_start, time_end, event_site_url, category
                })
            );
            console.log(all_events);
            let filtered_events = extractFutureEvents(all_events);
            getCategoryWeightings(userId)
                .then((val) => {
                    filtered_events = orderEvents(filtered_events, val);
                    console.log(`${filtered_events.length} events after extracting current/future events...`);
                    if (filtered_events.length == 0) {
                        return null;
                    }
                    const res: IEventResponse = {id: new Date().getTime(), events: filtered_events};
                    return res;
                }, (rej) => {
                    console.log(rej);
                })
                .catch((e) => {console.log(e)})
                .finally(() => {return null})
        }, (rej) => {
            console.log(rej);
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
                        let allEvents: Array<IEvent> = [];
                        let allData = responseArr.map(({data}) => ({data}));
                        allData.forEach(event => {
                            let thisEvent: IEvent = {
                                id: event.data.id,
                                name: event.data.name,
                                description: event.data.description,
                                image_url: event.data.image_url,
                                time_start: event.data.time_start,
                                time_end: event.data.time_end,
                                event_site_url: event.data.event_site_url,
                                category: event.data.category
                            }
                            allEvents.push(thisEvent);
                        })
                        // let results: IEventResponse = {id: new Date().getTime(), events: extractFutureEvents(allEvents)};
                        let results: IEventResponse = {id: new Date().getTime(), events: allEvents};
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
            let event_time: Date = new Date(time_ref);
            if (event_time >= now) {
                futureEvents.push(val);
            }
        }
    });
    return futureEvents;
}

function orderEvents(events: Array<IEvent>, categoryWeights: Map<string, number>) {
    // finds available categories
    let categories = new Map<string, number>();
    events.forEach((val, ind, arr) => {
        if (val.category != null) {
            if (categories.has(val.category)) {
                let curr = categories.get(val.category);
                if (curr != null) {categories.set(val.category, curr + 1)}
            } else {
                categories.set(val.category, 1);
            }
        }
    });
    // calculate total weight over valid categories
    let totalWeight = 0;
    for (const key in categories.keys()) {
        // add to total weight (key will always be a valid category)
        let weight = categoryWeights.get(key);
        if (weight != null) {
            totalWeight += weight;
        } else {
            totalWeight += DEFAULT_WEIGHTING;
        }
    }
    // weighted sample over those categories and order accordingly
    let orderedEvents: Array<IEvent> = [];
    for (let i = 0; i < events.length; i++) {
        let rand = Math.floor(Math.random() * (totalWeight + 1));
        let lowerBound = 0;
        for (const key in categories.keys()) {
            let keyWeight = extractCategoryWeight(key, categoryWeights);
            if ((rand >= lowerBound) && (rand < lowerBound + keyWeight)) {
                for (let j = 0; j < events.length; j++) {
                    if (events[i].category == key) {
                        orderedEvents.push(events[i]);
                        events[i].category = 'obyrnes-luck-of-the-irish';
                        break;
                    }
                }
            }
            lowerBound += keyWeight;
        }
    }
    return orderedEvents;
}

function extractCategoryWeight(key: string, categoryWeights: Map<string, number>) {
    let weight = categoryWeights.get(key);
    if (weight != null) {
        return weight;
    }
    return DEFAULT_WEIGHTING;
}