import { useQuery } from "@tanstack/react-query"

import { EmailLink } from "@/components/ui/email-link.tsx"
import { PhoneLink } from "@/components/ui/phone-link.tsx"
import { Route } from "@/routes/_private/index.tsx"

import { getCustomer } from "../query-functions.ts"

import { AddCustomerForm } from "./add-customer-form.tsx"

/**
 * Todo:
 * hotel review ui
 * review tags
 * edit
 * delete + modal
 *
 * review chart
 * total reviews for each rating + avg
 * total reviews for each tag
 *
 * others reviews
 * tags
 * report
 * sort + filter
 */

export function CustomerSection() {
  const { email, phone } = Route.useSearch()
  const { data, isSuccess } = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })

  if (isSuccess) {
    return data ? (
      <>
        <div>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {data.name || "Anonymous"}
          </h2>
          <span className="text-sm text-muted-foreground">
            <EmailLink email={data.email} />
            {data.email && data.phone && " | "}
            <PhoneLink phone={data.phone} />
          </span>
        </div>
      </>
    ) : (
      <AddCustomerForm email={email} phone={phone} />
    )
  }
}
