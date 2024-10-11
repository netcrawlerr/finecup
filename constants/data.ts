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
      "A rich, frothy coffee drink made with espresso and steamed milk.",
    image: require("../assets/images/cappuccino.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 2,
    name: "Latte",
    description:
      "A smooth blend of espresso and steamed milk, topped with a light layer of foam.",
    image: require("../assets/images/latte-macchiato.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 3,
    name: "Espresso",
    description:
      "A strong and bold coffee brewed by forcing hot water through finely-ground coffee.",
    image: require("../assets/images/espresso.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 4,
    name: "Americano",
    description:
      "A simple coffee drink made by diluting espresso with hot water.",
    image: require("../assets/images/americano.png"),
    size: ["small", "medium", "large"],
  },
  {
    id: 5,
    name: "Mocha",
    description:
      "A delicious blend of espresso, steamed milk, and chocolate syrup.",
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
