export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-10 h-1 w-20 bg-red-600" />

        <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-red-600">
          Nita&apos;s Cleaning Services
        </p>

        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
          We&apos;ll Be
          <br />
          <span className="text-red-600">Right Back.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
          We&apos;re making a few improvements to serve you better.
          Our website will be back online soon.
        </p>

        <div className="mx-auto mt-10 h-px w-40 bg-zinc-800" />

        <p className="mt-8 text-sm font-semibold text-zinc-500">
          Nita&apos;s Cleaning Services
        </p>

        <p className="mt-2 text-xs text-zinc-700">
          © 2026 Nita&apos;s Cleaning Services. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}