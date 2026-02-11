

## Portfolio Updates Plan

### 1. Hero Section Changes
**File: `src/components/portfolio/Hero.tsx`**
- Change the animated name from "Ashbin" to "Ashbin Shaji" (full name, with the viscous letter animation applied to all letters)
- Remove the "Founder of Airnext, E-onit, The Heaven Studio" line entirely
- Replace "MERN Stack Developer" with a broader title like "Full-Stack Developer & Entrepreneur" (or similar -- open to your preference)

### 2. Rename Projects Section to "Building"
**File: `src/components/portfolio/Projects.tsx`**
- Change the section heading from "Featured Projects" to "Building" to reflect that these are ventures you're actively building
- Keep all 5 existing project cards (Airnext, E-onit, The Heaven Studio, Endeavar Fitness AI, Street Outlaws Racing) as they are
- Connect the GitHub button on each card to your GitHub profile (`https://github.com/ASHBINSHAJI`) instead of being disabled -- clicking it will link to your GitHub

### 3. New "Services" Section
**New file: `src/components/portfolio/Services.tsx`**
- Create a styled table listing the 6 services you offer:
  - Business websites
  - Portfolio websites
  - Ecommerce stores
  - Booking systems
  - Website redesign
  - Bug fixing
- Each row will show a "Coming Soon" badge
- Styled to match the executive dark theme with brass accents

**File: `src/pages/Index.tsx`**
- Import and add the Services component between Projects and Contact in the page layout

### Technical Details

**Hero changes** -- the `"Ashbin".split("")` will become `"Ashbin Shaji".split("")` so each letter (including the space) gets the viscous animation. The font size may need a slight reduction on mobile to fit the longer name.

**GitHub links** -- The GitHub button on project cards will link to `https://github.com/ASHBINSHAJI` and open in a new tab, no longer disabled.

**Services table** -- Will use a clean card-based table layout with columns for Service Name and Status, each row showing a Clock icon + "Coming Soon" badge matching the existing style throughout the portfolio.
