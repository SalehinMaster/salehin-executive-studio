export function ErrorAlert({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
    >
      {message}
    </p>
  );
}
