export type CalendarEvent = {
  id: string;
  title: string;
  start: number;
  end: number;
};

export type EventsResponse = {
  events: CalendarEvent[];
};

export type OverlapGroups = {
  maxInRow: number;
  events: (CalendarEvent & {
    position: number;
  })[];
}[];
