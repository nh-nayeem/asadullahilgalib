export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-gray-950/75 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="mx-auto max-w-6xl animate-pulse px-5 pt-24 md:px-8 md:pt-28">
        <div className="mb-12 grid items-center gap-10 md:grid-cols-2">
          <div className="aspect-square w-full max-w-sm rounded-xl bg-white/10 shadow-inner" />
          <div className="space-y-5">
            <div className="h-8 w-2/5 rounded-md bg-white/15" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-11/12 rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-4/5 rounded bg-white/10" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-9 w-9 rounded-full bg-amber-400/20" />
              <div className="h-9 w-9 rounded-full bg-white/10" />
              <div className="h-9 w-9 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map(item => (
            <div key={item} className="space-y-3 rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <div className="h-24 rounded-lg bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/[0.07]" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
