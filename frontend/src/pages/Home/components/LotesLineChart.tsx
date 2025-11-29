import { config } from "config";
import { useFetch } from "hooks";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Types
export type LotePoint = {
  x: string; // ISO date
  y: number;
};

export type LoteData = {
  batchId: string;
  nomeLote: string;
  data: LotePoint[];
};

type Props = {
  height?: number | string;
};

const normalizeData = (lotes: LoteData[]) => {
  if (lotes.length === 0) return [];
  const map: Record<string, any> = {};
  lotes.forEach((lote) => {
    lote.data.forEach((p) => {
      const dateKey = new Date(p.x).toLocaleString();
      if (!map[dateKey]) map[dateKey] = { x: dateKey };
      map[dateKey][lote.nomeLote] = p.y;
    });
  });

  return Object.values(map);
};

export function LotesLineChart({ height = 360 }: Props) {

const { data } = useFetch<{ data: LoteData[] }>({
      url: config.apiUrl + "/dashboard/infestation-trend",
      options: {
        method: "GET",
      },
    });
  const parsed = data ? normalizeData(data) : [];

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Evolução da Infestação por Lote
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={parsed} margin={{ top: 10, right: 20, left: 0, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" angle={-15} textAnchor="end" height={50} />
            <YAxis />
            <Tooltip />
            <Legend />

            {data?.map((lote) => (
              <Line
                key={lote.batchId}
                type="monotone"
                dataKey={lote.nomeLote}
                strokeWidth={3}
                dot={true}
                stroke="#b61f30"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
