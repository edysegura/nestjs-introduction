export class Product {

  links?: any[];

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number
  ) { }
}
