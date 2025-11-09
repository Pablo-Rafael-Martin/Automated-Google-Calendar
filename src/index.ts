// console.log("hello world");

import { createEvent } from "./actions/createEvent.js";
import { getAllEvents } from "./actions/getAllEvents.js";
import { initGoogleCalendar } from "./actions/initGoogleCalendar.js";
import { envConfig } from "./envs/envConfig.js";

// const allEvents = await getAllEvents();

// allEvents?.map((item) => {
//     console.log(item.summary);
// });

const eventCreated = await createEvent({
    params: {
        calendarId: envConfig.calendarId,
        requestBody: {
            start: {
                date: "2025-11-09",
            },
            end: {
                date: "2025-11-09",
            },
            summary: "testando createEvent (titulo)",
            description: "testando createEvent (description)",
        },
    },
});

console.log(eventCreated);
