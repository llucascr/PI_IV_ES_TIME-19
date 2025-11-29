import { InfestationChart, LotesLineChart, StatusBarChart } from "./components";
export const HomePage = () => {
  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>


      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfestationChart />
        <LotesLineChart height={360} />
        <StatusBarChart height={360} />
      </div>
    </div>
  );
};
