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

function getEvents() {

}

function getMatchedEvents(userId: string) {

}

function postMatch(eventId: string, isMatch: boolean) {

}