/* ============================================================
   MANDINE — menu data
   Each item: id, name, desc, category, veg, spice (0-3)
   price OR sizes:[{label, price}]
   ============================================================ */
const MENU_ITEMS = [
  // ---------- MANDI ----------
  {
    id: "chicken-mandi",
    name: "Chicken Mandi",
    desc: "Whole chicken leg lowered onto smoked rice, finished with toasted nuts and our house mandi sauce.",
    category: "mandi",
    veg: false,
    spice: 1,
    sizes: [{ label: "Half", price: 220 }, { label: "Full", price: 420 }]
  },
  {
    id: "mutton-mandi",
    name: "Mutton Mandi",
    desc: "Slow-smoked mutton over saffron rice, rested until the bone gives without a knife.",
    category: "mandi",
    veg: false,
    spice: 1,
    sizes: [{ label: "Half", price: 320 }, { label: "Full", price: 600 }]
  },
  {
    id: "mixed-mandi",
    name: "Mixed Mandi",
    desc: "Chicken and mutton, one pot. For the table that can't agree on one thing.",
    category: "mandi",
    veg: false,
    spice: 1,
    sizes: [{ label: "Half", price: 300 }, { label: "Full", price: 560 }]
  },
  {
    id: "veg-mandi",
    name: "Vegetable Mandi",
    desc: "Charred seasonal vegetables over smoked rice, no meat, all the smoke.",
    category: "mandi",
    veg: true,
    spice: 1,
    sizes: [{ label: "Half", price: 180 }, { label: "Full", price: 320 }]
  },

  // ---------- BIRYANI ----------
  {
    id: "hyderabadi-chicken-biryani",
    name: "Hyderabadi Chicken Biryani",
    desc: "Layered and sealed under dough, steamed on dum until the rice takes on every spice.",
    category: "biryani",
    veg: false,
    spice: 2,
    sizes: [{ label: "Half", price: 180 }, { label: "Full", price: 320 }]
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    desc: "Marinated mutton layered between long-grain rice, sealed and slow-cooked on dum.",
    category: "biryani",
    veg: false,
    spice: 2,
    sizes: [{ label: "Half", price: 260 }, { label: "Full", price: 480 }]
  },
  {
    id: "egg-biryani",
    name: "Egg Biryani",
    desc: "Boiled eggs folded through dum-cooked rice with fried onion and mint.",
    category: "biryani",
    veg: false,
    spice: 1,
    price: 160
  },
  {
    id: "veg-biryani",
    name: "Vegetable Biryani",
    desc: "Garden vegetables and paneer layered through fragrant basmati, sealed on dum.",
    category: "biryani",
    veg: true,
    spice: 1,
    price: 170
  },
  {
    id: "prawns-biryani",
    name: "Prawns Biryani",
    desc: "Coastal-style prawns, quick-sealed with rice so they stay just short of overcooked.",
    category: "biryani",
    veg: false,
    spice: 2,
    price: 300
  },

  // ---------- SIDES & EXTRAS ----------
  {
    id: "mandi-sauce",
    name: "Extra Mandi Sauce",
    desc: "The tomato-chilli sauce that goes under every mandi plate, by the bottle.",
    category: "sides",
    veg: true,
    spice: 2,
    price: 40
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    desc: "Deep-fried, curry-leaf tempered, sharp with chilli. A starter that doesn't behave like one.",
    category: "sides",
    veg: false,
    spice: 3,
    price: 220
  },
  {
    id: "mutton-seekh",
    name: "Mutton Seekh Kebab",
    desc: "Hand-skewered minced mutton, char-grilled, four to a plate.",
    category: "sides",
    veg: false,
    spice: 2,
    price: 240
  },
  {
    id: "raita",
    name: "Raita",
    desc: "Whisked curd with cucumber and roasted cumin, to cool things down.",
    category: "sides",
    veg: true,
    spice: 0,
    price: 60
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    desc: "Tandoor-blistered, brushed with garlic butter the second it comes off the wall.",
    category: "sides",
    veg: true,
    spice: 0,
    price: 50
  },
  {
    id: "papad",
    name: "Roasted Papad",
    desc: "Thin, open-flame roasted, served whole.",
    category: "sides",
    veg: true,
    spice: 0,
    price: 25
  },

  // ---------- BEVERAGES ----------
  {
    id: "sulaimani-chai",
    name: "Sulaimani Chai",
    desc: "Black tea steeped with cardamom, clove and a thread of saffron. No milk, no apology.",
    category: "drinks",
    veg: true,
    spice: 0,
    price: 50
  },
  {
    id: "laban",
    name: "Laban",
    desc: "Salted, churned buttermilk served ice-cold alongside mandi.",
    category: "drinks",
    veg: true,
    spice: 0,
    price: 60
  },
  {
    id: "lime-soda",
    name: "Fresh Lime Soda",
    desc: "Sweet, salted, or half-half — squeezed when you order, not before.",
    category: "drinks",
    veg: true,
    spice: 0,
    price: 70
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    desc: "Chilled bottle, your choice at the counter.",
    category: "drinks",
    veg: true,
    spice: 0,
    price: 50
  }
];

const CATEGORY_LABELS = {
  all: "All",
  mandi: "Mandi",
  biryani: "Biryani",
  sides: "Sides & Extras",
  drinks: "Drinks"
};
