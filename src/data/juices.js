import { makeSku } from "../utils/makeSku";

export const juices = [
  {
    id: "SLK-LF-001",
    name: "Mango Ice Longfill 60ml",
    brand: "Slick",
    category: "juice",
    image: "/img/placeholder.webp",
    ageRestricted: true,
    variants: [
      { label: "3mg", sku: makeSku({ brand: "SLK", type: "LF", number: 1, variant: "3" }), priceCents: 18900 },
      { label: "6mg", sku: makeSku({ brand: "SLK", type: "LF", number: 1, variant: "6" }), priceCents: 18900 },
    ],
    attrs: { size: "60ml" },
  },
  {
    id: "SLK-LF-002",
    name: "Berry Blast Longfill 60ml",
    brand: "Slick",
    category: "juice",
    image: "/img/placeholder.webp",
    ageRestricted: true,
    variants: [
      { label: "3mg", sku: makeSku({ brand: "SLK", type: "LF", number: 2, variant: "3" }), priceCents: 18900 },
    ],
    attrs: { size: "60ml" },
  },
    {
    id: "NBL-LF-001",
    name: "Cola Chill Longfill 60ml",
    brand: "Nebula",
    category: "juice",
    image: "/img/placeholder.webp",
    ageRestricted: true,
    variants: [
      { label: "3mg",  sku: makeSku({ brand: "NBL", type: "LF", number: 1, variant: "3" }),  priceCents: 17900 },
      { label: "6mg",  sku: makeSku({ brand: "NBL", type: "LF", number: 1, variant: "6" }),  priceCents: 17900 },
      { label: "12mg", sku: makeSku({ brand: "NBL", type: "LF", number: 1, variant: "12" }), priceCents: 17900 },
    ],
    attrs: { size: "60ml" },
  },
];