// Placeholder prices. The real version asks the courier's API for a quote
// from the store's address to the customer's address, using parcel weight.
const ZONES = {
  "North West": 6500,
  "Gauteng": 8500,
  "Other provinces": 12000,
};

export const provinces = Object.keys(ZONES);

export function quoteDelivery({ fulfilment, province }) {
  if (fulfilment === "collect") return 0;
  return ZONES[province] ?? ZONES["Other provinces"];
}
