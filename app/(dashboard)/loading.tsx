export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        <div className="aspect-video rounded-xl bg-muted animate-pulse" />
      </div>
    </main>
  );
}
