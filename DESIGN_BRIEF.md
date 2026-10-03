# Parentcraft India: Design Brief and Prompt Pack

Put this file and `index.html` in one empty folder, open the folder in Google Antigravity, and follow the prompts in order.

## 1. Product
Parentcraft India helps parents of children aged 4–17 find verified child counsellors, psychologists and career guides, take assessments, read guidance and join events. Professionals join through a separate path.

**Primary job of the homepage:** a worried parent understands the offer in 5 seconds and starts a concern → expert search.

## 2. Design tokens
| Token | Light | Dark |
|---|---|---|
| Background | #F7F5FF | #15122E |
| Surface | #FFFFFF | #201C45 |
| Ink (text) | #241F4A | #F0EEFF |
| Muted text | #5E5A80 | #B5B0DA |
| Primary (violet) | #5B48D6 | #6F5CF0 |
| Main CTA (sun yellow) | #FFC247 on #3A2600 text | same |
| Growth (mint) | #BDEBDD / #7BCBAE | same |
| Warmth (coral) | #FF8F7A | same |

- **Fonts:** Bricolage Grotesque (headings), Noto Sans and Noto Sans Devanagari (body, Hindi).
- **Shape:** 16–28px radius, soft violet shadows, generous whitespace.
- **Motion:** gentle float, drift and fade-up. Must respect `prefers-reduced-motion`.
- **Voice:** plain, warm, sentence case. No jargon.

## 3. Page order
Header → Hero with concern finder and illustration → Trust strip → Topic ticker → Concern cards → How it works → Mood check → Expert cards → Parent stories → Assessment preview → Events → Professionals band → FAQ → Footer. A floating "Need urgent help?" button opens a crisis panel.

## 4. Rules that must not change
- Crisis numbers must be verified before launch: Tele-MANAS 14416, Childline 1098, Emergency 112.
- No invented statistics, ratings or testimonials. Every sample item is labelled "sample" until replaced.
- WCAG 2.2 AA: 4.5:1 contrast, visible focus, 44px touch targets.
- Hindi must be complete, not only the hero.
- Mobile first. Target LCP under 2.5s on mid-range Android over 4G.
- Children's data: the parent is the account holder. Include a DPDP Act consent step.

## 5. Prompt sequence for Antigravity
Use **Planning mode** for prompts 1, 2 and 6. Review the plan before approving. Use Fast mode for small fixes.

**Prompt 1: Structure**
> Read DESIGN_BRIEF.md and index.html. Convert this static page into a Next.js (App Router) + TypeScript + Tailwind project. Create reusable components for Header, Hero, ConcernFinder, ConcernCard, ExpertCard, MoodCheck, StoryCard, AssessmentPreview, EventCard, ProBand, FAQ, Footer and UrgentHelpDialog. Move all colours, fonts and radii into Tailwind theme tokens from section 2. Keep the look identical. Show me the plan first.

**Prompt 2: Content and data**
> Move all text into a typed content file with English and Hindi versions, and add a language switcher that translates the whole site. Move expert, event and story data into JSON files so a CMS can replace them later. Keep the "sample" labels.

**Prompt 3: Visual polish (the pro-level pass)**
> Act as a senior product designer. Improve visual hierarchy, spacing rhythm (8px grid) and type scale across the page. Make the hero feel more premium: refine the illustration, add layered depth and one orchestrated entrance animation. Keep the palette. Do not add stock-template effects. Capture before and after screenshots in the browser and explain each change.

**Prompt 4: Illustration and imagery**
> Create a consistent set of 8 flat illustrations (one per concern card) and 3 hero scenes in the same style as the current hero. Export them as optimised SVG. Leave clearly named slots where real photos of counsellors and families will go, with alt text.

**Prompt 5: Pages**
> Add an expert profile page with a sticky mobile "Book" bar, an availability calendar, price, languages and verification details. Then add the booking flow: concern → age → matched experts → slot → UPI payment → WhatsApp confirmation. Use mock data and a guest OTP login screen.

**Prompt 6: Quality check**
> Using the browser agent, test the site at 375px, 768px and 1440px. Check keyboard navigation, focus order, contrast, reduced-motion behaviour and Hindi layout. Run Lighthouse, fix everything below 90, and report the results with screenshots.

## 6. Make it look truly professional
1. **Real photography:** commission or license photos of Indian families and counsellors, with signed consent.
2. **Custom illustration:** hire an illustrator to build one character family. This is the strongest brand asset.
3. **Real proof:** verified expert counts, real reviews and partner names, only once true.
4. **Usability test:** watch 5 parents complete "find an expert" on a phone, then fix what slows them.
5. **Optional Figma step:** import the finished site into Figma to review spacing and hand a tidy file to future designers.

## 7. Launch checklist
- [ ] Crisis numbers verified
- [ ] Privacy policy and cancellation policy in plain language
- [ ] Real expert data and verified badges
- [ ] Hindi reviewed by a native speaker
- [ ] Analytics with privacy masking
- [ ] Domain, HTTPS, sitemap, schema markup
