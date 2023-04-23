interface CartItem {
    count: number;
    children: any;
    id: string ;
    firstname: string ;
    lastname: string ;
    category: string ;
    coast: number;
    stars: number ;
    time: number ;
    image: string ;
    about: string ;
  }
  
  export type Cart = CartItem[];