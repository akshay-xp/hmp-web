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

import { getReviewsCount, getReviewTags } from "../query-functions.ts"

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function getOverallRating(ratings: Record<number, number>): number {
  const total = getTotalReviews(ratings)
  let numerator = 0
  for (const rating in ratings) {
    numerator += Number(rating) * ratings[rating]
  }
  return Math.round((numerator / total) * 10) / 10
}

function getTotalReviews(ratings: Record<number, number>): number {
  let total = 0
  for (const rating in ratings) {
    total += ratings[rating]
  }
  return total
}

export function CustomerRatingChart({ customerId }: { customerId: number }) {
  const { data, isSuccess } = useQuery({
    queryKey: ["reviews-count", { customerId }],
    queryFn: () => getReviewsCount(customerId),
    enabled: !!customerId,
  })
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getReviewTags(),
  })

  const chartData = [
    { month: "1 ★", reviews: data?.ratings[1] },
    { month: "2 ★", reviews: data?.ratings[2] },
    { month: "3 ★", reviews: data?.ratings[3] },
    { month: "4 ★", reviews: data?.ratings[4] },
    { month: "5 ★", reviews: data?.ratings[5] },
  ]

  return (
    isSuccess && (
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-2xl font-bold">
            {getOverallRating(data.ratings)} ★
          </CardTitle>
          <CardDescription>
            Based on {getTotalReviews(data.ratings)} reviews
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
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.tags).map(([tagId, count]) => {
              return (
                <Badge variant="outline">
                  {tags?.get(Number(tagId))?.type === "POSITIVE" ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                  &nbsp;
                  {tags?.get(Number(tagId))?.name} ( {count} )
                </Badge>
              )
            })}
          </div>
        </CardFooter>
      </Card>
    )
  )
}
