export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-[#D4D4D4] animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-[#D4D4D4] animate-pulse" />)}
      </div>
    </div>
  );
}
