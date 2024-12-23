/**
 * Converts string to number. If string cannot be converted, returns undefined.
 *
 * @param str String to be converted
 * @returns Number or undefined
 */
export const paramToInt = (str: string | undefined): number | undefined => {
   if (!str) return undefined

   const parsed = parseInt(str)
   if (isNaN(parsed)) return undefined

   return parsed
}
