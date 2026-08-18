export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  points: string[];
  intro: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  gallery: string[];
  projectType: string;
  designStyle: string;
  materials: string;
  status: string;
  features: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  projectType: string;
  rating: number;
  review: string;
};

export type Faq = { id: string; question: string; answer: string };

export type SiteData = {
  hero: {
    label: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    image: string;
  };
  about: {
    heading: string;
    pageHeading: string;
    description: string;
    longDescription: string;
    features: string[];
    image: string;
    pageImage: string;
  };
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  faqs: Faq[];
  contact: {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    consultationCta: string;
    footerNote: string;
  };
};

export const PROJECT_CATEGORIES = [
  "Modular Kitchens",
  "Wardrobes",
  "TV Units",
  "Furniture",
  "Complete Interiors",
];

export const defaultSiteData: SiteData = {
  hero: {
    label: "Premium Interior & Modular Kitchen Solutions",
    heading: "Crafting Beautiful Spaces That Feel Like Home",
    description:
      "Premium modular kitchens, wardrobes, TV units and customized residential woodwork designed around your space, lifestyle and vision.",
    primaryCta: "Explore Our Projects",
    secondaryCta: "Get Free Consultation",
    trustLine: "Designed • Fabricated • Installed",
    image: "heroKitchen",
  },
  about: {
    heading: "Designed Around Your Lifestyle",
    pageHeading: "Creating Interiors That Balance Beauty & Function",
    description:
      "Shri Krishna Kitchen And Interior works in the field of interior design, modular kitchen fabrication and customized furniture manufacturing — shaping every element around the way you actually live.",
    longDescription:
      "Shri Krishna Kitchen And Interior is into the design, fabrication and installation of premium modular kitchens, wardrobes, TV units and complete residential woodwork solutions tailored to space requirements. Every project begins with your space and ends with a finish that is measured, fabricated and installed by our own team.",
    features: [
      "Space-focused design",
      "Premium materials",
      "Customized solutions",
      "Professional installation",
    ],
    image: "aboutWorkshop",
    pageImage: "aboutInterior",
  },
  services: [
    {
      id: "s1",
      slug: "modular-kitchens",
      title: "Modular Kitchens",
      description:
        "Custom-designed modular kitchens combining functionality and elegant aesthetics.",
      image: "serviceKitchen",
      category: "Kitchen",
      intro:
        "Every kitchen is planned around your cooking triangle, appliance list and storage habits, then fabricated in premium finishes built to last in Indian kitchens.",
      points: [
        "L-shaped kitchens",
        "U-shaped kitchens",
        "Straight kitchens",
        "Parallel kitchens",
        "Island kitchens",
        "Storage optimization",
        "Premium finishes",
      ],
    },
    {
      id: "s2",
      slug: "wardrobes",
      title: "Wardrobes",
      description:
        "Space-efficient wardrobes customized to your storage requirements.",
      image: "serviceWardrobe",
      category: "Storage",
      intro:
        "Wardrobes designed to the exact dimensions of your room, with internal layouts planned around what you actually store.",
      points: [
        "Sliding wardrobes",
        "Hinged wardrobes",
        "Walk-in wardrobes",
        "Customized storage",
        "Loft storage",
      ],
    },
    {
      id: "s3",
      slug: "tv-units",
      title: "TV Units",
      description: "Modern TV units designed to complement your interiors.",
      image: "serviceTvUnit",
      category: "Living",
      intro:
        "Media walls and consoles that hide the clutter and turn the living room wall into the focal point of the home.",
      points: [
        "Floating TV units",
        "Storage TV walls",
        "Modern panel designs",
        "Decorative shelving",
      ],
    },
    {
      id: "s4",
      slug: "custom-furniture",
      title: "Customized Furniture",
      description:
        "Furniture solutions designed according to your space and requirements.",
      image: "serviceFurniture",
      category: "Furniture",
      intro:
        "Made-to-measure furniture for the corners standard furniture never fits, fabricated in the same premium materials as your cabinetry.",
      points: [
        "Custom cabinets",
        "Storage units",
        "Shelving",
        "Sideboards",
        "Other residential furniture",
      ],
    },
    {
      id: "s5",
      slug: "residential-interiors",
      title: "Residential Interiors",
      description:
        "Complete woodwork and interior solutions for residential spaces.",
      image: "serviceResidential",
      category: "Interiors",
      intro:
        "End-to-end residential woodwork — one team handling design, fabrication and installation across every room of the home.",
      points: [
        "Complete home woodwork",
        "Panelling and partitions",
        "Built-in storage",
        "Crockery and pooja units",
        "Site supervision and installation",
      ],
    },
  ],
  projects: [
    {
      id: "modern-ivory-kitchen",
      title: "Modern Ivory Kitchen",
      category: "Modular Kitchens",
      location: "Nigdi, Pimpri-Chinchwad",
      description:
        "A bright handleless modular kitchen in ivory acrylic with a compact island, planned for a family that cooks daily.",
      image: "project01",
      gallery: ["project01b"],
      projectType: "Residential Kitchen",
      designStyle: "Contemporary Minimal",
      materials: "Marine ply carcass, ivory acrylic shutters, quartz countertop",
      status: "Completed",
      features: [
        "Handleless profile shutters",
        "Tandem cutlery and pull-out units",
        "Under-cabinet task lighting",
        "Tall unit with built-in oven",
      ],
    },
    {
      id: "walnut-luxe-kitchen",
      title: "Walnut Luxe Kitchen",
      category: "Modular Kitchens",
      location: "Walhekarwadi, Chinchwad",
      description:
        "A darker, warmer kitchen in walnut veneer with black granite tops and brass profile handles.",
      image: "project02",
      gallery: ["project02b"],
      projectType: "Residential Kitchen",
      designStyle: "Warm Luxe",
      materials: "Walnut veneer, PU finish, black granite, brass hardware",
      status: "Completed",
      features: [
        "Floor-to-ceiling tall storage",
        "Integrated appliance column",
        "Concealed profile lighting",
        "Soft-close hinges throughout",
      ],
    },
    {
      id: "contemporary-storage-suite",
      title: "Contemporary Storage Suite",
      category: "Wardrobes",
      location: "Sector 32, Nigdi",
      description:
        "A full-height wardrobe wall with loft storage and a tucked-in study nook for a compact bedroom.",
      image: "project03",
      gallery: ["project03b"],
      projectType: "Bedroom Storage",
      designStyle: "Scandinavian Warm",
      materials: "BWP ply, textured laminate, aluminium profiles",
      status: "Completed",
      features: [
        "Loft storage above shutters",
        "Integrated study desk",
        "Adjustable internal shelving",
        "Full-length mirror panel",
      ],
    },
    {
      id: "minimalist-tv-lounge",
      title: "Minimalist TV Lounge",
      category: "TV Units",
      location: "Pimpri, Pune",
      description:
        "A charcoal media wall with slim brass reveals and a floating console that keeps the floor clear.",
      image: "project04",
      gallery: ["project04b"],
      projectType: "Living Room Media Wall",
      designStyle: "Modern Minimal",
      materials: "MDF with matt laminate, brass inlay, concealed LED",
      status: "Completed",
      features: [
        "Wall-hung floating console",
        "Brass reveal detailing",
        "Hidden cable management",
        "Backlit panel wash",
      ],
    },
    {
      id: "premium-master-wardrobe",
      title: "Premium Master Wardrobe",
      category: "Wardrobes",
      location: "Chinchwad, Pune",
      description:
        "A walk-in dressing room with glass shutters, open shelving and a central drawer island.",
      image: "project05",
      gallery: ["project05b"],
      projectType: "Walk-in Wardrobe",
      designStyle: "Classic Premium",
      materials: "Ply carcass, PU shutters, toughened glass, velvet inserts",
      status: "Completed",
      features: [
        "Central drawer island",
        "Velvet-lined accessory trays",
        "Warm shelf lighting",
        "Glass display shutters",
      ],
    },
    {
      id: "modern-residential-woodwork",
      title: "Modern Residential Woodwork",
      category: "Complete Interiors",
      location: "Walhekarwadi, Pimpri-Chinchwad",
      description:
        "Complete dining-area woodwork with a crockery unit, pooja niche and concealed storage.",
      image: "project06",
      gallery: ["project06b"],
      projectType: "Full Home Woodwork",
      designStyle: "Warm Contemporary",
      materials: "Teak-finish laminate, fluted glass, brass fittings",
      status: "Completed",
      features: [
        "Built-in crockery unit",
        "Lit pooja niche",
        "Fluted glass shutters",
        "Concealed base drawers",
      ],
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Anjali Deshmukh",
      projectType: "Modular Kitchen",
      rating: 5,
      review:
        "The kitchen design was exactly what we wanted. The team understood our space and created a beautiful, practical solution.",
    },
    {
      id: "t2",
      name: "Rohit Patil",
      projectType: "Wardrobe & Loft Storage",
      rating: 5,
      review:
        "Measurements were precise and the internal layout was planned around what we actually store. Installation was clean and on time.",
    },
    {
      id: "t3",
      name: "Sneha Kulkarni",
      projectType: "TV Unit",
      rating: 4,
      review:
        "The media wall completely changed the living room. Good material quality and a very neat finish.",
    },
    {
      id: "t4",
      name: "Mahesh Jadhav",
      projectType: "Complete Residential Woodwork",
      rating: 5,
      review:
        "One team handled design, fabrication and installation, so there was no confusion at any stage of the work.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "What types of modular kitchens do you design?",
      answer:
        "We design L-shaped, U-shaped, straight, parallel and island modular kitchens, planned around your room dimensions, appliances and storage needs.",
    },
    {
      id: "f2",
      question: "Do you provide customized designs?",
      answer:
        "Yes. Every kitchen, wardrobe, TV unit and furniture piece is designed to your space and requirement — we do not work from fixed catalogue sizes.",
    },
    {
      id: "f3",
      question: "Do you provide installation services?",
      answer:
        "Yes. Design, fabrication and installation are handled by our own team, so the finish on site matches the approved design.",
    },
    {
      id: "f4",
      question: "Can you design wardrobes according to room dimensions?",
      answer:
        "Absolutely. We measure the room on site and build sliding, hinged or walk-in wardrobes to the exact opening, including loft storage where height allows.",
    },
    {
      id: "f5",
      question: "Do you provide complete residential woodwork?",
      answer:
        "Yes — from kitchens and wardrobes to TV units, crockery units, panelling and customized furniture for the whole home.",
    },
    {
      id: "f6",
      question: "How does the consultation process work?",
      answer:
        "Share your requirement by phone or through the enquiry form. We discuss your space, take measurements, and present a design and material plan before fabrication begins.",
    },
    {
      id: "f7",
      question: "Can I request a customized quotation?",
      answer:
        "Yes. Quotations are prepared based on the finalised design, materials and hardware selected for your project.",
    },
    {
      id: "f8",
      question: "What areas do you serve?",
      answer:
        "We serve Nigdi, Walhekarwadi, Chinchwad, Pimpri and the surrounding Pimpri-Chinchwad and Pune areas.",
    },
  ],
  contact: {
    businessName: "Shri Krishna Kitchen And Interior",
    ownerName: "Krishna",
    phone: "9158773310",
    email: "support@shrikrishnakitchen.com",
    address:
      "Walhekarwadi Rd, near Rajyog Bharat petrol pump, Walhekarwadi, Sector No. 32, Nigdi, Pimpri-Chinchwad, Maharashtra 411033",
    consultationCta: "Get a Free Consultation",
    footerNote:
      "Interior design, modular kitchen fabrication and customized furniture manufacturing in Pimpri-Chinchwad.",
  },
};

export const processSteps = [
  { step: "01", title: "Consultation", text: "We understand your requirement, budget and how you use the space." },
  { step: "02", title: "Space Measurement", text: "Accurate on-site measurements of every wall, opening and service point." },
  { step: "03", title: "Design & Planning", text: "Layouts, finishes and hardware selected and approved before work starts." },
  { step: "04", title: "Fabrication", text: "Precision fabrication in premium materials with a controlled finish." },
  { step: "05", title: "Installation", text: "Our own team installs, aligns and hands over the finished space." },
];

export const whyChooseUs = [
  { mark: "◆", title: "Customized Designs", text: "Every unit drawn for your room, never adapted from a standard size." },
  { mark: "▲", title: "Premium Materials", text: "Marine ply, quality laminates, veneers and branded hardware." },
  { mark: "▮", title: "Space Optimization", text: "Storage planned into corners, lofts and awkward dimensions." },
  { mark: "✦", title: "Skilled Craftsmanship", text: "Clean joinery, aligned shutters and a consistent finish." },
  { mark: "●", title: "Professional Installation", text: "Installed and handed over by our own site team." },
];