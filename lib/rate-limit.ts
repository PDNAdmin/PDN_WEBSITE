import "server-only";

/**
 * Simple per-IP rate limit: 5 bookings / 10 minutes.
 * Uses Upstash Redis (REST) when configured, otherwise an in-memory map (per serverless instance).
 */
const LIMIT = 5;
const WINDOW_S = 600;
const mem = new Map<string, { n: number; reset: number }>();

export async function rateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const key = `pdn:book:${ip}`;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, String(WINDOW_S), "NX"],
        ]),
        cache: "no-store",
      });
      const data = (await res.json()) as { result: number }[];
      return (data[0]?.result ?? 0) <= LIMIT;
    } catch {
      // fall through to memory
    }
  }
  const now = Date.now();
  const cur = mem.get(key);
  if (!cur || cur.reset < now) {
    mem.set(key, { n: 1, reset: now + WINDOW_S * 1000 });
    return true;
  }
  cur.n++;
  if (mem.size > 5000) for (const [k, v] of mem) if (v.reset < now) mem.delete(k);
  return cur.n <= LIMIT;
}
