# 04 — Copy (use verbatim)

**Conventions**
- `**text**` inside a headline = the one gold phrase (render as `<em>`, gold, not italic).
- `→` at the end of a button = render the `ArrowRight` icon, not the character.
- `{{TOKEN}}` = placeholder (see CLAUDE.md §6). If a sentence depends on an empty token, hide the sentence.
- No em dashes in on-site copy (PDN house style). Keep punctuation as written.
- British/Commonwealth spelling.

New tokens introduced in this file: `{{RESPONSE_TIME}}` (default if unknown: "one business day"), `{{EMAIL_PUBLIC}}` (public contact email).

---

## 1. Global

**Header nav:** Work · Services · AI Agents · About · Insights
**Header button:** Book a free call →
**Mobile menu footer:** "Talk to us" · {{PHONE}} · {{EMAIL_PUBLIC}} · social icons
**Sticky mobile CTA:** Book a free call →
**Skip link:** Skip to content

**CTA band (end of inner pages)**
- Headline: Ready when **you are**.
- Body: Book a free 20-minute call. Leave with a clear plan, whether you work with us or not.
- Button: Book a free call →

**Footer**
- Statement: Pishon Digital Network builds websites, AI agents and digital products for ambitious businesses in Nigeria and around the world.
- Brand line (display, gold): Because the future belongs to businesses built for it.
- Column "Explore": Work · Services · AI Agents · Digital University · About · Insights
- Column "Services": Websites · Online stores · AI agents · Digital products
- Column "Talk to us": {{PHONE}} · {{WHATSAPP}} (label "WhatsApp us") · {{EMAIL_PUBLIC}} · {{ADDRESS}}
- Ask AI row label: Ask AI about PDN · buttons: ChatGPT · Claude · Perplexity
  - Each opens the assistant with the prefilled prompt: `What does Pishon Digital Network ({{DOMAIN}}) do, and who is it best for?`
- Bottom left: © {year} Pishon Digital Network. All rights reserved.
- Bottom right: Made in Lagos, for the world. · Privacy · Terms

---

## 2. Home `/`

### HOME.HERO
- Eyebrow: Websites · AI agents · Digital products
- Headline (display-xl): Customers check you online before they pay you. **What are they seeing?**
- Lead: PDN builds websites and AI agents that make people trust you, find you and contact you. Stop losing customers to businesses that simply look more serious.
- Primary button: Book a free call →
- Secondary button: See our work
- Micro-trust (under buttons): Free 20-minute call. No pressure, no jargon.
- Trust ticks: Designed for phones first · Found on Google · Connected to WhatsApp · You own everything

### HOME.MARQUEE
- Label: Trusted by businesses in Lagos, London and beyond
  - Only use cities where PDN genuinely has clients. If unsure, use: Trusted by growing businesses

### HOME.PAIN
- Eyebrow: Sound familiar?
- Headline: Things we hear **every single week**.
- Cards (quote + who). *These are composite situations, not testimonials. Never add names or photos to them.*
  1. "When customers ask for my website, I send my Instagram link." · Business owner
  2. "People say my prices are too high. Honestly, my brand just looks cheap." · Fashion brand founder
  3. "I'm great at what I do. But when people Google me, nothing comes up." · Lawyer, consultant, coach
  4. "We have a website. It hasn't brought in a single enquiry this year." · Company director
  5. "My last developer took the money and stopped picking up my calls." · Almost everyone
  6. "I'm abroad. I need a team I can trust without chasing them across time zones." · Founder in the diaspora
- Bridge (h2): None of this is about how good you are. It's about what people see before they meet you. **We fix that.**
- Text CTA: Let's fix it →  (to `#book`)

### HOME.SHOWREEL
- Cursor label: Play
- Caption (small, stone): This is what we build. Now imagine it with your name on it.
- Modal controls: Sound on · Close

### HOME.SHIFT
- Eyebrow: What changes
- Headline: What changes when **PDN builds it**.
- 01 · Trust
  - h2: People trust you before they talk to you.
  - Body: Your website does the convincing before the first message. Customers see a serious business, so they stop haggling and start buying.
- 02 · Found
  - h2: Customers find you, not your competitor.
  - Body: When someone searches for what you do, you show up. On Google, on Maps, and in the AI assistants people now ask for recommendations.
- 03 · Paid
  - h2: Enquiries arrive while you sleep.
  - Body: Clear offers, a WhatsApp button, a booking form and an AI agent that answers at midnight. Visitors become conversations. Conversations become payments.

### HOME.AUDIENCE
- Eyebrow: Who we build for
- Headline: Built for people **like you**.
- Tabs: Business owners · Professionals · Companies · Clients abroad

**Tab: Business owners**
- h2: Look as good online as your product is in real life.
- Body: Your customers already love what you sell. Give new customers that same confidence before they ever send a DM.
- Benefits:
  - A website or store that sells beyond your followers
  - Orders and enquiries straight to your WhatsApp
  - A brand that justifies your price
- Button: Book a call for my business →

**Tab: Professionals**
- h2: Be the name people find, and the one they choose.
- Body: Referrals Google you before they call. Make sure what they find says expert.
- Benefits:
  - A personal brand site that shows your expertise
  - Show up when people search your name or your service
  - Consultations booked without the back-and-forth
- Button: Book a call for my practice →

**Tab: Companies**
- h2: Turn your website into your best salesperson.
- Body: If your website isn't bringing in leads, it's costing you money. We rebuild it around one goal: more qualified enquiries.
- Benefits:
  - A redesign built for conversion, not decoration
  - AI agents that answer, qualify and route enquiries 24/7
  - Content your team can update without a developer
- Button: Book a call for my company →

**Tab: Clients abroad**
- h2: Global quality. A team that answers.
- Body: Work with a senior team that keeps you updated, hits deadlines and works with your time zone, wherever you are.
- Benefits:
  - A clear timeline and written agreement before we start
  - Regular progress updates and a live preview link
  - Quotes in USD or naira
- Button: Book a call from abroad →

### HOME.WORK
- Eyebrow: Selected work
- Headline: Real work for **real businesses**.
- Lead: Websites, AI agents and digital products we've designed and built for clients who wanted more than a pretty page.
- Link: See all work →
- Card link label: View project

### HOME.SERVICES
- Eyebrow: What we do
- Headline: One partner for your **whole digital journey**.
- Rows:
  - 01 · Websites · Websites that win trust and bring in customers.
  - 02 · AI Agents · An assistant that answers your customers 24/7, in your voice.
  - 03 · Digital Products · Apps, platforms and tools, designed and built to launch.
  - 04 · Digital University · Practical courses and tools to grow your digital skills.
- Row hover label: Explore

### HOME.PROOF
- Eyebrow: Proof
- Headline: Don't take our word **for it**.
- Stats (show only filled ones):
  - {{STAT_PROJECTS}}+ · Projects delivered
  - {{STAT_CLIENTS}}+ · Clients served
  - {{STAT_COUNTRIES}} · Countries
  - {{STAT_YEARS}} · Years building
- Testimonials: from Sanity (real clients only). Carousel controls: Previous · Next

### HOME.PROCESS
- Eyebrow: How it works
- Headline: From first call to launch in **3 steps**.
- Step 1 · Book a free call
  - Tell us about your business and your goals. In 20 minutes, we'll tell you exactly what you need, and what you don't.
- Step 2 · We design and build
  - You get a clear plan, timeline and price in writing. Then we build, and you watch it come together on a live preview link.
- Step 3 · You launch and grow
  - We launch, show you how to manage everything, and stay on hand after go-live. Your website keeps working while you work.
- Note: Most websites go live in {{DELIVERY_DAYS}} days.
- Button: Start with step 1 →

### HOME.PRICING
- Eyebrow: Packages
- Headline: Clear packages. **No surprises.**
- Lead: Every project is quoted in writing before we start. These are starting prices. Your free call tells us exactly what you need.
- Currency toggle: ₦ NGN · $ USD
- Price prefix: From

> Package inclusions below are a proposal. Confirm with PDN before launch (launch checklist item).

**Starter**
- For: For new businesses and personal brands that need to look legit, fast.
- Price: {{PRICE_STARTER_NGN}} / {{PRICE_STARTER_USD}}
- Includes:
  - A sharp one-page website
  - Designed for phones first
  - WhatsApp and contact buttons
  - Google Business profile set up
  - Domain and hosting set up for you
- Button: Book a call about Starter →

**Business** (badge: Most popular)
- For: For growing businesses ready to turn visitors into customers.
- Price: {{PRICE_BUSINESS_NGN}} / {{PRICE_BUSINESS_USD}}
- Includes:
  - Up to 6 custom-designed pages
  - Copywriting that sells
  - SEO foundations so customers find you
  - Update your own content, no code
  - Forms connected to your email and WhatsApp
  - 30 days of support after launch
- Button: Book a call about Business →

**Premium**
- For: For companies that want a website, store and AI agent working as one system.
- Price: {{PRICE_PREMIUM_NGN}} / {{PRICE_PREMIUM_USD}}
- Includes:
  - Fully custom design, as many pages as you need
  - Online store or web app features
  - An AI agent trained on your business
  - Advanced SEO and speed optimisation
  - Priority support
- Button: Book a call about Premium →

- Footnote: If you want the cheapest website in town, we're not it. If you want one that pays for itself, let's talk.

### HOME.GUARANTEE
- Eyebrow: Our promise
- Headline: Working with us **feels different**.
- Promises (icon + title + line):
  - A written agreement before we start · Scope, timeline and price, agreed and signed. No surprises.
  - You're never chasing us · Regular updates and a live preview link, so you always know where things stand.
  - We stay after launch · Questions, changes, growth. We're still here.
- Guarantee line (show only if filled): {{GUARANTEE}}

> The three promises describe how PDN works. Confirm each with the founders before launch.

### HOME.FAQ
- Eyebrow: Questions
- Headline: What people ask **before they book**.
- Q: How much does a website cost?
  - A: It depends on what you need. Our packages start from {{PRICE_STARTER_NGN}} ({{PRICE_STARTER_USD}}). On your free call, we'll recommend the smallest package that gets you results, then send a written quote.
- Q: How long does it take?
  - A: Most websites go live in {{DELIVERY_DAYS}} days. Bigger builds, like online stores, web apps or AI agents, take longer. You'll get a clear timeline before we start.
- Q: What do I need to prepare?
  - A: Not much. Your logo if you have one, photos of your work or products, and 20 minutes to tell us about your business. We help with the words, the structure and everything else.
- Q: Can I update the website myself?
  - A: Yes. On the Business and Premium packages, you get a simple dashboard to change text, images, products and blog posts. No coding needed.
- Q: Will my website show up on Google?
  - A: We build every site with what Google looks for: speed, mobile-friendly design, clean structure and proper page titles. We also set up your Google Business profile, so you can appear on Maps.
- Q: Do I own my website?
  - A: Yes. Your domain, your design and your content belong to you.
- Q: I'm not in Nigeria. Can we still work together?
  - A: Absolutely. We work across time zones with video calls, live preview links and regular updates, and we can quote in USD.
- Q: What happens after launch?
  - A: We don't disappear. Every package includes support after launch, and we're here whenever you need changes or you're ready to grow.

### HOME.BOOK  (`id="book"`)
- Eyebrow: Book a free call
- Headline: Let's see what your business **could look like**.
- Lead: Tell us a little about you. We'll get back to you within {{RESPONSE_TIME}} with honest advice, even if that means you don't need us yet.
- "What happens next" (numbered):
  1. We review your answers before we call, so we don't waste your time.
  2. We call you at a time that suits you.
  3. You get a clear plan and quote. No obligation.
- Alternatives: Prefer to talk now? Call or WhatsApp {{PHONE}} · Email {{EMAIL_PUBLIC}}
- Form card title: Book your free call
- Form card subtitle: Takes about 60 seconds.
- (Form fields in §11)

### HOME.CLOSER
- Display line: Your next customer is already searching. **Make sure they find you.**
- Brand line (small, stone): Because the future belongs to businesses built for it.
- Button: Book a free call →

---

## 3. `/thank-you`
- Headline: Thank you, {firstName}. **We've got it.** (If no name: Thank you. **We've got it.**)
- Body: Your request is in. Someone from the PDN team will reach out within {{RESPONSE_TIME}} on the number you gave us.
- "While you wait":
  1. Check your inbox for a confirmation email.
  2. Have your logo and a few photos handy, if you have them.
  3. Think about one thing: what should your website do for you?
- Button: Explore our work →
- vCard link: Save our number, so you know it's us when we call

---

## 4. `/work` and case studies

**`/work` hero**
- Eyebrow: Work
- Headline: Proof, **not promises**.
- Lead: A selection of websites, AI agents and digital products we've designed and built for real businesses.
- Filters: All · Websites · Online stores · AI Agents · Digital Products (+ industries from Sanity)
- Empty filter state: Nothing here yet. New projects are on the way.

**Case study template labels**
- Meta labels: Industry · Services · Year · Live site
- Live site link: Visit the live site ↗
- Section titles: The challenge · What we built · The result
- Next: Next project
- End CTA headline: Want results like **{clientName}**?
- End CTA body: Book a free call and tell us what you're building.
- Button: Book a free call →

**Writing guide for case studies (for the team in Sanity)**
- Headline formula: *[What changed] for [who]*. Example: "A premium online store that finally matches the product." Lead with the outcome.
- Snapshot stats: real numbers only (enquiries per month, conversion rate, page speed, time to launch). If you don't have numbers, use qualitative wins in 3 words ("Launched in 3 weeks").
- Challenge: 2 short paragraphs, from the client's point of view, in the zobo rule.
- What we built: 4–6 bullets, each a feature + why it matters.
- Result: one paragraph + a real client quote (with permission).

---

## 5. Services

### `/services`
- Eyebrow: Services
- Headline: Everything your business needs to **win online**.
- Lead: Websites, AI agents and digital products, designed to work together and built to bring in customers.

**Websites** (`#websites`)
- h2: Websites that win trust and bring in customers.
- The problem: Customers judge you online before they ever contact you. A missing or outdated website quietly sends them to someone else.
- What you get:
  - Custom design, built for phones first
  - Copy written to sell, in your customer's language
  - SEO foundations and a Google Business profile
  - WhatsApp, forms and bookings connected
  - Online stores and catalogues
  - Training, so you can update it yourself
- Best for: Businesses and professionals who need to look credible and get more enquiries.
- Button: Talk to us about a website →
- Secondary link: See website packages →  (`/services/websites`)

**AI Agents** (`#ai-agents`)
- h2: An assistant that answers your customers 24/7.
- The problem: Customers message at all hours, ask the same questions, and leave when nobody answers. Every missed reply is a missed sale.
- What you get:
  - An agent trained on your products, prices and policies
  - Answers on your website and messaging channels
  - Qualifies leads and books calls for you
  - Hands over to a person when it should
  - A clear view of what customers are asking
- Best for: Businesses with lots of repeat questions or enquiries outside working hours.
- Button: See how AI agents work →  (`/ai-agents`)

**Digital Products** (`#digital-products`)
- h2: Your idea, designed, built and launched.
- The problem: You have an idea for an app, platform or tool, but no team to design, build and launch it properly.
- What you get:
  - Product strategy and scoping
  - UX and interface design
  - Development and launch
  - Improvements after launch, based on real users
- Best for: Founders and companies launching a new digital product.
- Button: Talk to us about your product →

**Digital University** (`#digital-university`)
- h2: Digital skills, made practical.
- The problem: Digital moves fast, and most courses aren't built for how business actually works.
- What you get:
  - Practical courses and digital products
  - Templates and tools you can use today
  - Learn at your own pace
- Best for: Business owners and teams who want to grow their digital skills.
- Button: Explore Digital University →

### `/services/websites`
- Eyebrow: Websites
- Headline: A website that **works as hard as you do**.
- Lead: Designed for phones, found on Google, and built to turn visitors into paying customers.
- Buttons: Book a free call → · See packages
- Pain block headline: Your website should be your best salesperson. **Is it?** (reuse cards 1, 3, 4 from HOME.PAIN)
- "What's included" headline: Everything a website needs to **bring in business**.
  - Phone-first design · Most of your customers are on their phones. We design for them first.
  - Copy that sells · We write in your customer's language, not industry jargon.
  - Found on Google · Speed, structure and page titles that search engines reward.
  - WhatsApp built in · One tap from your website to your chat.
  - Fast everywhere · Lightweight pages that load quickly, even on mobile data.
  - Easy to update · Change text, photos and products without a developer.
  - Secure and reliable · Modern hosting, SSL and backups set up for you.
  - Yours to keep · Your domain, your design, your content.
- Then: Pricing (HOME.PRICING), Process (HOME.PROCESS), Featured websites (WorkGrid filtered), FAQ (HOME.FAQ items 1–6), Booking (HOME.BOOK with "New website" pre-selected).

---

## 6. `/ai-agents`

### Hero
- Eyebrow: AI Agents
- Headline: Your customers message at 11pm. **Who's answering?**
- Lead: PDN builds AI agents that answer questions, recommend products and book appointments around the clock, in your brand's voice.
- Buttons: Book an AI agent demo → · See it in action  (`#demo`)

### Demo (`#demo`)
- Headline: A conversation that **sells while you sleep**.
- Label above the chat: Sample conversation for a bakery
- Conversation (animated typing, Phase 2 mock):
  - Customer: Hi, do you have chocolate cakes for this Saturday?
  - Agent: Yes, we do. We have 8-inch and 10-inch chocolate cakes for Saturday. The 8-inch serves about 12 people. Would you like to order one?
  - Customer: 8-inch please. Can you deliver to Lekki?
  - Agent: We can. Saturday delivery to Lekki runs from 10am to 4pm. Can I take your name and number to confirm the order?
- Caption: Your agent is trained on your own products, prices and policies.

### Use cases
- Headline: Built for **your kind of business**.
- Cards:
  - Retail and fashion · Answers questions on sizes, stock and delivery, then takes the order.
  - Restaurants and food · Shares the menu, takes orders and handles reservations.
  - Clinics and wellness · Books appointments and answers common questions, then hands over to your staff.
  - Real estate · Qualifies buyers and renters, and schedules viewings.
  - Professional services · Screens enquiries and books consultations.
  - Schools and training · Answers admissions questions and guides applicants.

### How it works
- Headline: Live in **3 steps**.
  1. We learn your business · Your products, prices, policies and the questions customers always ask.
  2. We build and train your agent · In your brand's voice, tested on real questions before it goes live.
  3. It goes live and gets better · We watch the conversations and keep improving the answers.

### Edge line
- An AI agent won't replace your team. It makes sure no customer is ever left waiting.

### FAQ (AI)
- Q: Will it sound like a robot?
  - A: No. We write its personality and tone to match your brand, and test it on real customer questions before launch.
- Q: What happens when it doesn't know the answer?
  - A: It says so politely, collects the customer's details and passes the conversation to your team.
- Q: Where can customers talk to it?
  - A: On your website, and on the messaging channels we agree for your business. We'll recommend the right ones on your call.
- Q: Is my customers' data safe?
  - A: We set up your agent so customer information is handled carefully and only used to serve your customers. We'll walk you through exactly how on the call.
- Q: How much does an AI agent cost?
  - A: It depends on what it needs to do and how many conversations it handles. Book a free call and we'll give you a clear quote.
- Booking section: reuse HOME.BOOK with "AI agent" pre-selected and headline: Let's build your **first AI agent**.

---

## 7. `/digital-university`
- Eyebrow: Digital University
- Headline: Learn what works. **Build what lasts.**
- Lead: Practical courses, digital products and tools from the team that builds for businesses every day.
- Section "What's inside": headline: Start **learning today**. Card button: Get access → · Coming soon badge: Coming soon
- Section "Who it's for":
  - Business owners · Learn to market, sell and grow online.
  - Teams · Build digital skills that move the business forward.
  - Creators and freelancers · Turn your skills into income.
- Waitlist:
  - Headline: Be first in line.
  - Body: Get notified when new courses and products drop.
  - Field placeholder: Your email
  - Button: Join the waitlist →
  - Success: You're on the list. We'll be in touch soon.

---

## 8. `/about`

### Hero
- Eyebrow: About PDN
- Headline: We build the businesses **the future belongs to**.
- Lead: Pishon Digital Network is a digital studio from Lagos, working worldwide. We design and build websites, AI agents and digital products that help ambitious businesses grow.

### The River story (4 pinned beats)
1. **The river** · In Genesis, the River Pishon winds through the land of Havilah. No one knows exactly where it ran. Only that it flowed around everything in its path.
2. **The land of gold** · That land was known for good gold and onyx stone. Strength and excellence. They're the colours we wear.
3. **A line that never ends** · Our mark is one continuous line. P for Pishon, d for Digital, and two loops for a network. Like the river, it runs past its own borders.
4. **What it means for you** · We don't build one-off projects. We build connected digital systems that keep bringing value into your business.

### What we believe
- Headline: What we **stand for**.
- Built to convert · Beautiful is the minimum. Everything we make has a job: bring you customers.
- Excellence is the standard · Gold and onyx. We hold our work to the standard of the best studios in the world.
- Clear and honest · Written agreements, straight answers and no jargon.
- Partners, not vendors · Your growth is our portfolio. We stay long after launch.

### Leadership
- Headline: The people **behind PDN**.
- Cards: {{FOUNDER_1_NAME}} · {{FOUNDER_1_ROLE}} · {{FOUNDER_1_BIO}} / {{FOUNDER_2_NAME}} · {{FOUNDER_2_ROLE}} · {{FOUNDER_2_BIO}}

### Team
- Headline: The team.
- Body: Designers, developers, strategists and storytellers, based in Lagos and working with clients worldwide.

### Inside PDN
- Headline: Inside **the studio**.
- Gallery caption (optional per image, from Sanity)

---

## 9. `/insights`
- Eyebrow: Insights
- Headline: Ideas to help your business **grow online**.
- Lead: Practical advice on websites, AI and digital growth. No fluff.
- Category chips: All · Websites · AI · Growth · Case notes
- Newsletter: Get new articles in your inbox. · Placeholder: Your email · Button: Subscribe → · Success: Subscribed. Welcome aboard.
- Article inline CTA: Want this done for you? **Book a free call.**
- Article meta: {readTime} min read · Share · Written by

**Starter article ideas (for the team to write; SEO target in brackets)**
1. Do I really need a website if I sell on Instagram? [website for Instagram business Nigeria]
2. How much does a website cost in Nigeria in 2026? [website cost Nigeria]
3. 7 signs your website is losing you customers [website not getting enquiries]
4. What is an AI agent, and does my business need one? [AI agent for small business]
5. How to get your business on Google Maps in 15 minutes [Google Business profile setup]
6. Website vs. Linktree: what your customers actually think [linktree vs website]
7. How to brief a web designer (and avoid the ones who disappear) [hire web designer Lagos]
8. Case note: how we built {{client}}'s website in {{n}} days [real project, once available]

---

## 10. `/book`
- Eyebrow: Book a free call
- Headline: 20 minutes that could **change your business**.
- Lead: Tell us about you and what you want to build. We'll come back within {{RESPONSE_TIME}} with honest advice.
- Then the "What happens next" list and form from HOME.BOOK.

---

## 11. Booking form

| Field | Label | Placeholder / options | Help / error |
|---|---|---|---|
| name | Your name | e.g. Adaeze Okafor | Error: Please tell us your name. |
| business | Business or brand name | Optional | |
| email | Email | you@business.com | Error: Please enter a valid email. |
| phone | Phone / WhatsApp | 803 000 0000 | Help: We'll call or WhatsApp you here. Error: Please enter a valid phone number. |
| audience | I am a… | Business owner · Professional · Company / SME · Client outside Nigeria | Error: Pick the one that fits best. |
| need | I need… (choose all that apply) | New website · Website redesign · Online store · AI agent · Digital product · Not sure yet | Error: Choose at least one. |
| budget (NGN) | Budget | Under ₦500k · ₦500k–₦1.5m · ₦1.5m–₦5m · ₦5m+ · Not sure yet | Help: Rough is fine. It helps us recommend the right package. |
| budget (USD) | Budget | Under $1,000 · $1,000–$3,000 · $3,000–$10,000 · $10,000+ · Not sure yet | |
| timeline | When do you want to launch? | As soon as possible · Within a month · In 1–3 months · Just exploring | |
| message | Tell us about your project | What do you sell, and what should your website do for you? | Optional |
| source | How did you hear about us? | Instagram · Facebook · Google · Referral · LinkedIn · TikTok · An AI assistant · Other | |

> Budget bands are a starting proposal. Confirm with PDN against real package prices.

- Mobile step labels: Step 1 of 2 · About you / Step 2 of 2 · Your project
- Step button: Continue →  · Back
- Submit: Book my free call →
- Submitting: Sending…
- Under submit: We'll never share your details. No spam, ever.
- Server error: Something went wrong on our side. Please try again, or call us on {{PHONE}}.
- Spam/too-fast error (rare): Please take a moment and try again.

---

## 12. Emails (Resend)

### Internal notification
- From: PDN Website <{{BOOKING_FROM_EMAIL}}>
- To: {{BOOKING_EMAIL}}
- Subject: New booking: {name} · {need} · {budget}
- Body: a table of all fields, plus UTM params, page URL, timestamp (Africa/Lagos) and a "Reply on WhatsApp" link (`https://wa.me/{phoneDigits}`).

### Auto-reply to client
- Subject: We've got your request, {firstName}
- Preview text: Here's what happens next.
- Body:

> Hi {firstName},
>
> Thank you for booking a free call with Pishon Digital Network. Your request is in, and someone from our team will reach out within {{RESPONSE_TIME}}.
>
> **Here's what happens next**
> 1. We review what you've shared, so the call is useful from the first minute.
> 2. We call or WhatsApp you on {phone}.
> 3. You get honest advice, a clear plan and a quote. No obligation.
>
> **To make the call even better**, have your logo and a few photos of your work or products handy, if you have them.
>
> Want to see what we build? {{DOMAIN}}/work
>
> Talk soon,
> The PDN team
>
> Pishon Digital Network · Because the future belongs to businesses built for it.

- Design: onyx background, gold horizontal logo (`pdn-logo-horizontal-gold`), Bricolage with fallbacks, a single gold button "See our work".

---

## 13. SEO meta

| Route | Title (≤ 60) | Description (≤ 155) |
|---|---|---|
| `/` | Pishon Digital Network · Websites & AI Agents That Bring In Customers | PDN builds websites and AI agents that make customers trust you, find you and contact you. Lagos-based, working worldwide. Book a free call. |
| `/work` | Our Work · Pishon Digital Network | Websites, AI agents and digital products PDN has designed and built for real businesses. |
| `/work/[slug]` | {Client}: {Headline} · PDN | {Snapshot summary from Sanity} |
| `/services` | Services: Websites, AI Agents & Digital Products · PDN | One partner for your whole digital journey. Websites, AI agents and digital products built to bring in customers. |
| `/services/websites` | Website Design & Development · Pishon Digital Network | Phone-first websites, found on Google and built to turn visitors into paying customers. See packages and book a free call. |
| `/ai-agents` | AI Agents for Business · Pishon Digital Network | AI agents that answer customers 24/7, recommend products and book appointments in your brand's voice. |
| `/digital-university` | Digital University · Pishon Digital Network | Practical courses, digital products and tools to grow your digital skills. |
| `/about` | About Us · Pishon Digital Network | A digital studio from Lagos, working worldwide. The story behind the River Pishon, our values and our team. |
| `/insights` | Insights · Pishon Digital Network | Practical advice on websites, AI and digital growth. No fluff. |
| `/book` | Book a Free Call · Pishon Digital Network | 20 minutes, honest advice, a clear plan. Tell us about your business. |

- OG image: generated per route with `next/og` on the onyx background with the brand radial glow: the gold mark on the right, the page title in Quirkfy (ivory) and the horizontal logo bottom-left. 1200×630.
- Organisation schema (JSON-LD): name, url, logo, sameAs (socials), contactPoint ({{PHONE}}), address ({{ADDRESS}}).

---

## 14. Misc microcopy
- 404 headline: This page **wandered off**.
- 404 body: Like the River Pishon, some paths are hard to trace. Let's get you back on course.
- 404 buttons: Back to home → · Book a free call
- Showreel modal: Play showreel · Sound on · Sound off · Close
- Currency toggle aria-label: Show prices in
- Copy-to-clipboard toast: Copied
- Loading (only if > 600ms): Loading…
- Privacy / Terms: short, plain-language pages. Claude drafts from standard templates and marks "Review by a lawyer before launch".
