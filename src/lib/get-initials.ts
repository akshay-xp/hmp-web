export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((word) => word.length > 0) // Remove extra spaces
    .map((word) => word[0].toUpperCase()) // Get first letter and uppercase
    .slice(0, 2) // Get only first two initials
    .join("")
}
