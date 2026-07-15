export default function Loading() {
  return (
    <div className="p-8 animate-pulse space-y-6">
      <div className="h-8 w-48 bg-[#1A1D21] rounded-lg"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-[#141619] rounded-2xl border border-[rgba(255,255,255,0.05)]"></div>
        ))}
      </div>
      <div className="h-64 bg-[#141619] rounded-2xl border border-[rgba(255,255,255,0.05)]"></div>
    </div>
  );
}
