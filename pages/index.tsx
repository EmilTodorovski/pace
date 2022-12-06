import { useState } from "react";
import useSWR from "swr";
import { groupByOverlaps } from "../helpers/eventUtils";
import { EventsResponse } from "../helpers/types";
import styles from "./index.module.css";

const fetcher = (query: string) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Index() {
  const STARTING_HOUR = 6;
  const { data, error } = useSWR(
    "{ events { id, date, description, title, start, end } }",
    fetcher
  );
  const possibleDates = ["2022-01-01", "2022-01-02"];
  const [selectedDate, setSelectedDate] = useState(possibleDates[0]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //TODO this is no longer overlaps Groups, rename to show there is a date here
  const overlapGroups = groupByOverlaps((data as EventsResponse).events);

  //TODO this if no group exists
  const eventsForSelectedDate = overlapGroups.find(
    (group) => group.date === selectedDate
  )?.groups;
  console.log("eventsForSelectedDate", eventsForSelectedDate);

  //TODO write clearer, more step by step logic here. The lenght should be a const. Maybe move this in a util
  const hours = Array.from({ length: 12 }, (_, i) => ({
    label: `${i < 10 - STARTING_HOUR ? "0" : ""}${i + STARTING_HOUR}:00`,
    startOffset: i * 60,
  }));

  return (
    <div>
      <div>
        {possibleDates.map((date) => (
          <button
            onClick={() => {
              setSelectedDate(date);
            }}
          >
            Go to {date}
          </button>
        ))}
      </div>
      {eventsForSelectedDate.map((group) =>
        group.events.map((event) => {
          const leftPaddingPx = 50;
          const top = event.start - STARTING_HOUR * 60;
          const height = event.end - event.start;
          const left = `calc(( 100% - ${leftPaddingPx}px ) / ${
            group.maxInRow
          } * ${event.position - 1} + 50px)`;
          const width = `calc(( 100% - ${leftPaddingPx}px ) / ${group.maxInRow})`;
          return (
            <button
              onClick={() => {
                alert(event.description);
              }}
              className={styles.event}
              key={event.id}
              style={{ top, height, left, width }}
            >
              <div>{event.title}</div>
              <div>
                {event.start} - {event.end}
              </div>
            </button>
          );
        })
      )}
      {hours.map((hourLabel) => (
        <div
          className={styles.hourDivider}
          style={{
            top: hourLabel.startOffset,
          }}
        >
          <span>{hourLabel.label}</span>
        </div>
      ))}
    </div>
  );
}
