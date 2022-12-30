export function safeParseJSON<T>(value: string, defaultValue: any = null): T {
  try {
    return value ? JSON.parse(value) || defaultValue : defaultValue
  } catch (error: any) {
    return defaultValue
  }
}
