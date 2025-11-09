import { envConfig } from "../envs/envConfig.js";
import { initGoogleCalendar } from "./initGoogleCalendar.js";

export async function getAllEvents() {
    const calendarPromise = initGoogleCalendar();

    const calendar = await calendarPromise;

    const eventsList = await calendar.events.list({
        calendarId: envConfig.calendarId,
    });

    return eventsList.data.items;
}
