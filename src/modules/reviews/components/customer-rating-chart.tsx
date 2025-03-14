import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
const chartData = [
  { month: "1 ★", reviews: 186 },
  { month: "2 ★", reviews: 305 },
  { month: "3 ★", reviews: 237 },
  { month: "4 ★", reviews: 73 },
  { month: "5 ★", reviews: 209 },
]

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CustomerRatingChart() {
  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl font-bold">4.6 ★</CardTitle>
        <CardDescription>Based on 97 reviews</CardDescription>
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
            <Bar dataKey="reviews" fill="var(--color-desktop)" radius={8}>
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
}
