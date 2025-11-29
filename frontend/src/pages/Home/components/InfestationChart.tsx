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

export type InfestationDatum = {
  cliente: string;
  mediaInfestacao: number;
};

type Props = {
  height?: number | string;
  barSize?: number;
};

export function InfestationChart({
  height = 320,
  barSize = 36,
}: Props) {
  const { data } = useFetch<{ data: InfestationDatum[] }>({
      url: config.apiUrl + "/dashboard/infestation-avg",
      options: {
        method: "GET",
      },
    });
  
  return (
    <div className="w-full bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-900">Média de Infestação por Cliente</h3>
        <span className="text-sm text-slate-500">Unidade: %</span>
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cliente" interval={0} angle={-20} textAnchor="end" height={60}  />
            <YAxis />
            <Tooltip formatter={(value: any) => `${value}%`} />
            <Legend />
            <Bar dataKey="mediaInfestacao" name="Média Infestação" barSize={barSize} radius={[8, 8, 0, 0]} fill="#e63946" stroke="#b61f30" strokeWidth={2}>
              <LabelList dataKey="mediaInfestacao" position="top" formatter={(value) => (typeof value === "number" ? `${value}%` : "") } fill="#b61f30" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>  
    </div>
  );
}
