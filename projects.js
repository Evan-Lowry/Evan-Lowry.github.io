// How to add a hover demo to any project:
//   demo: { src: "assets/demos/qube.mp4", poster: "assets/demos/qube-poster.jpg" }
//   - video: .mp4 / .webm (muted, loops, plays on hover, no controls)
//   - gif / image: { src: "assets/demos/engine.gif" } (shown zoomed on hover)
//   - leave it `null` and the tile renders an empty well telling you the filename.
// Keep files under ~3MB, 16:9, no audio. Posters are optional.
const projects = [
  {
    title: "Pizzeria La Terrazza",
    meta: "Freelance · live client site",
    category: "web",
    demo: null,
    blurb:
      "Custom Next.js 16 / React / TypeScript ordering stack: typed menu data, dynamic routes, pizza builder, and a stateful cart with live pricing. Previously launched a Square storefront that did $30k+ in online orders.",
    tags: ["Next.js", "TypeScript", "React"],
    links: [{ label: "Live site", href: "https://pizzeria-la-terrazza.ca" }],
  },
  {
    title: "Don’t Mess with the Don",
    meta: "UW Blueprint · Apr 2026–present",
    category: "open-source",
    demo: null, // e.g. { src: "assets/demos/don.mp4" }
    blurb:
      "Nonprofit event platform. I built an asynchronous FastAPI attendance API with SQLAlchemy, nine functional tests, a timezone-aware cron service, and a React/TypeScript QR check-in prototype.",
    tags: ["Python", "TypeScript", "FastAPI", "React"],
    links: [
      { label: "Repository", href: "https://github.com/uwblueprint/dont-mess-with-the-don" },
      { label: "Attendance PR", href: "https://github.com/uwblueprint/dont-mess-with-the-don/pull/20" },
    ],
  },
  {
    title: "Qube",
    meta: "iOS / macOS / watchOS · 2026",
    category: "apps",
    demo: null, // e.g. { src: "assets/demos/qube.mp4" }
    blurb:
      "Speedcube timer with GAN Bluetooth integration. Scramble, time, stats, and CFOP practice, with live cube state from a physical smart cube and a Watch companion.",
    tags: ["Swift", "SwiftUI", "Bluetooth"],
    links: [{ label: "GitHub", href: "https://github.com/Evan-Lowry/Qube" }],
  },
  {
    title: "3D Engine",
    meta: "Personal · Java",
    category: "graphics",
    demo: null, // e.g. { src: "assets/demos/engine.gif" }
    blurb:
      "Software-only renderer from first principles: rasterization, perspective-correct UV interpolation, back-face culling, OBJ import, and AABB collision. No GPU pipeline.",
    tags: ["Java", "Graphics", "Linear algebra"],
    links: [{ label: "GitHub", href: "https://github.com/Evan-Lowry/3D-Engine" }],
  },
  {
    title: "Cube Solver",
    meta: "Personal · Java",
    category: "apps",
    demo: null,
    blurb:
      "Kociemba search with compact 1D byte-array states, precomputed tables, multithreading, and A/B-tested heuristics. About 26 moves per solve and a 10× search speedup.",
    tags: ["Java", "Search", "Algorithms"],
    links: [{ label: "GitHub", href: "https://github.com/Evan-Lowry/CubeSolver-Java" }],
  },
  {
    title: "ConflictZero",
    meta: "Midnight Hackathon · 2026",
    category: ["web", "hackathon"],
    demo: null,
    blurb:
      "Prove a conflict check passed without exposing the confidential relationships behind it. Compact circuit plus a browser demo for professional-services clearance receipts.",
    tags: ["TypeScript", "ZK", "Midnight"],
    links: [{ label: "GitHub", href: "https://github.com/Evan-Lowry/conflictzero" }],
  },
  {
    title: "Derive AI",
    meta: "CxC · 2026",
    category: ["web", "hackathon"],
    demo: null,
    blurb:
      "Pen-first math notebook: React and TypeScript frontend, Express and MongoDB backend, Auth0 login, handwriting recognition, step solving, work-checking, and graphing.",
    tags: ["TypeScript", "React", "Express", "MongoDB"],
    links: [],
  },
  {
    title: "Olympiknights",
    meta: "DeltaHacks 12 · Jan 2026",
    category: ["apps", "hackathon"],
    demo: null,
    blurb:
      "Two-player Godot combat game controlled by webcam poses. MediaPipe classifies squats, lunges, push-ups, and jumping jacks into in-game actions.",
    tags: ["GDScript", "Python", "Godot", "MediaPipe"],
    links: [{ label: "GitHub", href: "https://github.com/diceccoj/deltahacks-12" }],
  },
];
