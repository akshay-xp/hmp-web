import { useQuery } from "@tanstack/react-query"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx"

import { getReviewsCount } from "../query-functions.ts"

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function getOverallRating(data: number[]): number {
  const total = data.reduce((acc, val) => acc + val, 0)
  let numerator = 0
  for (let i = 1; i < data.length; i++) {
    numerator += i * data[i]
  }
  return Math.round((numerator / total) * 10) / 10
}

function getTotalReviews(data: number[]): number {
  return data.reduce((acc, val) => acc + val, 0)
}

export function CustomerRatingChart({ customerId }: { customerId: number }) {
  const { data, isSuccess } = useQuery({
    queryKey: ["customer", { customerId }],
    queryFn: () => getReviewsCount(customerId),
    enabled: !!customerId,
  })

  const chartData = [
    { month: "1 ★", reviews: data?.[1] },
    { month: "2 ★", reviews: data?.[2] },
    { month: "3 ★", reviews: data?.[3] },
    { month: "4 ★", reviews: data?.[4] },
    { month: "5 ★", reviews: data?.[5] },
  ]

  return (
    isSuccess && (
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-2xl font-bold">
            {getOverallRating(data)} ★
          </CardTitle>
          <CardDescription>
            Based on {getTotalReviews(data)} reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="reviews" fill="var(--primary)" radius={8}>
                <LabelList
                  position="insideTop"
                  offset={12}
                  className="fill-background"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2">
            <Badge variant="outline">
              <ChevronUp /> Regular Customer
            </Badge>
            <Badge variant="outline">
              <ChevronUp />
              Polite
            </Badge>
            <Badge variant="secondary">
              <ChevronDown />
              Late Check-ins
            </Badge>
          </div>
        </CardFooter>
      </Card>
    )
  )
}
