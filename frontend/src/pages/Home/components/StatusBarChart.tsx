import { config } from "config";
import { useFetch } from "hooks";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import type { RecordStatusType } from "types";


type StatusItem = {
  status: RecordStatusType;
  total: number;
};

type Props = {
  height?: number | string;
};

export function StatusBarChart({ height = 320 }: Props) {
  const { data } = useFetch<{ data: StatusItem[] }>({
        url: config.apiUrl + "/dashboard/record-status",
        options: {
          method: "GET",
        },
      });
  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Quantidade por Status
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 18, right: 20, left: 10, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" name="Total" radius={[8, 8, 0, 0]} fill="#e63946" stroke="#b61f30" strokeWidth={2}>
              <LabelList
                dataKey="total"
                position="top"
                formatter={(v) => (typeof v === "number" ? `${v}` : "")}
                fill="#b61f30"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
