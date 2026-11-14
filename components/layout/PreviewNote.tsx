import { SHOW_TOKENS } from "@/lib/tokens";

/**
 * Dev/preview only: marks where a section is hidden because real content doesn't exist yet,
 * so the team can see what's missing. Never renders on production.
 */
export function PreviewNote({ id, reason }: { id: string; reason: string }) {
  if (!SHOW_TOKENS) return null;
  return (
    <div className="wrap py-6">
      <p className="preview-note px-5 py-4">
        <strong>{id} hidden</strong> · {reason}
      </p>
    </div>
  );
}
