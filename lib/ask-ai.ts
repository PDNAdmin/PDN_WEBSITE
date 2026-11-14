import { GLOBAL } from "@/content/copy";
import { isFilled, resolvePlain } from "@/lib/tokens";
import { siteDomain } from "@/lib/site";

/** "Ask AI about PDN" links (04 §1): each opens the assistant with the prefilled prompt. */
export function askAiLinks() {
  const f = GLOBAL.footer.askAi;
  const q = encodeURIComponent(resolvePlain(f.prompt.replace("{{DOMAIN}}", isFilled("DOMAIN") ? "{{DOMAIN}}" : siteDomain())));
  return {
    label: f.label,
    links: [
      { label: f.buttons[0], href: `https://chatgpt.com/?q=${q}` },
      { label: f.buttons[1], href: `https://claude.ai/new?q=${q}` },
      { label: f.buttons[2], href: `https://www.perplexity.ai/search?q=${q}` },
    ],
  };
}
