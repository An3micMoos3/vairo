import { makeSku } from "../utils/makeSku";

export const coils = [
  {
    id: "VRT-CL-001",
    name: "Mesh Coil 0.4Ω (5-pack)",
    brand: "Vortex",
    category: "coil",
    image: "/img/placeholder.webp",
    ageRestricted: true,
    variants: [
      { label: "0.4Ω", sku: makeSku({ brand: "VRT", type: "CL", number: 1 }), priceCents: 17500 },
    ],
    attrs: { resistance: "0.4", fits: "Pod Pro" },
  },
];