import { calendar_v3 } from "googleapis";
import { envConfig } from "../envs/envConfig.js";
import { getEvent } from "./getEvent.js";
import { initGoogleCalendar } from "./initGoogleCalendar.js";
import { FunctionDeclaration, Type } from "@google/genai";

export const patchEventDeclaration: FunctionDeclaration = {
    name: "patchEvent",
    description:
        "Altera campos específicos de um evento existente no Google Calendar. Requer o 'eventId' do evento a ser modificado e um objeto 'patchParams'. Este objeto deve conter **APENAS** os campos do evento que você deseja atualizar; campos não especificados em 'patchParams' permanecerão inalterados. Para obter o 'eventId', utilize a função `getAllEvents()` para listar e identificar o evento.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            eventId: {
                type: Type.STRING,
                description: "O ID do evento a ser alterado.",
            },
            patchParams: {
                type: Type.OBJECT,
                description: "Um objeto contendo os campos do evento a serem atualizados.",
                properties: {
                    summary: {
                        type: Type.STRING,
                        description: "O título ou resumo do evento.",
                    },
                    description: {
                        type: Type.STRING,
                        description: "Uma descrição detalhada do evento.",
                    },
                    location: {
                        type: Type.STRING,
                        description: "O local onde o evento ocorrerá.",
                    },
                    start: {
                        type: Type.OBJECT,
                        description:
                            "A data/hora de início do evento. Deve conter 'dateTime' OU 'date'. - Para eventos com hora marcada, utilize 'dateTime' no formato ISO (ex: '2023-10-31T09:00:00-03:00'), sendo **obrigatório** incluir o offset do fuso horário (padrão -03:00 para Londrina PR, a menos que especificado o contrário). Para eventos de dia inteiro, utilize 'date' no formato 'AAAA-MM-DD'. Importante: para eventos de dia inteiro, a 'date' de término ('end') deve ser o dia **SEGUINTE** ao último dia do evento.",
                        properties: {
                            dateTime: {
                                type: Type.STRING,
                                description:
                                    "A data e hora de início no formato ISO (ex: '2023-10-31T09:00:00-03:00'). Use para eventos com hora marcada. É obrigatório ter o timezone no final. Como moro em Londrina PR, é sempre -3:00 a não ser que especificado o contrário",
                                format: "date-time",
                            },
                            date: {
                                type: Type.STRING,
                                description:
                                    "A data de início no formato 'AAAA-MM-DD'. Use APENAS para eventos de dia inteiro.",
                                format: "date",
                            },
                            timeZone: {
                                type: Type.STRING,
                                description:
                                    "O fuso horário da data de início (ex: 'America/Sao_Paulo'). Opcional se 'dateTime' já incluir o offset.",
                            },
                        },
                    },
                    end: {
                        type: Type.OBJECT,
                        description:
                            "A data/hora de término do evento. Deve conter 'dateTime' OU 'date'. - Para eventos com hora marcada, utilize 'dateTime' no formato ISO (ex: '2023-10-31T09:00:00-03:00'), sendo **obrigatório** incluir o offset do fuso horário (padrão -03:00 para Londrina PR, a menos que especificado o contrário). Para eventos de dia inteiro, utilize 'date' no formato 'AAAA-MM-DD'. Importante: para eventos de dia inteiro, a 'date' de término ('end') deve ser o dia **SEGUINTE** ao último dia do evento.",
                        properties: {
                            dateTime: {
                                type: Type.STRING,
                                description:
                                    "A data e hora de término no formato ISO (ex: '2023-10-31T10:00:00-03:00'). É obrigatório ter o timezone no final. Como moro em Londrina PR, é sempre -3:00 a não ser que especificado o contrário.",
                                format: "date-time",
                            },
                            date: {
                                type: Type.STRING,
                                description:
                                    "A data de término no formato 'AAAA-MM-DD'. Para eventos de dia inteiro, deve ser o dia SEGUINTE ao último dia do evento.",
                                format: "date",
                            },
                            timeZone: {
                                type: Type.STRING,
                                description: "O fuso horário da data de término.",
                            },
                        },
                    },
                    attendees: {
                        type: Type.ARRAY,
                        description: "Lista de participantes do evento.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                email: {
                                    type: Type.STRING,
                                    description: "O endereço de e-mail do participante.",
                                },
                            },
                        },
                    },
                },
            },
        },
        required: ["eventId", "patchParams"],
    },
};

export interface IPatchEvents {
    eventId: string;
    patchParams: calendar_v3.Schema$Event;
    calendar: calendar_v3.Calendar;
}

/**
 * Altera os dados de um evento na agenda
 *
 * @param eventId - A id do evento a ser alterado
 * @param patchParams - Os parâmetros do evento a serem alterados
 *
 * Para mais informações da estrutura do evento, acesse: https://developers.google.com/workspace/calendar/api/v3/reference/events?hl=pt-br#resource
 */
export async function patchEvent({ eventId, patchParams, calendar }: IPatchEvents) {
    const patchedEvent = calendar.events.patch({
        calendarId: envConfig.calendarId,
        eventId: eventId,
        requestBody: patchParams,
    });

    return patchedEvent;
}
