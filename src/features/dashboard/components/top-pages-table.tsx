const topPages = [
  {
    page: "/pricing",
    visitors: "12,420",
    conversion: "8.4%",
    bounceRate: "21%",
  },
  {
    page: "/dashboard",
    visitors: "9,820",
    conversion: "6.8%",
    bounceRate: "28%",
  },
  {
    page: "/billing",
    visitors: "7,410",
    conversion: "5.9%",
    bounceRate: "32%",
  },
  {
    page: "/settings",
    visitors: "4,120",
    conversion: "4.1%",
    bounceRate: "39%",
  },
];

export function TopPagesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="pb-3 font-medium text-slate-600 dark:text-slate-400">
              Page
            </th>

            <th className="pb-3 font-medium text-slate-600 dark:text-slate-400">
              Visitors
            </th>

            <th className="pb-3 font-medium text-slate-600 dark:text-slate-400">
              Conversion
            </th>

            <th className="pb-3 font-medium text-slate-600 dark:text-slate-400">
              Bounce Rate
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {topPages.map((page) => (
            <tr key={page.page}>
              <td className="py-4 font-medium text-slate-900 dark:text-white">
                {page.page}
              </td>

              <td className="py-4 text-slate-600 dark:text-slate-400">
                {page.visitors}
              </td>

              <td className="py-4 text-emerald-600 dark:text-emerald-400">
                {page.conversion}
              </td>

              <td className="py-4 text-slate-600 dark:text-slate-400">
                {page.bounceRate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}