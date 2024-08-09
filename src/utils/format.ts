export function formatEmailName(email: string) {
  return email.replace(/@.*$/, "");
}
