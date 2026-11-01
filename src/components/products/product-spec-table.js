export function ProductSpecTable({ specifications = [] }) {
  if (!specifications.length) return null;

  return (
    <div className="overflow-x-auto rounded-panel border border-line bg-white">
      <table className="min-w-full divide-y divide-line text-left text-sm">
        <thead className="bg-field">
          <tr>
            <th scope="col" className="px-6 py-3.5 font-semibold text-ink">
              Specification
            </th>
            <th scope="col" className="px-6 py-3.5 font-semibold text-ink">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {specifications.map((spec, idx) => (
            <tr key={idx}>
              <th
                scope="row"
                className="px-6 py-4 align-top font-medium text-ink"
              >
                {spec.property}
              </th>
              <td className="px-6 py-4 align-top text-muted">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
