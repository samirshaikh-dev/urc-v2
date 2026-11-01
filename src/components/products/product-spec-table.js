export function ProductSpecTable({ specifications = [] }) {
  if (!specifications.length) return null;

  return (
    <div className="overflow-hidden border border-[#E5E7EB] rounded-xl bg-white">
      <table className="min-w-full divide-y divide-[#E5E7EB] text-left text-sm">
        <thead className="bg-[#F1F2F3]">
          <tr>
            <th scope="col" className="px-6 py-3.5 font-semibold text-[#1A1A1A]">
              Specification Parameter
            </th>
            <th scope="col" className="px-6 py-3.5 font-semibold text-[#1A1A1A]">
              Standard Value / Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {specifications.map((spec, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]/60"}
            >
              <td className="px-6 py-4 font-medium text-[#1A1A1A] whitespace-nowrap">
                {spec.property}
              </td>
              <td className="px-6 py-4 text-[#5A5D63]">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
