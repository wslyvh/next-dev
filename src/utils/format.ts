export function formatEmailName(email: string) {
  return email.replace(/@.*$/, "");
}

export function truncateMiddle(text: string, length: number = 5) {
  if (text?.length > length * 2 + 1) {
    return `${text.substring(0, length)}...${text.substring(
      text.length - length,
      text.length
    )}`;
  }

  return text;
}
