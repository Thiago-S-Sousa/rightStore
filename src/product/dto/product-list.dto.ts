/* eslint-disable prettier/prettier */

class ListProductCharacteristicDTO {
  name: string;
  description: string;
}

class ListProductImageDTO {
  url: string;
  description: string;
}

export class ProductListDTO {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly value: number,
    private readonly amount: number,
    private readonly description: string,
    private readonly characteristics: ListProductCharacteristicDTO[],
    private readonly images: ListProductImageDTO[],
    private readonly category: string,
  ) {}
}
