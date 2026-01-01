export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}
