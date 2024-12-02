export const transformData = <T>(data: object): T => {
  const camelToSnake = (str: string) =>
    str[0].toLowerCase() +
    str
      .slice(1, str.length)
      .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

  const transformedObject = {} as T

  for (const key of Object.keys(data)) {
    const value = data[key as keyof typeof data]
    const newKey = camelToSnake(key)

    if (typeof value === 'object' && value !== null) {
      transformedObject[newKey as keyof T] = transformData(value)

      continue
    }

    transformedObject[newKey as keyof T] = value
  }

  return transformedObject
}
