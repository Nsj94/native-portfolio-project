declare module '*.png';

interface Currency {
  name: string;
  value: number;
  flag: string;
  symbol: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
