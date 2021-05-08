import { EventError } from './api/events';

export type Event = {
  id: number;
  name: string;
  image: { uri: string };
  description: string;
};
