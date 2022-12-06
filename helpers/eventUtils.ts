import { CalendarEvent, OverlapGroups } from "./types";
import { groupBy } from "lodash";

//TODO write proper doc
/**
 * The events are enriched with info about their position in case of overlap
 * The groups are enriched with info for the maximum number of overlapping events,
 * which helps to determine the size of each event in the group.
 */
export const groupByOverlaps = (events: CalendarEvent[]) => {
  if (events.length === 0) {
    return [];
  }

  const groupedByEvents = groupBy(events, "date");

  return Object.entries(groupedByEvents).map(([key, eventsInADate]) => {
    let eventsSorted = eventsInADate.sort((a, b) => a.start - b.start);
    let groups: OverlapGroups = [];

    eventsSorted.forEach((event) => {
      let lastGroupIndex = groups.length - 1;
      if (lastGroupIndex < 0) {
        startNewGroup(groups, event);
      } else {
        const overlaps = overlapInGroup(groups[lastGroupIndex].events, event);
        if (overlaps) {
          addInLastGroup(groups, event);
        } else {
          startNewGroup(groups, event);
        }
      }
    });
    return { date: key, groups: groups };
  });
};

const addInLastGroup = (groups: OverlapGroups, newEvent: CalendarEvent) => {
  const lastGroup = groups[groups.length - 1];
  const overlapingFromGroup = lastGroup.events.filter((addedEvent) =>
    overlapEvents(addedEvent, newEvent)
  );
  if (overlapingFromGroup.length + 1 > lastGroup.maxInRow) {
    lastGroup.maxInRow = overlapingFromGroup.length + 1;
  }
  //the condition is not needed, but put just in case.
  for (let i = 1; i <= overlapingFromGroup.length + 1; i++) {
    const positionExists = overlapingFromGroup.find(
      (overlappingEvent) => overlappingEvent.position === i
    );
    if (!positionExists) {
      lastGroup.events.push({
        ...newEvent,
        position: i,
      });
    }
  }
};

const startNewGroup = (groups: OverlapGroups, event: CalendarEvent) => {
  groups.push({
    maxInRow: 1,
    events: [
      {
        ...event,
        position: 1,
      },
    ],
  });
};

const overlapInGroup = (eventGroup: CalendarEvent[], event: CalendarEvent) => {
  return eventGroup.some((fromGroup) => overlapEvents(fromGroup, event));
};

const overlapEvents = (eventA: CalendarEvent, eventB: CalendarEvent) => {
  return (
    (eventA.start <= eventB.start && eventA.end > eventB.start) ||
    (eventB.start <= eventA.start && eventB.end > eventA.start)
  );
};
