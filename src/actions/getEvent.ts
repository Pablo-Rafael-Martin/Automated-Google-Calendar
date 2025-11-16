import { calendar_v3 } from "googleapis";
import { envConfig } from "../envs/envConfig.js";
import { initGoogleCalendar } from "./initGoogleCalendar.js";

export async function getEvent(eventId: string, calendar: calendar_v3.Calendar) {
    const specificEvent = await calendar.events.get({
        calendarId: envConfig.calendarId,
        eventId: eventId,
    });

    return specificEvent;
}
