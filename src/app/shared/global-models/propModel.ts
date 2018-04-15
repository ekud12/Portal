export class PropertyModel {
  constructor(
    public category: string,
    public subcategory: string,
    public key: string,
    public value: string,
    public description: string
  ) {}
}

export class SubCategoryModel {
  constructor(public category: string, public subcategory: string) {}
}
