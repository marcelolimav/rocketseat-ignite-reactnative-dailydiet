export function formatValue(value: number, style: "percent" | "currency") {
  return Intl.NumberFormat("pt-BR", {
    style,
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value / 100);
}

export function formatDateTime(
  value: Date,
  type: "date" | "hour" | "datetime"
) {
  if (type === "hour") {
    return Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(value);
  }

  if (type === "datetime") {
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(value);
  }

  return Intl.DateTimeFormat("pt-BR").format(value);
}
