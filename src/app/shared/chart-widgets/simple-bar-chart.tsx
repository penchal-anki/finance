'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';

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
    pv: 9800,
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

function SimpleBarChart({ className }: { className?: string }) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  return (
    <WidgetCard title={'Budget performance'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={isMediumScreen ? 18 : 24}
            margin={{
              left: -10,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis tickLine={false} dataKey="name" />
            <YAxis
              axisLine={true}
              tickLine={true}
              tick={<CustomYAxisTick />}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Bar dataKey="pv" fill="#669F2A" shape={<RoundedTopBarFill />} />
            {/* <Bar dataKey="uv" fill="#10b981" shape={<RoundedTopBarFill />} /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}

export default SimpleBarChart;