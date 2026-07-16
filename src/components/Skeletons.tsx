export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-6 h-48" />
        ))}
      </div>
    </div>
  );
}

export function JobsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-6 flex gap-2">
        <div className="h-8 w-32 animate-pulse rounded-full bg-surface" />
        <div className="h-8 w-32 animate-pulse rounded-full bg-surface" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-6 h-56" />
        ))}
      </div>
    </div>
  );
}

export function CareersSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-6 h-64" />
        ))}
      </div>
    </div>
  );
}

export function LearnSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      {[...Array(3)].map((_, section) => (
        <div key={section} className="mt-8 space-y-4">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-surface" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-4 h-40" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TopicGuideSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="h-8 w-32 animate-pulse rounded-lg bg-surface" />
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-surface" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-48 animate-pulse rounded-lg bg-surface" />
          <div className="h-4 w-96 animate-pulse rounded-lg bg-surface" />
        </div>
      </div>
      <div className="mt-10 space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-6 space-y-3 h-32" />
        ))}
      </div>
    </div>
  );
}

export function SalariesSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-4 h-32" />
        ))}
      </div>
      <div className="mt-8 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-6 h-24" />
        ))}
      </div>
    </div>
  );
}

export function InterviewSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-10 space-y-3">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-5 h-20" />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="glass rounded-2xl border border-border p-6 space-y-4">
        <div className="flex gap-4">
          <div className="h-20 w-20 animate-pulse rounded-2xl bg-surface" />
          <div className="flex-1 space-y-2">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-surface" />
            <div className="h-4 w-32 animate-pulse rounded-lg bg-surface" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-surface p-4 h-24" />
        ))}
      </div>
      <div className="mt-8 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-32 animate-pulse rounded-lg bg-surface" />
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="animate-pulse rounded-xl border border-border bg-surface p-3 h-12" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-6 w-96 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border border-border bg-surface p-4 h-12" />
        ))}
      </div>
      <div className="h-12 w-full animate-pulse rounded-lg bg-surface" />
    </div>
  );
}
