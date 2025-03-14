import { useQuery } from "@tanstack/react-query"
import { getCustomer } from "../query-functions"
import { AddCustomerForm } from "./add-customer-form"
import { CustomerRatingChart } from "./customer-rating-chart"
import { Route } from "@/routes/_private/index"

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
            Anonymous
          </h2>
          <p className="text-sm text-muted-foreground">
            {[data.email, data.phone].filter(Boolean).join(" | ")}
          </p>
        </div>
        <CustomerRatingChart />
      </>
    ) : (
      <AddCustomerForm email={email} phone={phone} />
    )
  }
}
