import { parsePhoneNumber } from "react-phone-number-input"

export function PhoneLink({ phone }: { phone: string | null }) {
  if (!phone) {
    return null
  }
  const parsedPhoneNumber = parsePhoneNumber(phone)

  if (!parsedPhoneNumber) {
    return null
  }

  return (
    <a
      href={`tel:${parsedPhoneNumber.formatInternational()}`}
      className="underline underline-offset-4"
    >
      {parsedPhoneNumber.formatInternational()}
    </a>
  )
}
