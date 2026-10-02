import type { DeliveryAddress } from "../domain/delivery";

export const initialAddresses: DeliveryAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    street: "Flat 402, Sunshine Heights, 12th Main Rd, Indiranagar",
    landmark: "Near Metro Pillar 84",
    city: "Bengaluru",
    pincode: "560038",
    isDefault: true
  },
  {
    id: "addr-2",
    label: "Work",
    street: "Floor 5, Innov8 Co-Working, Koramangala 4th Block",
    landmark: "Opposite Sony World Signal",
    city: "Bengaluru",
    pincode: "560034",
    isDefault: false
  },
  {
    id: "addr-3",
    label: "Other",
    street: "Villa 18, Palm Meadows, Whitefield",
    landmark: "Behind Forum Value Mall",
    city: "Bengaluru",
    pincode: "560066",
    isDefault: false
  }
];
