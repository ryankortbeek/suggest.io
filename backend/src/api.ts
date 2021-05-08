export interface Event {
    id: number,
    name: string,
    image: string,
    description: string
}

export interface EventResponse {
    id: number;
    events: Event[];
}