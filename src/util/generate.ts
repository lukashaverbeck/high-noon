import DEVICE from "./Device";
import { MONTH_NAMES, DAY_NAMES, IMAGE_EXTENSION } from "./constants";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const KEY_LENGTH = 8;

const generateAlphanumericalString = (length: number) => {
    let str = "";
    
    for (let _ = 0; _ < length; _++) {
        const index = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET[index];    
    }

    return str;
}

export const generateKey = () => generateAlphanumericalString(KEY_LENGTH);

export const generateDateString = (date: Date | null, showYear: boolean = true) => {
    if (!date) return "";

    const weekday = DAY_NAMES[date.getDay()];
    const day = `${date.getDate() < 10 ? '0' : ""}${date.getDate()}`;
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();

    return `${DEVICE.isMobile ? "" : `${weekday}, `}${day}. ${month}${showYear ? ` ${year}` : ""}`;
}

export const generateImage = (name: string) => require("../assets/images/" + name + '.' + IMAGE_EXTENSION);
export const generateImageDescription = (date: Date | null) => date ? `Bild vom ${generateDateString(date)}` : "Bild aus dem SUS Architekturbüro";