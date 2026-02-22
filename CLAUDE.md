# haru. — K-beauty LP

## Overview
架空の韓国コスメブランド「haru.」のミニマル体験型LP。素肌を活かす"スキンファースト"メイクを提案。

## Tech Stack
- Vite + React (JSX, no TypeScript)
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, `@theme` tokens in `index.css`)
- GSAP + ScrollTrigger (registered in `main.jsx`)
- @studio-freight/lenis (smooth scroll)
- @react-three/fiber + drei + three (desktop 3D elements)

## Color Palette (Tailwind v4 @theme)
```
rose:       #E8B4B8   — メインアクセント（ダスティローズ）
rose-deep:  #C48B91   — CTA・強調
rose-light: #F5D6D9   — バッジ・淡いアクセント
cream:      #FBF8F5   — ページ背景
sand:       #F0EBE3   — セクション交互背景
stone:      #C4BAA8   — ミュートテキスト・ボーダー
charcoal:   #2D2926   — 見出しテキスト
warm-gray:  #6B6462   — 本文テキスト
peach:      #F4CFC6   — サブアクセント
nude:       #DFC5B5   — 第3アクセント
sage:       #B8C5B2   — 成分・自然系アクセント
```

## Fonts
- 見出し: Cormorant Garamond (`font-serif`)
- 本文: Inter + Noto Sans JP (`font-sans`)
- アクセント: Playfair Display Italic (`font-accent`)

## Directory Structure
```
src/
  App.jsx              — Root: 全セクション + レイアウト組み立て
  main.jsx             — Entry: GSAP plugin registration
  index.css            — Tailwind v4 @theme tokens, Lenis, cursor, FAQ, grain, float CSS
  components/
    layout/
      SmoothScroll.jsx   — Lenis wrapper
      CustomCursor.jsx   — Dot + ring cursor (desktop only)
      SoftOverlay.jsx    — Grain texture overlay
      Navigation.jsx     — Top bar (logo + links + mobile hamburger)
      SectionNav.jsx     — Right-side sticky dot nav (desktop)
      FixedCTA.jsx       — Fixed purchase button (bottom bar mobile, floating desktop)
      Footer.jsx         — Footer with links
    acts/
      HeroSection.jsx    — Full-viewport hero with product visuals
      BrandStory.jsx     — Pin + text reveal philosophy section
      FeatureShowcase.jsx — 2-product card grid
      TechnologySection.jsx — 3 tech stats with counter animation
      IngredientsSection.jsx — Hero ingredient + 4 sub-ingredient grid
      HowToUse.jsx       — 3-step guide
      ShadesSection.jsx  — Color swatches + texture preview
      ReviewsSection.jsx — Stats + testimonial cards
      FaqSection.jsx     — FAQ accordion
      PurchaseSection.jsx — Purchase cards + special set
    three/
      FloatingProduct.jsx  — Glass cylinder product (desktop)
      ParticleRose.jsx     — Rose petal particles (desktop)
    ui/
      SectionHeading.jsx — Section heading (en + ja)
      Button.jsx         — CTA button (primary/outline/ghost)
      Badge.jsx          — Label tag
      RevealText.jsx     — Scroll-triggered text reveal
      ProductCard.jsx    — Product card with shades & features
      IngredientCard.jsx — Ingredient info card
      StatCard.jsx       — Percentage stat with counter
      TestimonialCard.jsx — Review card
      FaqItem.jsx        — FAQ accordion item
      ShadeSwatches.jsx  — Color swatch selector
      StepCard.jsx       — Numbered step card
  hooks/
    useReducedMotion.js — useSyncExternalStore pattern
    useIsMobile.js      — useSyncExternalStore, breakpoint 768px
  data/
    brand.js       — Brand info + nav items
    products.js    — 2 products (foundation + lip)
    ingredients.js — Hero ingredient + 4 sub-ingredients
    technology.js  — 3 technology points
    reviews.js     — Stats + 3 testimonials
    faq.js         — 6 FAQ items
```

## Key Patterns
- GSAP ScrollTrigger: single timeline per pinned section (BrandStory)
- Scroll values: useRef (not useState) to avoid 60fps re-renders
- Three.js: frameloop="demand", lazy load, desktop only
- Canvas instances: max 2
- Mobile (< 768px): no 3D, no custom cursor, vertical stack, simplified animations

## Performance Rules
- Scroll progress → useRef (never useState)
- Cursor tracking → gsap.quickTo()
- Cursor state → DOM classList manipulation (no React state)
- Card hover → CSS transitions (no Three.js Canvas)
- Sections alternate cream/sand backgrounds for visual rhythm
