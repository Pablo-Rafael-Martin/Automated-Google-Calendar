import { FunctionDeclaration } from "@google/genai";
import { envConfig } from "../envs/envConfig.js";
import { initGoogleCalendar } from "./initGoogleCalendar.js";
import { calendar_v3 } from "googleapis";

export const getAllEventsDeclaration: FunctionDeclaration = {
    name: "getAllEvents",
    description:
        "Busca e retorna uma lista completa de todos os eventos do Google Calendar do usuário, incluindo seus IDs, resumos, datas/horas e outros detalhes relevantes. Esta função é fundamental para visualizar a agenda completa, bem como para obter os IDs de eventos necessários para operações como exclusão ou alteração.",
    parameters: {
        type: undefined,
        properties: {},
        required: [],
    },
};

export async function getAllEvents(calendar: calendar_v3.Calendar) {
    const eventsList = await calendar.events.list({
        calendarId: envConfig.calendarId,
    });

    return eventsList.data.items;
}
