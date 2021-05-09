import { EventError } from './api/events';

export type Event = {
  id: string;
  name: string;
  image: { uri: string };
  description: string;
  time_start?: string,
  time_end?: string,
  event_site_url?: string,
  category?: string
};
