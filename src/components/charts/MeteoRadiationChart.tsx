import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { HourlyMeteoData } from '~/hooks/useLocation';

const MeteoRadiationChart = ({ data }: { data: HourlyMeteoData[] }) => {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <>
      <AreaChart
        width={1200}
        height={600}
        data={data}
        syncId="meteo"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" interval="preserveStartEnd" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="direct_radiation"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </>
  );
};

export default MeteoRadiationChart;
