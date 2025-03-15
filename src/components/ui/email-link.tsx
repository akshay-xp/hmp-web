export function EmailLink({ email }: { email: string | null }) {
  if (!email) {
    return null
  }

  return (
    <a href={`mailto:${email}`} className="underline underline-offset-4">
      {email}
    </a>
  )
}
