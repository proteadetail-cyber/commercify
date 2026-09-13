// Commercify Master Web App Data Store

const COMMERCIFY_STAGES = [
  {
    id: "niche",
    num: 1,
    eyebrow: "STAGE 1 OF 6",
    title: "Find a Niche Worth Building Around",
    subtitle: "The single biggest reason stores fail isn't ads or design — it's picking a product nobody was actively looking for. Validate demand before you build anything.",
    icon: "🎯",
    color: "#95BF47",
    steps: [
      {
        num: 1,
        title: "Start from a problem, not a product",
        content: "Products that sell solve a specific, recurring annoyance — they make something easier, faster, cheaper, or more comfortable. Instead of asking 'what's trending,' ask 'what do people complain about, work around, or buy repeatedly?' Good sources: Reddit and Facebook group complaints in a hobby you know, Amazon reviews on adjacent products (read the 3-star reviews — that's where the unmet need lives), and returning-customer categories like pet care, home organization, and personal wellness.",
        takeaway: "Favor niches with a reason to exist beyond price — a story, a use-case, or a specific audience (e.g. 'desk setups for small apartments' beats generic 'home office supplies')."
      },
      {
        num: 2,
        title: "Check that the demand is real",
        content: "Before committing, size the market with free and low-cost tools:",
        tools: [
          "Google Trends — is interest flat, rising, or seasonal?",
          "Google Keyword Planner — monthly search volume",
          "Amazon Best Sellers & Movers & Shakers",
          "TikTok & Instagram hashtag view counts",
          "EcomHunt / Minea — trending product feeds"
        ],
        callout: "Rule of thumb: you want steady or rising interest, not a single viral spike. A spike means you're already late; a steady climb means there's room to build a brand around it."
      },
      {
        num: 3,
        title: "Do the margin math before you fall in love with it",
        content: "A niche only works if the numbers work. As a starting filter: your product should sell for at least 3–4× your landed cost (product + shipping + packaging), so there's room left for ads, platform fees, and returns after you pay for the item itself.",
        avoid: [
          "Fragile items (high return/breakage rates)",
          "Anything trademarked or brand-restricted",
          "Products requiring strict certifications (electronics, cosmetics, kids' products)",
          "Pure commodity items you cannot differentiate from a marketplace listing"
        ]
      }
    ],
    actionItems: [
      { id: "niche-1", text: "Identify 3 specific pain points in a hobby or category you understand" },
      { id: "niche-2", text: "Check Google Trends for 12-month steady or upward search volume" },
      { id: "niche-3", text: "Read 3-star Amazon reviews to discover unmet customer expectations" },
      { id: "niche-4", text: "Confirm supplier landed cost allows at least 3.5x retail markup" }
    ]
  },
  {
    id: "platform",
    num: 2,
    eyebrow: "STAGE 2 OF 6",
    title: "Choose Your E-Commerce Platform",
    subtitle: "There's no single 'best' platform — only the best fit for your technical comfort, budget, and how much control you want.",
    icon: "⚡",
    color: "#95BF47",
    comparison: [
      { platform: "Shopify", bestFor: "Beginners who want the fastest path to a working store", cost: "~$25–$65+", tradeoff: "Easiest setup and huge app ecosystem, but app costs add up" },
      { platform: "WooCommerce", bestFor: "People comfortable with WordPress who want full control", cost: "Hosting (~$10–$30)", tradeoff: "Cheaper long-term, more setup and maintenance work" },
      { platform: "BigCommerce", bestFor: "Stores that want built-in features without stacking apps", cost: "~$29–$79+", tradeoff: "Fewer themes than Shopify, steeper learning curve" },
      { platform: "Etsy", bestFor: "Handmade, vintage, or craft-style products", cost: "Listing + sale fees", tradeoff: "Built-in traffic, but you don't own customer relationship" },
      { platform: "TikTok Shop / Amazon", bestFor: "Riding existing marketplace traffic", cost: "Referral fees per sale", tradeoff: "Fast distribution, but competing on price inside their walls" }
    ],
    recommendation: "If this is your first store: start on Shopify. The goal early on is testing whether the niche and offer work — not fighting your website builder. You can always migrate or add a marketplace channel once you have traction.",
    actionItems: [
      { id: "plat-1", text: "Select your e-commerce platform based on tech skill and budget" },
      { id: "plat-2", text: "Register your custom domain name (keep it short and clean)" },
      { id: "plat-3", text: "Configure primary currency, shipping zones, and tax settings" }
    ]
  },
  {
    id: "sourcing",
    num: 3,
    eyebrow: "STAGE 3 OF 6",
    title: "Source Quality Products",
    subtitle: "How you source shapes your margins, your shipping times, and how much you can differentiate from every other store selling the same thing.",
    icon: "📦",
    color: "#95BF47",
    methods: [
      {
        tag: "FASTEST TO START",
        title: "Dropshipping",
        desc: "You list products a supplier ships directly to customers. Low upfront cost, but thinner margins and less quality control.",
        tools: ["CJdropshipping", "Zendrop", "Spocket (US/EU)"]
      },
      {
        tag: "CUSTOM & BRANDED",
        title: "Print-on-demand",
        desc: "Your own designs printed on blanks (apparel, mugs, posters) only when a customer orders. Great for creators and niche audiences.",
        tools: ["Printful", "Printify"]
      },
      {
        tag: "BEST MARGINS AT SCALE",
        title: "Private label / wholesale",
        desc: "Buy in bulk from a manufacturer, often under your own branding. Higher upfront cost and MOQs, but the strongest margins and most control.",
        tools: ["Alibaba", "Local manufacturers", "Trade shows"]
      }
    ],
    vettingChecklist: [
      "Order a sample yourself — check quality and real shipping time",
      "Ask for their defect/return rate and warranty terms",
      "Get landed cost in writing (product + freight + duties)",
      "Confirm packaging can carry your custom branding or logo inserts"
    ],
    actionItems: [
      { id: "source-1", text: "Order product samples to evaluate packaging and shipping speed" },
      { id: "source-2", text: "Calculate exact landed cost per unit including freight and customs" },
      { id: "source-3", text: "Confirm supplier SLA (order dispatch within 24-48 hours)" }
    ]
  },
  {
    id: "build",
    num: 4,
    eyebrow: "STAGE 4 OF 6",
    title: "Build a High-Converting Store",
    subtitle: "A store's job is to remove doubt. Every element on the page should make a visitor more confident about buying, not just look nice.",
    icon: "🎨",
    color: "#95BF47",
    pillars: [
      {
        title: "The non-negotiable pages",
        desc: "Home, a product page with real photos and a clear return policy, an About page that explains who's behind the store, a visible shipping/returns page, and a contact method that isn't just a form. Stores that skip these lose sales to doubt."
      },
      {
        title: "Speed beats decoration",
        desc: "Every extra app and oversized image slows your store down, and slow stores lose mobile buyers before the page even finishes loading. Pick a lightweight theme, compress images, and only install apps that earn their keep."
      },
      {
        title: "Trust signals, placed deliberately",
        desc: "Real customer photos and reviews near the buy button, a clearly stated return window, secure-checkout badges, and honest shipping-time estimates all reduce the 'is this legit?' hesitation."
      },
      {
        title: "One clear next step per page",
        desc: "Don't compete your own 'Add to cart' button against five other calls to action. Every page should point toward one obvious next step."
      }
    ],
    mustHaveApps: [
      { name: "Judge.me / Loox", role: "Product reviews with photos" },
      { name: "Klaviyo / Privy", role: "Email capture, popups & flows" },
      { name: "PageFly / GemPages", role: "Custom high-converting landing page builder" },
      { name: "TinyIMG", role: "Automatic image compression & speed SEO" },
      { name: "Gorgias", role: "Unified multi-channel customer inbox" }
    ],
    actionItems: [
      { id: "build-1", text: "Set up lightweight theme optimized for mobile speed" },
      { id: "build-2", text: "Publish clear Shipping, Returns, Privacy Policy, and Contact pages" },
      { id: "build-3", text: "Compress all product images to under 150KB" },
      { id: "build-4", text: "Install photo reviews app and place badges near Buy button" }
    ]
  },
  {
    id: "ads",
    num: 5,
    eyebrow: "STAGE 5 OF 6",
    title: "Acquire Your First Customers",
    subtitle: "Every channel plays a different role. Beginners usually get the best return picking one paid channel plus one organic channel, rather than spreading thin.",
    icon: "📣",
    color: "#95BF47",
    channels: [
      { tag: "BEST FOR TESTING A NEW PRODUCT", title: "Meta Ads (Facebook & Instagram)", desc: "Deep targeting and a mature ad system make this the default starting point for cold traffic. Success depends heavily on the creative — plan to test several ad angles, not just one." },
      { tag: "BEST FOR VISUAL, TREND-LED PRODUCTS", title: "TikTok Ads & Spark Ads", desc: "Rewards native, unpolished-feeling video over traditional ad production. Works especially well for products that demonstrate well in 15–30 seconds." },
      { tag: "BEST FOR CAPTURING INTENT", title: "Google Search & Shopping Ads", desc: "Catches people already searching for what you sell. Lower volume than social early on, but often the highest intent-to-purchase per click." },
      { tag: "SLOWER, BUT FREE", title: "Organic content (TikTok, Reels, Pinterest)", desc: "Consistent posting builds a following that reduces your dependence on ad spend over time. Treat it as a compounding asset, not a quick win." },
      { tag: "CHEAPEST SALES YOU'LL EVER MAKE", title: "Email & SMS (Klaviyo, Postscript)", desc: "Abandoned-cart flows and welcome series recover revenue you already paid to earn. Set these up before you scale ad spend — they pay for themselves." },
      { tag: "TRUST BY PROXY", title: "Micro-influencer & UGC seeding", desc: "Sending free product to a handful of small, relevant creators often produces better cost-per-sale than a single big-name partnership, and gives you authentic footage to reuse in ads." }
    ],
    budgetSplit: [
      { pct: "60%", allocation: "Meta or TikTok ads (finding what converts)" },
      { pct: "20%", allocation: "Email & SMS recovery tools & automated flows" },
      { pct: "20%", allocation: "Product seeding to micro-creators for UGC footage" }
    ],
    actionItems: [
      { id: "ads-1", text: "Set up Meta Pixel / TikTok Pixel and test conversion tracking" },
      { id: "ads-2", text: "Create 3 distinct ad hooks (problem-solution, unboxing, UGC review)" },
      { id: "ads-3", text: "Activate automated Abandoned Cart and Welcome Email series" },
      { id: "ads-4", text: "Reach out to 10 micro-creators with free sample product offers" }
    ]
  },
  {
    id: "scale",
    num: 6,
    eyebrow: "STAGE 6 OF 6",
    title: "Operate Smoothly & Scale",
    subtitle: "Once orders are steady, the job shifts from 'get any sale' to 'get sales efficiently and keep customers coming back.'",
    icon: "📈",
    color: "#95BF47",
    pillars: [
      { title: "Fulfillment Strategy", desc: "Self-fulfilling gives you control and higher margins early on. Once volume is consistent, a 3PL (third-party logistics warehouse) frees your time and often gets faster shipping rates than you can alone." },
      { title: "Customer Support Automation", desc: "Route every channel — email, DMs, chat — into one shared inbox (Gorgias, Zendesk) so nothing gets missed. Fast responses to shipping questions prevent most chargebacks before they happen." },
      { title: "Know Your Core Metrics", desc: "Track customer acquisition cost (CAC), average order value (AOV), and customer lifetime value (LTV) — not just revenue. A store growing revenue while LTV shrinks is quietly getting weaker." },
      { title: "Reinvest With Intent", desc: "Put early profit into: a second and third best-selling product, better creative testing, and retention (email flows, loyalty perks) — in that order. New customers get expensive; existing customers are your cheapest growth." }
    ],
    actionItems: [
      { id: "scale-1", text: "Establish a weekly scorecard tracking CAC, AOV, LTV, and Net Margin" },
      { id: "scale-2", text: "Set up Gorgias/Zendesk for unified customer support ticket routing" },
      { id: "scale-3", text: "Evaluate 3PL partners once exceeding 100 orders per month" },
      { id: "scale-4", text: "Introduce cross-sell and post-purchase upsell offers to bump AOV" }
    ]
  }
];

const PROFIT_MATH_EXAMPLE = {
  title: "A simple, honest profit example",
  subtitle: "This is illustrative, not a promise — real numbers vary by niche and ad performance. But this is the math you should be running on your own product before scaling.",
  defaults: {
    salePrice: 39.00,
    landedCost: 9.50,
    feePercent: 4.0,
    adCac: 14.00
  },
  lesson: "If your ad cost per sale creeps above what's left after product and fees, you're paying to lose money — no amount of 'just get more traffic' fixes that. Track this number weekly. The stores that survive are the ones that fix a broken margin before scaling spend, not after."
};

const COMMON_MISTAKES = [
  "Launching with an untested niche. No amount of good design or ad budget fixes a product nobody wanted in the first place.",
  "Chasing every trending product. Constant pivoting means you never build the brand recognition or reviews that make later sales easier.",
  "Skipping the margin math. A cheap-looking product with thin margins can't survive ad costs or a return.",
  "Scaling ad spend before the store converts. More traffic to a leaky page just means losing money faster.",
  "Ignoring email & SMS marketing. These are the highest-margin sales you'll ever make, and most beginners never turn them on."
];

const TOOLKIT_CATEGORIES = [
  {
    category: "Platforms",
    tools: [
      { name: "Shopify", desc: "Easiest overall e-commerce website builder", tag: "RECOMMENDED" },
      { name: "WooCommerce", desc: "Full control WordPress e-commerce plugin", tag: "OPEN SOURCE" },
      { name: "BigCommerce", desc: "Built-in complex feature suite", tag: "ENTERPRISE" },
      { name: "Etsy", desc: "Handmade & craft marketplace", tag: "MARKETPLACE" }
    ]
  },
  {
    category: "Sourcing",
    tools: [
      { name: "CJdropshipping", desc: "Global product sourcing & dropship fulfillment", tag: "DROPSHIP" },
      { name: "Zendrop", desc: "Fast US warehouse dropship supplier", tag: "FAST SHIP" },
      { name: "Printful / Printify", desc: "On-demand custom product printing", tag: "POD" },
      { name: "Alibaba", desc: "Direct manufacturer bulk & private label", tag: "WHOLESALE" }
    ]
  },
  {
    category: "Store & Design",
    tools: [
      { name: "PageFly / GemPages", desc: "Drag-and-drop landing page designer", tag: "BUILDER" },
      { name: "Judge.me / Loox", desc: "Social proof photo reviews system", tag: "REVIEWS" },
      { name: "TinyIMG", desc: "Image compressor & site speed booster", tag: "SPEED" },
      { name: "Canva", desc: "Quick graphic assets and ad creative editor", tag: "GRAPHICS" }
    ]
  },
  {
    category: "Marketing",
    tools: [
      { name: "Meta Ads Manager", desc: "Facebook & Instagram targeted advertising", tag: "PAID ADS" },
      { name: "TikTok Ads Manager", desc: "Short-form video advertising platform", tag: "PAID ADS" },
      { name: "Google Ads", desc: "High-intent search & shopping campaign ads", tag: "SEARCH" },
      { name: "Klaviyo / Postscript", desc: "Automated e-commerce email & SMS flows", tag: "EMAIL/SMS" }
    ]
  },
  {
    category: "Research",
    tools: [
      { name: "Google Trends", desc: "Real-time search interest & seasonal trends", tag: "FREE" },
      { name: "EcomHunt / Minea", desc: "Curated winning product analytics feeds", tag: "RESEARCH" },
      { name: "Google Keyword Planner", desc: "Monthly search volume & CPC estimator", tag: "SEO/ADS" }
    ]
  },
  {
    category: "Support & Operations",
    tools: [
      { name: "Gorgias", desc: "Helpdesk aggregating email, chat & DMs", tag: "HELPDESK" },
      { name: "Zendesk", desc: "Customer service platform for scaling teams", tag: "SUPPORT" },
      { name: "Tidio", desc: "Live chat with automated AI bots", tag: "CHAT" }
    ]
  },
  {
    category: "Analytics & Attribution",
    tools: [
      { name: "Shopify Analytics", desc: "Native store conversion & sales dashboard", tag: "BUILT-IN" },
      { name: "Google Analytics 4", desc: "Detailed customer behavior & traffic tracking", tag: "ANALYTICS" },
      { name: "Triple Whale / Northbeam", desc: "Multi-touch ad attribution engine", tag: "ATTRIBUTION" }
    ]
  },
  {
    category: "Fulfillment",
    tools: [
      { name: "ShipBob / ShipStation", desc: "3PL warehouse fulfillment & discounted labels", tag: "LOGISTICS" },
      { name: "Self-fulfillment", desc: "Packing & shipping directly in early stage", tag: "HANDS-ON" }
    ]
  }
];

const CURATED_VIDEOS = [
  {
    id: "vid-1",
    rank: "TOP 10 — #1",
    creator: "Biaheza",
    channel: "youtube.com/@biaheza · 125M+ channel views",
    stageId: "niche",
    stageName: "Stage 1: Niche Research",
    why: "His product-research and 'why this store failed' style videos are some of the most watched breakdowns of what separates a validated niche from a guess.",
    url: "https://www.youtube.com/channel/UCs5wAPodliO0oVxiTD8ruvg",
    tag: "PRODUCT RESEARCH"
  },
  {
    id: "vid-2",
    rank: "TOP 10 — #2",
    creator: "Wholesale Ted",
    channel: "youtube.com/@WholesaleTed · product and niche research",
    stageId: "niche",
    stageName: "Stage 1: Niche Research",
    why: "Consistently ranked by dropshipping roundups as the go-to channel for sourcing and finding winning products with actual data behind the picks, not just gut feel.",
    url: "https://www.youtube.com/@WholesaleTed",
    tag: "NICHE VALIDATION"
  },
  {
    id: "vid-3",
    rank: "TOP 10 — #3",
    creator: "Kevin David",
    channel: "1.46M subscribers · Shopify and Amazon store setup",
    stageId: "platform",
    stageName: "Stage 2: Platform Setup",
    why: "His step-by-step store setup walkthroughs have introduced more total beginners to the platform mechanics than almost any other channel in this space.",
    url: "https://www.youtube.com/channel/UC_MTE8H-i_spop-Gc9tOCDQ",
    tag: "SHOPIFY SETUP"
  },
  {
    id: "vid-4",
    rank: "TOP 10 — #4",
    creator: "Learn With Shopify",
    channel: "youtube.com/@learnwithshopify · Official education channel",
    stageId: "platform",
    stageName: "Stage 2: Platform Setup",
    why: "Because Shopify makes it themselves, this is the one channel guaranteed to reflect the current admin interface rather than a two-year-old layout that's since changed.",
    url: "https://www.youtube.com/@learnwithshopify",
    tag: "OFFICIAL GUIDES"
  },
  {
    id: "vid-5",
    rank: "TOP 10 — #5",
    creator: "Wholesale Ted",
    channel: "youtube.com/@WholesaleTed · supplier vetting",
    stageId: "sourcing",
    stageName: "Stage 3: Sourcing",
    why: "Also earns its spot here — the channel is as much about finding legitimate suppliers as it is about picking products, which most niche-focused channels skip.",
    url: "https://www.youtube.com/@WholesaleTed",
    tag: "SUPPLIER VETTING"
  },
  {
    id: "vid-6",
    rank: "TOP 10 — #6",
    creator: "My Wife Quit Her Job (Steve Chou)",
    channel: "youtube.com/@mywifequitherjob · long-running education",
    stageId: "sourcing",
    stageName: "Stage 3: Sourcing",
    why: "Steve Chou built a real private-label brand before teaching it, and his channel is one of the few that treats wholesale and private-label sourcing as seriously as dropshipping.",
    url: "https://www.youtube.com/@mywifequitherjob",
    tag: "PRIVATE LABEL"
  },
  {
    id: "vid-7",
    rank: "TOP 10 — #7",
    creator: "Ac Hampton",
    channel: "305K+ subscribers · active 6-7 figure store owner",
    stageId: "build",
    stageName: "Stage 4: Store Build",
    why: "His build-out videos come from someone actively running stores at scale, so the store-design advice is tested against real conversion data, not theory.",
    url: "https://www.youtube.com/@AcHampton",
    tag: "CONVERSION DESIGN"
  },
  {
    id: "vid-8",
    rank: "TOP 10 — #8",
    creator: "Learn With Shopify",
    channel: "youtube.com/@learnwithshopify · conversion tutorials",
    stageId: "build",
    stageName: "Stage 4: Store Build",
    why: "Also worth a second visit here for their page-by-page store build tutorials — home page, product page, and checkout — using the actual current theme editor.",
    url: "https://www.youtube.com/@learnwithshopify",
    tag: "THEME BUILDER"
  },
  {
    id: "vid-9",
    rank: "TOP 10 — #9",
    creator: "Sebastian Ghiorghiu",
    channel: "youtube.com/@sebb · paid-ads strategy",
    stageId: "ads",
    stageName: "Stage 5: Advertising",
    why: "Focuses heavily on the ad side — creative angles, budget structuring, and scaling spend once a product proves itself — more than any other channel on this list.",
    url: "https://www.youtube.com/@sebb",
    tag: "META & TIKTOK ADS"
  },
  {
    id: "vid-10",
    rank: "TOP 10 — #10",
    creator: "Verum Ecom",
    channel: "127K subscribers · data-driven strategy",
    stageId: "ads",
    stageName: "Stage 5: Advertising",
    why: "Where a lot of ad-focused channels lead with income screenshots, this one breaks down real return-on-ad-spend numbers and why campaigns actually fail.",
    url: "https://www.youtube.com/channel/UCHMxkQsC2jpuhxhSvfzJ9CQ",
    tag: "ROAS ANALYTICS"
  },
  {
    id: "vid-11",
    rank: "ALSO ESSENTIAL",
    creator: "Davie Fogarty",
    channel: "youtube.com/@DavieFogarty · Founder of The Oodie (A$600M+ Sales)",
    stageId: "scale",
    stageName: "Stage 6: Scaling",
    why: "Almost nobody teaching ecommerce has actually scaled a brand to this size — his channel shows what running the business looks like after the first sale, not just how to get it.",
    url: "https://www.youtube.com/@DavieFogarty",
    tag: "8-FIGURE SCALING"
  },
  {
    id: "vid-12",
    rank: "HIDDEN GEM ★",
    creator: "InvolvingChris",
    channel: "Small channel posting twice a month",
    stageId: "scale",
    stageName: "Stage 6: Scaling",
    why: "His video 'How I Built a $10,000,000 Business at Age 25' is a genuinely detailed walkthrough of the unglamorous parts of scaling a real ecommerce brand.",
    url: "https://www.youtube.com/watch?v=EvxMyqVcr1E",
    tag: "HIDDEN GEM"
  }
];
