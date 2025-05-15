// Devuelve la fecha en formato DD/MM/YYYY
export const formatDate = (isoDateString: string | undefined): string => {
  if (!isoDateString) return "FECHA INVALIDA";

  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("es-Es", options);
};

// Devuelve la hora en formato HH:MM am/pm
export const formatTime = (
  dateInput: string | Date | undefined,
  addHours?: boolean
): string => {
  if (!dateInput) return "HORA INVÁLIDA";

  try {
    // const date = new Date(isoDateString);
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (addHours) {
      date.setHours(date.getHours() + 6);
    }

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return "HORA INVÁLIDA";
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Esto habilita el formato AM/PM
    };

    return date.toLocaleTimeString("es-ES", options).toLowerCase();
  } catch (error) {
    return "HORA INVÁLIDA";
  }
};

// Devuelve la hora en formato HH:MM:SS
export const formatISOToTimeString = (input: string | Date | null): string => {
  let date: Date;

  if (input === null) {
    // Si es null, usar valor por defecto
    date = new Date("2025-04-30T20:59:00.000Z");
  } else if (input instanceof Date) {
    // Si es un objeto Date, usarlo directamente
    date = input;
  } else {
    // Si es un string ISO, convertirlo a Date
    date = new Date(input);
  }

  // Extraer horas, minutos y segundos en UTC
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

