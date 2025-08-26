/**
 * Determines the Zodiac sign based on a given birthdate.
 * @param birthdate - The birthdate string in "YYYY-MM-DD" format.
 * @returns The Zodiac sign as a string.
 */
export const getZodiacSign = (birthdate: string): string => {
  const date = new Date(birthdate);
  // Adding 1 to getMonth() because it's 0-indexed, but we need to account for the user's timezone.
  // Using UTC methods avoids timezone issues.
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  // Default to Capricorn
  return "Capricorn";
};
