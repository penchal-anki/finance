'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Oct',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Nov',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Dec',
    uv: 2000,
    pv: 4800,
    amt: 2290,
  },
  {
    name: 'Jan',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Feb',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Mar',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Apr',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'May',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Jun',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function CustomYAxisTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={8} y={0} dy={14} textAnchor="end" className="fill-gray-500 text-xs">
        {`${payload.value.toLocaleString()}`}$
      </text>
    </g>
  );
}


export default function SimpleAreaChart({ className }: { className?: string }) {
  return (
    <WidgetCard title={'Budget performance'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: -20,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <defs>
              <linearGradient id="simpleAreaChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#669F2A"
                  className="[stop-opacity:0.3] dark:[stop-opacity:0.2]"
                />
                <stop offset="95%" stopColor={'#669F2A'} stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis
                axisLine={true}
                tickLine={true}
                tick={<CustomYAxisTick />}
              />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#669F2A"
              fill="url(#simpleAreaChart)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#669F2A"
              fill="url(#simpleAreaChart)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="amt"
              stroke="#669F2A"
              fill="url(#simpleAreaChart)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
