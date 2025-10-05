export class Product {
  private constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _description: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  static create(
    id: number,
    name: string,
    price: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ): Product {
    if (!name || name.trim().length < 2) {
      throw new Error('Nome do produto deve ter pelo menos 2 caracteres');
    }
    
    if (price <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    return new Product(id, name, price, description, createdAt, updatedAt);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  getFormattedPrice(): string {
    return `R$ ${this._price.toFixed(2)}`;
  }
}
