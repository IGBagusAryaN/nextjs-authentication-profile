import { create } from "zustand";
import { getZodiacByYear } from "../utils/zodiac-date";

type ZodiacState = {
  birthday: string;
  horoscope: string;
  zodiac: string;
  setBirthday: (dateString: string) => void;
};

export const getHoroscopeByDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "Aries (Ram)";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Taurus (Bull)";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21))
    return "Gemini (Twins)";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22))
    return "Cancer (Crab)";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return "Leo (Lion)";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "Virgo (Virgin)";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23))
    return "Libra (Balance)";
  if ((month === 10 && day >= 24) || (month === 11 && day <= 21))
    return "Scorpius (Scorpion)";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius (Archer)";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn (Goat)";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius (Water Bearer)";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return "Pisces (Fish)";
  return "";
};

export const useZodiacStore = create<ZodiacState>((set) => ({
  birthday: "",
  horoscope: "",
  zodiac: "",
  setBirthday: (dateString: string) => {
    const horoscope = getHoroscopeByDate(dateString);
    const zodiac = getZodiacByYear(dateString);
    set({ birthday: dateString, horoscope, zodiac });

    return { horoscope, zodiac };
  },
}));
