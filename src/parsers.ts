export const parsers = {
  /**
   * Transform git timestamp to unix timestamp
   */
  timestamp: (a: string) => +a * 1000,

  /**
   * Transform parents string to a clean array
   */
  parents: (a: string) => a.split(' ').filter(b => b),

  /**
   * Transform refs string to a clean array
   */
  refs: (a: string) => a.replace(/[\(\)]/g, '')
    .replace('->', ',')
    .split(', ')
    .map((a: string) => a.trim())
    .filter((a: string) => a)
}