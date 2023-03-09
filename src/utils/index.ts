export const deleteWhiteSpace = (content: string) => {
  const newContent = content.replaceAll('&nbsp;', '')

  return newContent.replaceAll('\n', ' ')
}
