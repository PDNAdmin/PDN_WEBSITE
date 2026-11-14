/** Dial codes for the phone field. Default +234; pre-detected from the visitor's timezone. */
export const COUNTRIES: { iso: string; code: string; tz: RegExp }[] = [
  { iso: "NG", code: "+234", tz: /^Africa\/Lagos$/ },
  { iso: "GH", code: "+233", tz: /^Africa\/Accra$/ },
  { iso: "KE", code: "+254", tz: /^Africa\/Nairobi$/ },
  { iso: "ZA", code: "+27", tz: /^Africa\/Johannesburg$/ },
  { iso: "RW", code: "+250", tz: /^Africa\/Kigali$/ },
  { iso: "CM", code: "+237", tz: /^Africa\/Douala$/ },
  { iso: "GB", code: "+44", tz: /^Europe\/London$/ },
  { iso: "IE", code: "+353", tz: /^Europe\/Dublin$/ },
  { iso: "US", code: "+1", tz: /^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Kentucky|Boise)/ },
  { iso: "CA", code: "+1", tz: /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal)/ },
  { iso: "DE", code: "+49", tz: /^Europe\/Berlin$/ },
  { iso: "FR", code: "+33", tz: /^Europe\/Paris$/ },
  { iso: "NL", code: "+31", tz: /^Europe\/Amsterdam$/ },
  { iso: "BE", code: "+32", tz: /^Europe\/Brussels$/ },
  { iso: "IT", code: "+39", tz: /^Europe\/Rome$/ },
  { iso: "ES", code: "+34", tz: /^Europe\/Madrid$/ },
  { iso: "AE", code: "+971", tz: /^Asia\/Dubai$/ },
  { iso: "QA", code: "+974", tz: /^Asia\/Qatar$/ },
  { iso: "SA", code: "+966", tz: /^Asia\/Riyadh$/ },
  { iso: "AU", code: "+61", tz: /^Australia\// },
];

export function detectCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return COUNTRIES.find((c) => c.tz.test(tz))?.iso ?? "NG";
  } catch {
    return "NG";
  }
}
