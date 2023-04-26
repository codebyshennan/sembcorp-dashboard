import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
  Line,
  LineChart,
} from 'recharts';

const TemperatureChart = ({ data, xKey }) => {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={1200}
      height={600}
      data={data}
      // margin={{
      //   top: 5,
      //   right: 30,
      //   left: 20,
      //   bottom: 5,
      // }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Line dataKey="max" fill="#8884d8" />
      <Line dataKey="min" fill="#82ca9d" />
      <Brush />
    </LineChart>
    // </ResponsiveContainer>
  );
};

export default TemperatureChart;
