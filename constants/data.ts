interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  size: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Cappuccino",
    description:
      "A rich, frothy coffee drink that perfectly balances bold espresso with creamy steamed milk. Topped with a generous layer of velvety milk foam, this Italian classic offers a harmonious blend of flavors. Ingredients: Espresso, steamed milk, and milk foam. Optionally dusted with cocoa powder for an extra touch of indulgence.",
    image: require("../assets/images/cappuccino.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 2,
    name: "Latte",
    description:
      "A smooth and comforting coffee beverage that combines the intensity of espresso with the silky texture of steamed milk. Topped with a light layer of foam, the latte offers a milder coffee flavor compared to other espresso drinks. Ingredients: Espresso and steamed milk, with a small amount of milk foam on top. Can be customized with various flavored syrups for added sweetness.",
    image: require("../assets/images/latte-macchiato.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 3,
    name: "Espresso",
    description:
      "The foundation of many coffee drinks, espresso is a concentrated shot of pure coffee flavor. Brewed by forcing hot water through finely-ground coffee beans under high pressure, it results in a strong, bold taste with a distinctive crema on top. Ingredients: Finely ground coffee beans and hot water. Served in a small cup and often enjoyed straight or used as a base for other coffee drinks.",
    image: require("../assets/images/espresso.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 4,
    name: "Americano",
    description:
      "A simple yet satisfying coffee drink that combines the boldness of espresso with the smoothness of hot water. This drink offers a similar strength to drip coffee but with the distinct flavor profile of espresso. Ingredients: Espresso and hot water. The ratio can be adjusted to suit individual preferences for strength and volume.",
    image: require("../assets/images/americano.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 5,
    name: "Mocha",
    description:
      "A delightful fusion of coffee and chocolate, the mocha is perfect for those with a sweet tooth. This indulgent drink combines the rich flavors of espresso and chocolate with the creamy texture of steamed milk. Ingredients: Espresso, steamed milk, chocolate syrup, and often topped with whipped cream and a dusting of cocoa powder or chocolate shavings.",
    image: require("../assets/images/mocha.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 6,
    name: "Bunna",
    description:
      "Just Bunna.",
    image: require("../assets/images/coffee-cup.png"),
    size: ["small", "medium", "large"],
  },
];

export default products;
