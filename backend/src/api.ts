interface Event {
    id: number,
    name: string,
    image: string,
    description: string
}

export interface EventResponse {
    id: number;
    events: Event[];
}

export function getEvents() {

}

export function getMatchedEvents(userId: string) {

}

export function postMatch(eventId: string, isMatch: boolean) {

}