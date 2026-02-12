

## Portfolio Overhaul Plan

This is a large update touching nearly every section. Here's everything that will change:

### 1. New Color Theme: Dark + Electric Blue
- **Base background**: Deep navy black (`#0B0F19` / `hsl(224 50% 7%)`)
- **Accent color**: Electric blue (`#3B82F6` / `hsl(217 91% 60%)`) -- using blue since you listed it first as "trust, SaaS, engineering"
- Update all CSS variables in `src/index.css` to this new palette
- Update the viscous letter animation gradients to work with the navy/blue scheme
- Update the construction banner stripe colors to match

### 2. Phone Number Update
**File: `src/components/portfolio/Contact.tsx`**
- Change phone from `+91 96450 23535` to `+91 96450 13535`
- Change WhatsApp link from `wa.me/919645023535` to `wa.me/919645013535`
- Change tel link from `tel:+919645023535` to `tel:+919645013535`

### 3. Hero Section Changes
**File: `src/components/portfolio/Hero.tsx`**
- Add a visible gap between "ASHBIN" and "SHAJI" (render as two separate words with spacing)
- Change subtitle from "Full-Stack Developer & Entrepreneur" to "Python Django Developer & Entrepreneur"
- Update specialty tags: replace "Full-Stack Development" with "Python & Django"
- Add a trust-building quote below the subtitle: *"Can I trust this guy to finish my project?"*

### 4. About Section Update
**File: `src/components/portfolio/About.tsx`**
- Change "MERN Stack Developer" to "Python Django Developer"
- Update the Full-Stack Expertise card to reference Python, Django, and related tools

### 5. Skills Section Updates
**File: `src/components/portfolio/Skills.tsx`**
- **Creative & Animation**: Remove "Premiere Pro" and "Motion Graphics", keep Blender, After Effects, UI/UX Design
- **AI & Tools**: Add "Lovable" and "Affinity" to the list
- **New category**: Add "DevOps" with common tools (Docker, CI/CD, Linux, Nginx, AWS/Cloud)

### 6. Airnext Description Update
**File: `src/components/portfolio/Projects.tsx`**
- Update Airnext description to include: "A smart home system I am engineering (IoT + Web Dashboard + Automation)"

### 7. New "Project Ideas" Section
**New file: `src/components/portfolio/ProjectIdeas.tsx`**
- Add after the Building section
- Show a grid of blurred project idea cards with a "Coming Soon" overlay
- Ideas will be partially visible but blurred to tease future work

### 8. Move "Buy Me a Tea" Section
- Remove from `Contact.tsx`
- Place it after the Services section (before Contact)
- Create a standalone `BuyMeATea.tsx` component or integrate into page layout

### 9. Page Layout Update
**File: `src/pages/Index.tsx`**
- New order: Hero > About > Skills > Projects (Building) > **ProjectIdeas** > Services > **BuyMeATea** > Contact

---

### Technical Details

**Color System (`src/index.css`)**
- `:root` background changes from `hsl(20 8% 7%)` to `hsl(224 50% 7%)` (deep navy)
- `--accent` changes from `hsl(36 15% 55%)` (brass) to `hsl(217 91% 60%)` (electric blue)
- All foreground, card, muted, border colors shift from warm brown tones to cool navy/slate tones
- `--accent-foreground` becomes white for contrast on blue buttons

**Hero name gap**: Split the animation into two groups -- "ASHBIN" and "SHAJI" -- with a `gap-4` or `mx-2` spacer between them instead of rendering as one continuous string.

**Project Ideas section**: A grid of 4-6 placeholder cards with `blur-sm` CSS filter and a centered "Coming Soon" overlay badge on top, creating a teaser effect.

**Files to modify**: `src/index.css`, `Hero.tsx`, `About.tsx`, `Skills.tsx`, `Projects.tsx`, `Contact.tsx`, `Services.tsx`, `Index.tsx`
**Files to create**: `src/components/portfolio/ProjectIdeas.tsx`, `src/components/portfolio/BuyMeATea.tsx`
