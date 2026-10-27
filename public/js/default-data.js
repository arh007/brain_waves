// ========================================================
// BRAIN WAVES — DEFAULT STATIC DATA (OFFLINE & GITHUB PAGES)
// ========================================================

window.BW_DEFAULT_DATA = {
  settings: {
    studio_name: "BRAIN WAVES",
    brand_tagline: "WE TURN IDEAS INTO DIGITAL EXPERIENCES",
    primary_email: "hello@brainwaves.studio",
    inquiries_email: "projects@brainwaves.studio",
    office_location: "Jakarta · Tokyo · Zurich (Global Remote Studio)",
    timezone_display: "WIB (UTC+7) · Active Hub",
    seo_title: "BRAIN WAVES — Independent Digital Creative Studio",
    seo_description: "A futuristic digital agency turning bold ideas into brands, products, and immersive experiences.",
    availability_status: "AVAILABLE FOR Q4 / 2026 ENGAGEMENTS",
    hero_title_1: "IDEAS ARE JUST",
    hero_title_2: "THE BEGINNING.",
    hero_subtitle: "An independent digital creative studio turning bold ideas into brands, products, and immersive experiences that define tomorrow.",
    about_title: "WHERE RADICAL IMAGINATION MEETS COMPUTATIONAL PRECISION",
    about_lead: "We operate at the volatile intersection of design engineering, spatial computing, and synthetic intelligence."
  },

  services: [
    {
      id: 1,
      name: "Brand Strategy & Visual Identity",
      slug: "brand-strategy-identity",
      icon: "fingerprint",
      summary: "Brand audit, market positioning, verbal identity, dynamic logo systems, and comprehensive brand bibles.",
      description: "We define the conceptual core of visionary brands. By blending cultural anthropology, deep market intelligence, and experimental typography, we forge brand identities that cut through algorithmic noise and build lasting emotional equity.",
      deliverables: ["Market & Competitor Positioning Report", "Visual Identity Architecture & Dynamic Mark", "Interactive Digital Brand Book", "Editorial Typography Guidelines", "Packaging & Physical Collateral"],
      process_steps: ["01 Cultural Archaeology & Market Deconstruction", "02 Verbal Identity & Core Narrative", "03 Visual Exploration & Generative Concepts", "04 Design System Assembly & Guidelines"],
      faq: [
        { q: "What is the typical timeframe for a full rebrand?", a: "Comprehensive brand transformations generally take 4 to 8 weeks depending on organisational complexity." },
        { q: "Do you provide print and packaging production specs?", a: "Yes, we provide end-to-end production-ready print vectors, material curation, and Pantone color separation." }
      ],
      sort_order: 1,
      is_published: 1
    },
    {
      id: 2,
      name: "Digital Product Design (UI/UX)",
      slug: "digital-product-design",
      icon: "panels-top-left",
      summary: "User journey mapping, cognitive ergonomics, high-velocity wireframing, enterprise design systems, and clickable prototypes.",
      description: "We craft digital products that balance aesthetic grandeur with ruthless usability. From complex multi-tenant SaaS dashboards to bespoke mobile consumer applications, we engineer experiences that turn first-time visitors into evangelists.",
      deliverables: ["Cognitive UX Audits & Heatmap Analysis", "Interactive Figma Design Systems with Tokens", "Clickable Micro-interaction Prototypes", "WCAG 2.2 AA Accessibility Compliance Docs", "Developer Handover Specs with Zero Ambiguity"],
      process_steps: ["01 Behavioral Discovery & User Journey Mapping", "02 Information Architecture & Wireframing", "03 High-Fidelity UI Craftsmanship", "04 Usability Stress-Testing & Token Handoff"],
      faq: [
        { q: "How do you handle collaboration with our internal engineering team?", a: "We work inside unified design tokens, inspectable Figma variables, and participate in sprint ceremonies to ensure 100% fidelity." }
      ],
      sort_order: 2,
      is_published: 1
    },
    {
      id: 3,
      name: "Web & Application Engineering",
      slug: "web-application-engineering",
      icon: "code-2",
      summary: "Bespoke web applications, reactive client portals, custom headless CMS engines, and ultra-optimized architectures.",
      description: "We engineer the digital frontlines. Utilizing modern frameworks, server-driven architectures, and lightweight micro-services, we guarantee lightning-fast load times (<0.4s), bulletproof security, and seamless API integrations.",
      deliverables: ["Custom Full-Stack Application Repository", "Integrated Headless Content Management Engine", "Automated CI/CD Deployment Pipelines", "Core Web Vitals Optimization (100% Score)", "Full API Documentation & Postman Suites"],
      process_steps: ["01 Technical Architecture & Database Modeling", "02 API Contract & Schema Definition", "03 Component-Driven Frontend & Backend Build", "04 Penetration Testing & Production Launch"],
      faq: [
        { q: "What tech stacks do you support?", a: "We specialize in modern Laravel/PHP, Node.js/TypeScript, Vite, and high-performance relational databases with Redis caching." }
      ],
      sort_order: 3,
      is_published: 1
    },
    {
      id: 4,
      name: "Creative Campaigns & Visual Direction",
      slug: "creative-campaigns-visual-direction",
      icon: "megaphone",
      summary: "High-voltage digital launch campaigns, viral storytelling, generative visual assets, and cross-platform art direction.",
      description: "We manufacture cultural moments. We construct integrated campaigns that arrest attention across organic social channels, interactive billboard activations, and immersive microsites.",
      deliverables: ["Campaign Narrative & Strategic Key Visuals", "Multi-Format Social Kinetic Video Assets", "Interactive Microsite Strategy & Art Direction", "Influencer & Creator Media Kits"],
      process_steps: ["01 Strategic Spark & Cultural Hook", "02 Narrative Scriptwriting & Storyboarding", "03 Multidisciplinary Asset Production", "04 Omnichannel Rollout & Telemetry"],
      faq: [
        { q: "Can you handle production of 3D motion graphics for social ads?", a: "Yes, our in-house motion lab renders cinematic 4K assets formatted across 9:16, 1:1, and anamorphic displays." }
      ],
      sort_order: 4,
      is_published: 1
    },
    {
      id: 5,
      name: "Motion & 3D Web Experiences",
      slug: "motion-3d-web-experiences",
      icon: "orbit",
      summary: "Real-time WebGL, interactive 3D product configurators, kinetic typography, particle physics, and spatial narratives.",
      description: "We bridge the gap between cinema and code. Leveraging Three.js, custom GLSL shaders, and GPU-accelerated canvas simulations, we create living digital environments that respond intimately to every mouse coordinate and scroll gesture.",
      deliverables: ["Custom GLSL Shaders & WebGL Canvas Components", "Optimized Low-Poly 3D Model Assets (GLTF/GLB)", "Lottie & CSS Fluid Micro-Animations", "Hardware-Adaptive Fallback Runtimes"],
      process_steps: ["01 3D Spatial Concept Art & Low-Poly Modeling", "02 Shader Prototyping & Physics Simulation", "03 WebGL Integration & FPS Frame Optimization", "04 Touch & Reduced-Motion Ergonomic Tuning"],
      faq: [
        { q: "Will 3D animations slow down mobile devices?", a: "No. We implement dynamic LOD (Level of Detail) scaling, framerate throttling, and static WebP fallbacks for low-power devices." }
      ],
      sort_order: 5,
      is_published: 1
    },
    {
      id: 6,
      name: "AI & Creative Innovation",
      slug: "ai-creative-innovation",
      icon: "brain-circuit",
      summary: "Generative intelligence pipelines, automated creative workflows, bespoke LLM assistants, and intelligent agentic tools.",
      description: "We pioneer the symbiotic frontier of human intuition and synthetic cognition. We design private, enterprise-grade AI assistants, automated brief parsers, and custom vision models that amplify creative velocity.",
      deliverables: ["Bespoke LLM Agent Architecture & System Prompts", "Secure API Middleware with Rate-Limiting & Guardrails", "Automated Content & Asset Generation Pipelines", "Conversational Onboarding UX Interfaces"],
      process_steps: ["01 Feasibility Assessment & Risk Audit", "02 Prompt Engineering & RAG Architecture", "03 Backend Gateway & Data Sanitization", "04 Adaptive UI & Model Fine-Tuning"],
      faq: [
        { q: "Is our corporate data sent to public AI models?", a: "Never. We deploy zero-data-retention APIs and self-hosted open-weights models ensuring 100% intellectual property confidentiality." }
      ],
      sort_order: 6,
      is_published: 1
    }
  ],

  projects: [
    {
      id: 1,
      title: "SYNAPSE Generative Workflow Studio",
      slug: "synapse-generative-workflow-studio",
      client: "Synapse Labs (San Francisco)",
      year: "2026",
      category_name: "AI & Creative Tech",
      summary: "Agentic canvas and visual programming interface empowering creative directors to orchestrate multimodal generative AI models.",
      challenge: "Visual artists struggled with fragmented CLI tools and rigid text prompt boxes to generate cohesive film storyboards and video animations.",
      solution: "We engineered an infinite node-based creative canvas with real-time latent diffusion interpolation and voice-guided prompt refinement, making generative AI as intuitive as pencil and paper.",
      results: "Adopted by 38 Fortune 500 creative departments, cutting concept pre-visualization timelines from 2 weeks to 4 hours.",
      technologies: ["React / Vite", "Canvas API", "PyTorch Gateway", "FastAPI", "Node.js"],
      deliverables: "Web Canvas Application, API Gateway, Developer SDK, Enterprise CMS",
      featured_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      metrics: [{ label: "Workflow Acceleration", value: "85%" }, { label: "Enterprise Teams", value: "38+" }, { label: "Weekly Active Users", value: "92K" }],
      status: "published",
      is_featured: 1
    },
    {
      id: 2,
      title: "VORTEX Hyper-Mobility Brand Architecture",
      slug: "vortex-hyper-mobility-brand",
      client: "Vortex Dynamics (Stockholm)",
      year: "2025",
      category_name: "Brand Architecture",
      summary: "Complete strategic rebranding, bespoke kinetic typography, and digital presence for an electric supersonic aviation pioneer.",
      challenge: "Vortex was transitioning from a classified aerospace skunkworks to a publicly traded commercial aviation entity, needing a brand identity that projected unassailable authority and ecological stewardship.",
      solution: "We developed a minimalist yet aggressive brand identity system based on aerodynamic wind tunnel visualizations and Mach shockwave geometry, accompanied by an editorial digital manifesto.",
      results: "Attracted $180M in Series B venture capital, increased qualified talent applications by 340%, and won Red Dot Brand of the Year.",
      technologies: ["Brand Strategy", "Typography Design", "3D Motion", "Web Architecture"],
      deliverables: "Brand Bible (320 Pages), Custom Display Font, Investor Microsite",
      featured_image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
      metrics: [{ label: "Capital Raised", value: "$180M" }, { label: "Talent Inflow", value: "+340%" }, { label: "Accolades", value: "Red Dot 2025" }],
      status: "published",
      is_featured: 1
    },
    {
      id: 3,
      title: "KAIROS Autonomous Horology",
      slug: "kairos-autonomous-horology",
      client: "Kairos Atelier (Geneva / Tokyo)",
      year: "2026",
      category_name: "Web & Immersive 3D",
      summary: "Interactive 3D digital flagship and timepiece customizer allowing collectors to dissect mechanical micro-calibers in real time.",
      challenge: "Kairos wanted to launch a $65,000 limited mechanical wristwatch strictly online to a global discerning audience, requiring unprecedented tactile fidelity on web browsers.",
      solution: "We created an interactive 3D ray-traced web showcase where collectors can manipulate the escapement mechanism, switch dial alloys, and hear authentic acoustic ticking calibrated to the escapement frequency.",
      results: "Sold out all 100 limited units in 14 minutes, generating $6.5M in revenue with over 450,000 organic interactive sessions worldwide.",
      technologies: ["Three.js", "Web Audio API", "PBR Shaders", "Vite", "Stripe Global"],
      deliverables: "3D Timepiece Configurator, E-Commerce Flagship, Global Brand Campaign",
      featured_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      metrics: [{ label: "Sellout Velocity", value: "14 Mins" }, { label: "Gross Revenue", value: "$6.5M" }, { label: "Global Press", value: "80+ Outlets" }],
      status: "published",
      is_featured: 1
    },
    {
      id: 4,
      title: "AETHER Neural Trading Terminal",
      slug: "aether-neural-trading-terminal",
      client: "Aether Quant AG (Zurich)",
      year: "2026",
      category_name: "Digital Product Design",
      summary: "Institutional algorithmic trading platform featuring real-time WebGL orderbook topography and sub-millisecond execution telemetry.",
      challenge: "Aether Quant required a trading interface that could visualize massive multi-asset liquidity pools in real time without cognitive fatigue or latency bottlenecks.",
      solution: "We designed a high-contrast cyber-ergonomic dashboard with custom GPU-accelerated volumetric depth maps, enabling quant traders to perceive dark pool movements intuitively.",
      results: "Achieved 42% faster anomaly detection, 0 dropped frames during peak volatility, and facilitated over $4.2B in volume within the first quarter post-launch.",
      technologies: ["WebGL", "Three.js", "WebSockets", "Design System", "Custom GLSL"],
      deliverables: "Complete Web Terminal, Mobile Companion App, Design System Tokens",
      featured_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      metrics: [{ label: "Execution Speed", value: "1.2ms" }, { label: "Active Volume", value: "$4.2B+" }, { label: "UX Satisfaction", value: "99.4%" }],
      status: "published",
      is_featured: 1
    }
  ],

  articles: [
    {
      id: 1,
      title: "Beyond the Flat Web: Designing for Spatial Cognition and Living Interfaces",
      slug: "beyond-the-flat-web-spatial-cognition",
      author: "Elena Vance",
      category: "Design Philosophy",
      excerpt: "Why the next epoch of digital product design demands depth, tactile responsiveness, and visceral physical metaphors.",
      body: "For the past decade, web design has been suffocated by uniform SaaS minimalism. Every landing page looks like an indistinguishable assembly of white cards, generic rounded buttons, and bland vector illustrations.\n\nAt BRAIN WAVES, we argue that humans are spatial, sensory beings. When software reflects organic tension, dynamic lighting, and real-time physical reaction, cognition speeds up and emotional resonance skyrockets.\n\n1. The Fallacy of Pure Flatness:\nFlat design emerged to clean up the skeuomorphic excesses of early mobile operating systems. However, in stripping away shadows, depth, and tactile response, flat design also stripped away perceptual hierarchy.\n\n2. Living Motion as Information:\nMotion should never be decorative confetti. In our design language, motion is an acoustic radar. When a cursor passes over an interactive surface, the subtle gravitational warping informs the user of affordances before a single click is registered.\n\n3. Cyber-Luxury and the Power of Void:\nBy utilizing deep Void Black (#080910) paired with targeted spectral cyan and violet accents, we focus human attention with surgical accuracy. The interface ceases to be a noisy screen—it becomes a high-fidelity instrument.",
      cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      read_time: "6 min read",
      views_count: 1420,
      status: "published"
    },
    {
      id: 2,
      title: "Engineering Zero-Latency 3D on the Web: WebGL, Shaders, and Frame Budgets",
      slug: "engineering-zero-latency-3d-webgl-shaders",
      author: "Marcus Thorne",
      category: "Creative Engineering",
      excerpt: "A technical breakdown of how we render 120 FPS interactive particle meshes and custom GLSL noise without crashing mobile GPUs.",
      body: "Achieving cinematic visual fidelity on consumer devices requires ruthless optimization and direct GPU command pipelines.\n\n1. Bypassing the DOM for Intensive Math:\nWhen dealing with tens of thousands of particles or fluid dynamic meshes, manipulating DOM elements or relying on high-level canvas abstractions will inevitably trigger layout thrashing. We write custom vertex and fragment shaders directly in GLSL.\n\n2. Adaptive LOD and Device Fingerprinting:\nNot every user visits your website on an M3 Max MacBook. We measure GPU hardware capabilities on initialization. Devices with restricted thermal envelopes receive lightweight point-cloud simulations, while high-performance desktop rigs receive full ray-marched refractive surfaces.\n\n3. The 16-Millisecond Sacred Budget:\nTo maintain 60 to 120 frames per second, the JavaScript main thread must never spend more than 8ms per frame on calculation, leaving the rest for GPU rendering. We offload heavy vertex computations into Web Workers and use SharedArrayBuffers where available.",
      cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      read_time: "8 min read",
      views_count: 2150,
      status: "published"
    },
    {
      id: 3,
      title: "The AI Brand Dilemma: Maintaining Soul in an Era of Algorithmic Abundance",
      slug: "ai-brand-dilemma-maintaining-soul",
      author: "Elena Vance",
      category: "Strategic Branding",
      excerpt: "When anyone can generate endless synthetic assets in seconds, human intentionality, taste, and provocation become the only true currencies.",
      body: "Generative AI has solved the problem of asset volume. Today, an algorithm can create 500 logo variations or 10,000 product mockups in an afternoon.\n\nYet paradoxically, the more assets flood the world, the less value they possess.\n\nTrue brand equity has never been about volume; it is about stance, point of view, and uncompromised curation. AI is an astounding collaborator for rapid conceptual divergence, but human discernment is the singular filter that creates distinction.\n\nWe use AI to accelerate our exploration, but every final line, curve, and word is carved with deliberate human conviction.",
      cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      read_time: "5 min read",
      views_count: 980,
      status: "published"
    }
  ],

  testimonials: [
    {
      id: 1,
      client_name: "Dr. Aris Thorne",
      client_title: "Chief Technology Officer",
      company: "Aether Quant AG",
      quote: "BRAIN WAVES did not merely redesign our trading terminal; they transformed how our quants perceive market liquidity. Their execution velocity and artistic fearlessness are unmatched in the global agency landscape.",
      rating: 5,
      is_published: 1,
      sort_order: 1
    },
    {
      id: 2,
      client_name: "Sora Takahashi",
      client_title: "Founder & Master Horologist",
      company: "Kairos Atelier Tokyo",
      quote: "The 3D web experience engineered by BRAIN WAVES felt like holding a real mechanical tourbillon in the palm of your hand. Selling out our limited allocation in under fifteen minutes proved their digital experience was worth every yen.",
      rating: 5,
      is_published: 1,
      sort_order: 2
    },
    {
      id: 3,
      client_name: "Astrid Lindqvist",
      client_title: "VP of Brand Strategy",
      company: "Vortex Dynamics",
      quote: "They challenged our internal assumptions from day one. The result was a brand identity and investor portal that helped us close our $180M Series B ahead of schedule. Truly visionary partners.",
      rating: 5,
      is_published: 1,
      sort_order: 3
    }
  ]
};
