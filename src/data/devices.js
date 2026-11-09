import { makeSku } from "../utils/makeSku";

export const devices = [
  {
    id: "VRT-DV-001",
    name: "Pod Pro Starter Kit",
    brand: "Vortex",
    category: "device",
    image: "/img/placeholder.webp",
    ageRestricted: true,
    variants: [
      { label: "Black",  sku: makeSku({ brand: "VRT", type: "DV", number: 1, variant: "BLK" }), priceCents: 45000 },
      { label: "Silver", sku: makeSku({ brand: "VRT", type: "DV", number: 1, variant: "SLV" }), priceCents: 45000 },
    ],
    attrs: { battery: "1000mAh" },
  },
];