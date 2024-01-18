/* eslint-disable prettier/prettier */
class ProductFeatureListDTO {
  name: string;
  description: string;
}

class ProductImageListDTO {
  url: string;
  description: string;
}

export class ProductListDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  amount: number;
  description: string;
  category: string;
  characteristics: ProductFeatureListDTO[];
  images: ProductImageListDTO[];
}
