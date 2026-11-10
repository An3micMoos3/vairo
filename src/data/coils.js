import { makeSku } from "../utils/makeSku";

export const coils = [
  {
    id: "ASP-CL-001",
    name: "Aspire AF Tank",
    brand: "Aspire",
    category: "coil",
    image: "/img/products/asp-cl-001.webp",
    ageRestricted: true,
    variants: [
      { label: "Black", sku: makeSku({ brand: "ASP", type: "CL", number: 1 }), priceCents: 17500 },
      { label: "Red", sku: makeSku({ brand: "ASP", type: "CL", number: 1 }), priceCents: 17500 },
    ],
    attrs: { fits: "Aspire AF Device" },
  
  },
  {
    id: "VOO-CL-001",
    name: "GTX Mesh Coil 0.15Ω",
    brand: "Voopoo",
    category: "coil",
    image: "/img/products/voo-cl-001.webp",
    ageRestricted: true,
    variants: [
      { label: "0.15Ω", sku: makeSku({ brand: "VOO", type: "CL", number: 1 }), priceCents: 17500 },
    ],
    attrs: { resistance: "0.15", watts: "60-75", fits: "VooPoo Device" },
  },
   {
    id: "VOO-CL-002",
    name: "Argus Mesh Coil 1.0Ω",
    brand: "Voopoo",
    category: "coil",
    image: "/img/products/voo-cl-002.webp",
    ageRestricted: true,
    variants: [
      { label: "1.0Ω", sku: makeSku({ brand: "VOO", type: "CL", number: 1 }), priceCents: 17500 },
    ],
    attrs: { resistance: "1.0", fits: "Argus Pod" },
  },
  {
    id: "VOO-CL-PNP-003",
    name: "Voopoo PnP Coil 0.3Ω",
    brand: "Voopoo",
    category: "coil",
    brand: "Vortex",
    category: "coil",
    image: "/img/voo-cl-pnp-003.webp",
    ageRestricted: true,
    variants: [
      { label: "0.4Ω", sku: makeSku({ brand: "VRT", type: "CL", number: 1 }), priceCents: 17500 },
    ],
    attrs: { resistance: "0.3", fits: "VooPoo Tank" },
  },
 
  
];