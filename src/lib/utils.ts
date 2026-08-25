export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatInr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
