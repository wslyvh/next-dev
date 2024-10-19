export async function getLogs() {
  const response = await fetch("/api/account/log");
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  const { data } = await response.json();
  return data ?? [];
}

export async function postLog() {
  const response = await fetch("/api/account/log", {
    method: "POST",
  });

  return response.json();
}
