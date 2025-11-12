import { parseISO } from "date-fns";
import {format } from "date-fns-tz";
import { es } from "date-fns/locale";

const CR_TZ = "America/Costa_Rica";

export const formatDateCR = (dateString, pattern = "dd/MM/yyyy") => {
  const parsed = parseISO(dateString);
  return format(parsed, pattern, { locale: es });
};

export const formatTimeCR = (date, pattern = "HH:mm:ss") => {
  return format(new Date(date), pattern, { timeZone: CR_TZ, locale: es });
};
