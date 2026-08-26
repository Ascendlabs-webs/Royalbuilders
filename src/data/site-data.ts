export type MegaItem = { label: string; href: string; image: string };
export type NavLink = { label: string; href: string; mega?: readonly MegaItem[] };

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/construction",
    mega: [
      { label: "Construction", href: "/construction", image: "/images/construction-site-1.jpg" },
      { label: "Interiors", href: "/interiors", image: "/images/interior-living-1.jpg" },
      { label: "Real Estate", href: "/real-estate", image: "/images/land-1.jpg" },
      { label: "Maintenance", href: "/maintenance", image: "/images/maintenance-cleaning.jpg" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    slug: "construction",
    title: "Construction",
    tagline: "We Build Your Dream Home",
    description:
      "Uncompromising quality in every structural endeavour - from foundational planning to final execution. We turn visions into enduring structural masterpieces.",
    image: "/images/construction-site-1.jpg",
    features: [
      "Residential Construction",
      "Villas & Apartments",
      "Commercial Buildings",
      "Structural Design",
    ],
  },
  {
    slug: "interiors",
    title: "Interiors",
    tagline: "Premium Interior Solutions",
    description:
      "Elevating spaces with meticulous craftsmanship and visionary design. From conceptual layouts to the final luxurious finishes.",
    image: "/images/interior-living-1.jpg",
    features: [
      "Modular Kitchens",
      "Wardrobes & TV Units",
      "False Ceilings",
      "Profile Lighting",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    tagline: "Find Your Dream Land",
    description:
      "Discover premium residential and commercial plots curated for architectural excellence. Build your legacy on a foundation of trust.",
    image: "/images/land-1.jpg",
    features: [
      "Residential Land",
      "Commercial Property",
      "Investment Properties",
      "Legal Verification",
    ],
  },
  {
    slug: "maintenance",
    title: "Building Maintenance",
    tagline: "Professional Maintenance Services",
    description:
      "Upholding the integrity and luxury of your architectural investments with precise, reliable and comprehensive care.",
    image: "/images/maintenance-cleaning.jpg",
    features: [
      "Building Repairs",
      "Tank & Sump Cleaning",
      "Plumbing & Electrical",
      "AMC Services",
    ],
  },
] as const;

export const WHY_CHOOSE = [
  {
    icon: "shield",
    title: "Quality Construction",
    description: "Premium materials and rigorous quality checks at every stage of build.",
  },
  {
    icon: "rupee",
    title: "Transparent Pricing",
    description: "Honest, itemised estimates with zero hidden costs - ever.",
  },
  {
    icon: "users",
    title: "Experienced Team",
    description: "Engineers, architects and craftsmen with 14+ years of expertise.",
  },
  {
    icon: "pen",
    title: "Modern Designs",
    description: "Contemporary layouts tailored to your lifestyle and vision.",
  },
  {
    icon: "clock",
    title: "On-time Delivery",
    description: "Scheduled milestones honoured - your time is our commitment.",
  },
  {
    icon: "tag",
    title: "Affordable Pricing",
    description: "Luxury outcomes across every budget, from ₹2,200/sq.ft onwards.",
  },
  {
    icon: "gavel",
    title: "Legal Support",
    description: "Complete documentation, approvals and encumbrance-free land.",
  },
  {
    icon: "map",
    title: "Free Site Visit",
    description: "On-site consultation and free measurement anywhere in Chennai.",
  },
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 60, suffix: "+", label: "Skilled Professionals" },
] as const;

export const TIMELINE = [
  {
    year: "2010",
    title: "The Foundation",
    description:
      "Royal Builders is founded in Chennai, with a vision to redefine urban landscapes through structural reliability and honest craftsmanship.",
  },
  {
    year: "2013",
    title: "First 50 Homes",
    description:
      "Completes its first 50 residential projects across North Chennai, earning a reputation for transparent pricing and on-time delivery.",
  },
  {
    year: "2015",
    title: "Interiors Division",
    description:
      "Expands into luxury interior design, offering end-to-end solutions for kitchens, wardrobes, ceilings and profile lighting.",
  },
  {
    year: "2018",
    title: "Real Estate & Land",
    description:
      "Launches the real estate division with fully verified, encumbrance-free land parcels in North Chennai growth corridors.",
  },
  {
    year: "2021",
    title: "Maintenance & AMC",
    description:
      "Adds a dedicated building maintenance vertical with AMC packages for homes, offices and commercial complexes.",
  },
  {
    year: "Today",
    title: "Premier Partner",
    description:
      "Recognised as a premier construction and real estate partner with hundreds of satisfied clients and landmark projects across Chennai.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Suresh Kumar",
    initials: "SK",
    rating: 5,
    service: "Construction - Individual House",
    date: "2 months ago",
    text: "Royal Builders built our 2400 sq.ft home in Perambur exactly on schedule and within the quoted budget. The team was transparent at every stage - weekly photo updates, clear billing. Truly professional.",
  },
  {
    name: "Lakshmi Narayanan",
    initials: "LN",
    rating: 5,
    service: "Interiors - Modular Kitchen",
    date: "1 month ago",
    text: "The modular kitchen they designed transformed our home. Silicon profile lighting and the wardrobes are flawless. Finish quality is comparable to the premium brands at a fraction of the cost.",
  },
  {
    name: "Mohammed Rafiq",
    initials: "MR",
    rating: 5,
    service: "Real Estate - Land Purchase",
    date: "3 months ago",
    text: "I bought a plot in through Royal Builders. Complete legal verification was done - encumbrance, title documents, everything. They even helped with the registration. Zero stress.",
  },
  {
    name: "Priya Raman",
    initials: "PR",
    rating: 5,
    service: "Building Maintenance - AMC",
    date: "2 weeks ago",
    text: "Their AMC team visits our apartment complex twice a month - water tank cleaning, electrical checks, painting touch-ups. Very punctual and thorough. Highly recommended.",
  },
  {
    name: "Arun Prakash",
    initials: "AP",
    rating: 4,
    service: "Construction - Villa",
    date: "1 month ago",
    text: "Excellent structural work on our villa in Thiruvottiyur. The engineers caught two design issues before they became problems. Minor delays in finishes, but overall a great experience.",
  },
  {
    name: "Divya Chandran",
    initials: "DC",
    rating: 5,
    service: "Interiors - Full Home",
    date: "4 months ago",
    text: "From false ceiling to wardrobe to wall panels - they handled our full home interiors. The site visit was free and the design team understood our taste immediately. Beautiful result.",
  },
] as const;

export const GALLERY_FILTERS = [
  "All",
  "Construction",
  "Villa",
  "Apartment",
] as const;

export const GALLERY_ITEMS = [
  { src: "/images/project-1.jpg", category: "Construction", title: "1400 Sq.Ft F+G+2 Residence", span: "tall" },
  { src: "/images/project-2.jpg", category: "Apartment", title: "550 Sq.Ft 2BHK Home", span: "wide" },
  { src: "/images/project-3.jpg", category: "Villa", title: "550 Sq.Ft Compact Villa" },
  { src: "/images/project-4.jpg", category: "Construction", title: "1200 Sq.Ft 7-Portion Complex" },
  { src: "/images/project-5.jpg", category: "Villa", title: "1400 Sq.Ft Family Home" },
  { src: "/images/project-6.jpg", category: "Construction", title: "450 Sq.Ft G+1 Home" },
  { src: "/images/project-7.jpg", category: "Apartment", title: "1200 Sq.Ft Multi-Unit Building" },
] as const;

export const CONSTRUCTION_PACKAGES = [
  {
    name: "Basic",
    price: 2200,
    per: "sq.ft",
    description: "Solid, dependable construction with standard finishes.",
    features: [
      "Standard cement & steel",
      "Basic electrical & plumbing",
      "Regular elevation design",
      "5 year structural warranty",
      "Standard bathroom fittings",
    ],
    featured: false,
  },
  {
    name: "Classic",
    price: 2400,
    per: "sq.ft",
    description: "Enhanced finishes and better materials for modern homes.",
    features: [
      "Branded cement & TMT steel",
      "Vitrified tile flooring",
      "Premium paints (Asian Paints)",
      "Modular electrical layout",
      "7 year structural warranty",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: 2600,
    per: "sq.ft",
    description: "Premium materials with designer elevation and finishes.",
    features: [
      "Designer elevation & façade",
      "Imported sanitary ware",
      "Concealed plumbing",
      "False ceiling in living area",
      "10 year structural warranty",
    ],
    featured: false,
  },
  {
    name: "Luxury",
    price: 2800,
    per: "sq.ft",
    description: "Signature luxury - architectural design, premium everything.",
    features: [
      "Architectural design & 3D",
      "Smart home wiring",
      "Premium marble / granites",
      "Profile lighting & paneling",
      "Lifetime structural warranty",
    ],
    featured: false,
  },
] as const;

export const CONSTRUCTION_SERVICES = [
  { title: "Residential Construction", image: "/images/construction-site-1.jpg", description: "Individual homes and row houses built with precision, quality materials and transparent contracts." },
  { title: "Villas", image: "/images/construction-villa-1.jpg", description: "Premium villas with designer elevations, expansive layouts and luxury finishes." },
  { title: "Apartments", image: "/images/construction-apartment-1.jpg", description: "Multi-storey apartment projects delivered floor-by-floor with strict safety compliance." },
  { title: "Commercial Buildings", image: "/images/construction-commercial-1.jpg", description: "Office spaces, showrooms and commercial complexes engineered for business." },
  { title: "Joint Ventures", image: "/images/construction-crane-1.jpg", description: "Land owner partnerships - we build, you share. Fully documented JV agreements." },
  { title: "Structural Design", image: "/images/construction-structure-1.jpg", description: "Detail-engineered structural drawings, load calculations and approvals." },
] as const;

export const CONSTRUCTION_PROCESS = [
  { step: "01", title: "Consultation", description: "Free site visit, requirement analysis and budget discussion." },
  { step: "02", title: "Planning", description: "Detailed BOQ, cost estimation and execution schedule." },
  { step: "03", title: "Design", description: "Architectural drawings, elevation options and 3D previews." },
  { step: "04", title: "Approval", description: "Plan sanction, corporation approvals and legal clearances." },
  { step: "05", title: "Execution", description: "Civil, electrical, plumbing - milestone-driven with quality audits." },
  { step: "06", title: "Handover", description: "Final inspection, completion certificate and warranty support." },
] as const;

export const CONSTRUCTION_FAQS = [
  {
    q: "How much does house construction cost per square foot in Chennai?",
    a: "Our construction packages start at ₹2,200/sq.ft (Basic) and go up to ₹2,800/sq.ft (Luxury). The final cost depends on design complexity, materials and finishing levels. We provide a detailed BOQ before work begins - no hidden charges.",
  },
  {
    q: "Do you provide all approvals and legal documentation?",
    a: "Yes. Our team handles plan sanction, corporation approvals and all statutory clearances. For land purchase, we perform complete legal verification including encumbrance checks and title scrutiny.",
  },
  {
    q: "How long does it take to construct a house?",
    a: "A standard individual house (1500-2500 sq.ft) takes 9-14 months depending on the package. We share a milestone-based schedule upfront and give weekly progress updates with photos.",
  },
  {
    q: "Can I visit an ongoing construction site?",
    a: "Absolutely. We encourage site visits. Call +91 98409 51292 and we will arrange a visit to our nearest ongoing project so you can inspect the quality first-hand.",
  },
  {
    q: "Do you provide a construction warranty?",
    a: "Yes. We offer 5 to 10 year structural warranties depending on your package, and a 1-year maintenance warranty on finishes, plumbing and electrical work.",
  },
] as const;

export type InteriorSection = {
  title: string;
  image: string;
  before?: string;
  after?: string;
  specs: string;
  materials?: readonly string[];
};

export const INTERIOR_SECTIONS: readonly InteriorSection[] = [
  {
    title: "Modular Kitchen",
    image: "/images/interior-kitchen-1.jpg",
    before: "/images/interior-before-1.jpg",
    after: "/images/interior-after-1.jpg",
    specs: "Engineered ergonomics, soft-close hinges, granite / quartz tops",
    materials: ["Plywood", "PVC", "Quartz", "Granite"],
  },
  {
    title: "Wardrobes",
    image: "/images/interior-wardrobe-1.jpg",
    before: "/images/interior-before-2.jpg",
    after: "/images/interior-after-2.jpg",
    specs: "Floor-to-ceiling, internal organisers, sensor lighting options",
    materials: ["Plywood", "Aluminium", "PVC", "Laminates"],
  },
  {
    title: "TV Units",
    image: "/images/interior-tv-1.jpg",
    before: "/images/interior-before-3.jpg",
    after: "/images/interior-after-3.jpg",
    specs: "Floating designs, concealed wiring, accent back panels",
    materials: ["Plywood", "MDF", "Profile Lights", "Laminates"],
  },
  {
    title: "False Ceiling",
    image: "/images/interior-ceiling-1.jpg",
    specs: "POP / Gypsum designs, cove lighting, 3D layouts",
    materials: ["POP", "Gypsum", "Profile Lights"],
  },
  {
    title: "Profile Lighting",
    image: "/images/interior-ceiling-2.jpg",
    specs: "Silicon profiles, waterproof options, sensor staircases",
    materials: ["Silicon Profile", "LED Strip", "Waterproof Grade"],
  },
  {
    title: "Wall Panels",
    image: "/images/interior-panel-1.jpg",
    specs: "Acoustic and decorative paneling for living and bedrooms",
    materials: ["WPC", "3D Panels", "Wood Finish"],
  },
  {
    title: "Bedroom Design",
    image: "/images/interior-bedroom-1.jpg",
    specs: "Bed units, study corners, ambience lighting design",
    materials: ["Plywood", "Upholstered Headboards", "Profile Lights"],
  },
  {
    title: "Living Room",
    image: "/images/interior-living-1.jpg",
    specs: "Complete living spaces - ceiling, TV unit, paneling",
    materials: ["Gypsum", "Laminates", "Aluminium"],
  },
  {
    title: "Modern Kitchen",
    image: "/images/interior-kitchen-2.jpg",
    specs: "Handleless kitchens, high-gloss, smart storage",
    materials: ["PVC", "Acrylic", "UPVC"],
  },
  {
    title: "Luxury Wardrobe",
    image: "/images/interior-wardrobe-2.jpg",
    specs: "Full-height luxury wardrobes with glass and lighting",
    materials: ["Aluminium", "Glass", "Profile Lights"],
  },
] as const;

export const MATERIALS = [
  {
    name: "PVC",
    description: "Waterproof, termite-proof and budget-friendly - ideal for kitchens and wardrobes.",
  },
  {
    name: "UPVC",
    description: "Rigid and durable for windows and doors with excellent insulation.",
  },
  {
    name: "Plywood",
    description: "Premium BWP / BWR plywood for all modular furniture - strong and long-lasting.",
  },
  {
    name: "Aluminium",
    description: "Sleek, rust-free profiles for wardrobes, partitions and modern systems.",
  },
] as const;

export const LIGHTING_SOLUTIONS = [
  {
    title: "Silicon Profile Light",
    description: "Sleek cove and under-unit lighting with zero glare and even diffusion.",
    image: "/images/interior-ceiling-1.jpg",
  },
  {
    title: "Waterproof Profile",
    description: "IP-rated profiles for bathrooms, balconies and outdoor areas.",
    image: "/images/interior-kitchen-1.jpg",
  },
  {
    title: "Staircase Sensor Lighting",
    description: "Motion-activated step lights that elevate safety and ambience.",
    image: "/images/interior-ceiling-2.jpg",
  },
  {
    title: "Corner Profile Lights",
    description: "Defined edge lighting for ceilings, wardrobes and niches.",
    image: "/images/interior-panel-1.jpg",
  },
] as const;

export const REAL_ESTATE_TYPES = [
  {
    title: "Residential Land",
    image: "/images/land-1.jpg",
    description: "Clear-title residential plots in North Chennai growth corridors - ready for construction with road access and UDS documents.",
    tag: "Residential",
  },
  {
    title: "Commercial Property",
    image: "/images/land-commercial-1.jpg",
    description: "High-footfall commercial land and buildings ideal for shops, offices and showrooms.",
    tag: "Commercial",
  },
  {
    title: "Investment Properties",
    image: "/images/land-invest-1.jpg",
    description: "Curated parcels with strong appreciation potential, perfect for long-term wealth creation.",
    tag: "Investment",
  },
] as const;

export const REAL_ESTATE_SERVICES = [
  { icon: "buy", title: "Buy", description: "Access exclusive residential and commercial land banks - carefully vetted for clear titles." },
  { icon: "sell", title: "Sell", description: "Leverage our network and market expertise for maximum value on your property." },
  { icon: "gavel", title: "Legal Verification", description: "Rigorous due diligence - encumbrance checks, title scrutiny, free of all disputes." },
  { icon: "chart", title: "Property Consultation", description: "Strategic advice on acquisition, feasibility and long-term investment planning." },
] as const;

export const INVESTMENT_BENEFITS = [
  { icon: "trend", title: "Property Appreciation", description: "North Chennai corridors are appreciating at 12-18% annually." },
  { icon: "safe", title: "Secure Investment", description: "Land is India's most tangible, inflation-proof asset class." },
  { icon: "file", title: "Transparent Documentation", description: "Complete title, UDS and encumbrance documents shared upfront." },
  { icon: "user", title: "Trusted Consultants", description: "15+ years of local market knowledge and zero-pressure guidance." },
] as const;

export const MAINTENANCE_SERVICES = [
  { title: "Building Repairs", image: "/images/maintenance-building.jpg", description: "Structural repairs, seepage solutions and façade restoration." },
  { title: "Water Tank Cleaning", image: "/images/maintenance-tank.jpg", description: "Overhead tank disinfection and scrubbing with safe chemicals." },
  { title: "Sump Cleaning", image: "/images/maintenance-sump.jpg", description: "Deep sump desilting, disinfection and bacterial treatment." },
  { title: "Tile Deep Cleaning", image: "/images/maintenance-tile.jpg", description: "Grout-line and tile deep cleaning for floors and walls." },
  { title: "Office Cleaning", image: "/images/maintenance-office.jpg", description: "Scheduled professional cleaning for offices and workspaces." },
  { title: "House Cleaning", image: "/images/maintenance-house.jpg", description: "Complete home cleaning - kitchen, bathrooms and living spaces." },
  { title: "Drainage Cleaning", image: "/images/maintenance-drain.jpg", description: "Blocked drainage and sewer line clearing with jetting machines." },
  { title: "Plumbing", image: "/images/maintenance-plumbing.jpg", description: "Leak repairs, fittings, bathroom renovations and sanitary work." },
  { title: "Electrical", image: "/images/maintenance-electrical.jpg", description: "Wiring, DB maintenance, fan and appliance installations." },
  { title: "Fabrication", image: "/images/maintenance-fabrication.jpg", description: "Gates, grills, railing and structural steel fabrication." },
  { title: "Aluminium Works", image: "/images/maintenance-aluminium.jpg", description: "Windows, doors, partitions and glazing in premium aluminium." },
  { title: "PVC Works", image: "/images/maintenance-pvc.jpg", description: "PVC doors, windows and interiors - durable and waterproof." },
  { title: "SS Works", image: "/images/maintenance-ss.jpg", description: "SS railings, canopies and custom stainless steel fabrication." },
  { title: "Carpenter Works", image: "/images/maintenance-carpenter.jpg", description: "Doors, cupboards, repairs and custom woodwork." },
  { title: "Wall Painting", image: "/images/maintenance-painting.jpg", description: "Interior and exterior painting with premium brands." },
  { title: "AMC Services", image: "/images/maintenance-amc.jpg", description: "Annual maintenance contracts for homes, offices and complexes." },
] as const;

export type Project = {
  title: string;
  category: string;
  client: string;
  location: string;
  date: string;
  image: string;
  services: readonly string[];
  before?: string;
  after?: string;
  description: string;
  specs?: {
    area: string;
    floors: string;
    config: string;
    duration: string;
    amenities: string;
  };
};

export const PROJECTS: readonly Project[] = [
  {
    title: "1400 Sq.Ft G+2 Residence",
    category: "Residential",
    client: "Private Family",
    location: "BV Colony 30th St, Chennai",
    date: "2026",
    image: "/images/project-1.jpg",
    services: ["Residential Construction", "Parking", "Free Amenities"],
    description: "Ground + 2 floors with parking, 3BHK per floor. Built at ₹2,600/sq.ft in 8 months. Free amenities include sump, overhead water tank, and cool tiles on terrace.",
    specs: {
      area: "1400 sqft",
      floors: "F+G+2",
      config: "Parking • 3BHK per floor",
      duration: "8 months (2026 — ₹2,600/sq.ft)",
      amenities: "Free amenities: Sump, Overhead water tank, Cool tiles in terrace, Parking",
    },
  },
  {
    title: "550 Sq.Ft G+2 Home",
    category: "Residential",
    client: "Private Family",
    location: "Chennai",
    date: "2022",
    image: "/images/project-2.jpg",
    services: ["Residential Construction", "Free Amenities"],
    description: "Ground + 2 floors with 2BHK layout. Built at ₹2,200/sq.ft in 6 months. Includes sump, overhead water tank, and cool tiles on terrace.",
    specs: {
      area: "550 sqft",
      floors: "F+G+2",
      config: "2BHK",
      duration: "6 months (2022 — ₹2,200/sq.ft)",
      amenities: "Free amenities: Sump, Overhead water tank, Cool tiles in terrace",
    },
  },
  {
    title: "550 Sq.Ft G+2 Compact Home",
    category: "Residential",
    client: "Private Family",
    location: "Chennai",
    date: "2022",
    image: "/images/project-3.jpg",
    services: ["Residential Construction", "Free Amenities"],
    description: "Ground + 2 floors with 2BHK configuration. Built at ₹2,200/sq.ft in 6 months with sump, overhead water tank, and cool tiles on terrace.",
    specs: {
      area: "550 sqft",
      floors: "F+G+2",
      config: "2BHK",
      duration: "6 months (2022 — ₹2,200/sq.ft)",
      amenities: "Free amenities: Sump, Overhead water tank, Cool tiles in terrace",
    },
  },
  {
    title: "1200 Sq.Ft G+2 Multi-Portion",
    category: "Residential",
    client: "Private Client",
    location: "Chennai",
    date: "2024",
    image: "/images/project-4.jpg",
    services: ["Residential Construction", "Multi-Portion Design"],
    description: "Ground floor: 1BHK × 3 portions. 1st floor: 2BHK × 2 portions. 2nd floor: 2BHK × 2 portions. Total 7 rental portions. Built at ₹2,400/sq.ft.",
    specs: {
      area: "1200 sqft",
      floors: "F+G+2",
      config: "7 portions — Ground: 1BHK×3 • 1st: 2BHK×2 • 2nd: 2BHK×2",
      duration: "(2024 — ₹2,400/sq.ft)",
      amenities: "Ideal for rental income",
    },
  },
  {
    title: "1400 Sq.Ft G+2 Family Home",
    category: "Residential",
    client: "Private Family",
    location: "Chennai",
    date: "2018",
    image: "/images/project-5.jpg",
    services: ["Residential Construction", "Mixed Layouts"],
    description: "Ground floor: 2BHK. 1st floor: 3BHK. 2nd floor: 1BHK + 2BHK (2 portions). Built at ₹2,000/sq.ft with premium finishes.",
    specs: {
      area: "1400 sqft",
      floors: "G+2",
      config: "Ground: 2BHK • 1st: 3BHK • 2nd: 1BHK + 2BHK (2 portions)",
      duration: "(2018 — ₹2,000/sq.ft)",
      amenities: "Premium family home",
    },
  },
  {
    title: "450 Sq.Ft G+1 Home",
    category: "Residential",
    client: "Private Family",
    location: "Chennai",
    date: "2022",
    image: "/images/project-6.jpg",
    services: ["Residential Construction"],
    description: "Ground floor: 2BHK. 1st floor: 1BHK. Compact and efficient G+1 design built at ₹2,200/sq.ft.",
    specs: {
      area: "450 sqft",
      floors: "G+1",
      config: "Ground: 2BHK • 1st: 1BHK",
      duration: "(2022 — ₹2,200/sq.ft)",
      amenities: "Compact efficient design",
    },
  },
  {
    title: "1200 Sq.Ft G+2 Multi-Unit",
    category: "Residential",
    client: "Private Client",
    location: "Chennai",
    date: "2020",
    image: "/images/project-7.jpg",
    services: ["Residential Construction", "Multi-Unit Design"],
    description: "Ground floor: 2BHK + 1BHK. 1st floor: 2BHK + 1BHK. 2nd floor: 2BHK + 2BHK. Built at ₹2,200/sq.ft with modern amenities.",
    specs: {
      area: "1200 sqft",
      floors: "G+2",
      config: "Ground: 2BHK+1BHK • 1st: 2BHK+1BHK • 2nd: 2BHK+2BHK",
      duration: "(2020 — ₹2,200/sq.ft)",
      amenities: "Modern multi-unit home",
    },
  },
] as const;

export const PROJECT_FILTERS = [
  "All",
  "Construction",
] as const;

export const TEAM = [
  { name: "R. Sekaran", role: "Founder & Managing Director", image: "/images/team-1.jpg" },
  { name: "Priya Raman", role: "Head of Interiors", image: "/images/team-2.jpg" },
  { name: "Karthik Subramani", role: "Chief Engineer", image: "/images/team-3.jpg" },
  { name: "Meena Krishnan", role: "Legal & Documentation", image: "/images/team-4.jpg" },
  { name: "Arun Prakash", role: "Projects Director", image: "/images/team-5.jpg" },
  { name: "Divya Chandran", role: "Design Lead", image: "/images/team-6.jpg" },
] as const;

export const CERTIFICATES = [
  { title: "ISO 9001:2015", subtitle: "Quality Management", year: "2019" },
  { title: "TNSTC Approved Contractor", subtitle: "Government Empanelment", year: "2018" },
  { title: "MSME Registered", subtitle: "Government of India", year: "2016" },
  { title: "CMDA Compliance", subtitle: "Plan Approvals Partner", year: "2015" },
] as const;

export const ACHIEVEMENTS = [
  { value: "250+", label: "Projects Delivered" },
  { value: "40L", label: "Sq.Ft Constructed" },
  { value: "98%", label: "On-time Handovers" },
  { value: "15+", label: "Award Nominations" },
] as const;

export const VALUES = [
  {
    icon: "gem",
    title: "Integrity",
    description: "Integrity in every transaction. What we quote is what you pay.",
  },
  {
    icon: "ruler",
    title: "Precision",
    description: "Precision in every measurement. Zero compromise on specifications.",
  },
  {
    icon: "light",
    title: "Innovation",
    description: "Innovation in every design. Modern materials and modern thinking.",
  },
] as const;
