import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { PremioI } from '@/types/Interfaces'
export const description = 'A horizontal bar chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function ChartBarHorizontal({ data, title }: { data: PremioI[]; title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout='vertical'
          >
            <XAxis type='number' dataKey='CANT' hide />
            <YAxis
              dataKey='TIPOPREMIO'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='CANT' fill='var(--color-desktop)' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
