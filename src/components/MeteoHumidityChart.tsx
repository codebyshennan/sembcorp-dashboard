import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const MeteoHumidityChart = ({ data, xKey }) => {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <>
      <BarChart
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
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar type="monotone" dataKey="relativehumidity_2m" stroke="#82ca9d" />
      </BarChart>
    </>
  );
};

export default MeteoHumidityChart;
