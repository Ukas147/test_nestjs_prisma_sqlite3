// Interface para representar dados de produto sem dependências
export interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para operações de repositório sem dependências
export interface ProductRepositoryInterface {
  create(name: string, price: number, description: string): Promise<ProductData>;
  findById(id: number): Promise<ProductData | null>;
  findAll(): Promise<ProductData[]>;
  update(id: number, name: string, price: number, description: string): Promise<ProductData>;
  delete(id: number): Promise<void>;
}


