"use client";

import { Log } from "@/utils/types";
import dayjs from "dayjs";
import { getLogs } from "@/clients/account";
import { useQuery } from "@tanstack/react-query";

export default function LogOverview() {
  const {
    data: logs,
    isLoading,
    error,
  } = useQuery<Log[]>({
    queryKey: ["logs"],
    queryFn: () => getLogs(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Account Activity</h3>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log.id}>
                <td>{dayjs(log.timestamp).format("DD/MM/YYYY HH:mm")}</td>
                <td>{log.action}</td>
                <td>{log.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
