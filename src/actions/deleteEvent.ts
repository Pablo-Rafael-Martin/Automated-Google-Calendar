import { calendar_v3 } from "googleapis";
import { envConfig } from "../envs/envConfig.js";
import { initGoogleCalendar } from "./initGoogleCalendar.js";
import { FunctionDeclaration, Type } from "@google/genai";

export const deleteEventDeclaration: FunctionDeclaration = {
    name: "deleteEvent",
    description:
        "Exclui um evento específico do Google Calendar. Esta função requer o 'eventId' (ID único) do evento a ser excluído. Para obter o 'eventId', utilize a função `getAllEvents()` para listar todos os eventos e identificar o desejado. **Importante:** Esta função pode ser utilizada de forma iterativa para excluir múltiplos eventos, inclusive todos os eventos da agenda do usuário, se combinada com `getAllEvents()` para obter e processar todos os IDs sequencialmente.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            eventId: {
                type: Type.STRING,
                description: "O ID do evento a ser excluído.",
            },
        },
        required: ["eventId"],
    },
};

export async function deleteEvent(eventId: string, calendar: calendar_v3.Calendar) {
    const deletedEvent = calendar.events.delete({
        calendarId: envConfig.calendarId,
        eventId: eventId,
    });

    return deletedEvent;
}
