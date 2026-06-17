import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  todo: number;
  inProgress: number;
  done: number;
};

export default function TaskStatusChart({
  todo,
  inProgress,
  done,
}: Props) {
  const data = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: inProgress },
    { name: "Done", value: done },
  ];

  const COLORS = [
    "#71717a",
    "#f59e0b",
    "#8b5cf6",
  ];

  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >
      <h3 className="text-white text-lg font-semibold mb-4">
        Task Distribution
      </h3>

      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}