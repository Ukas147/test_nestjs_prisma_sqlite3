# API NestJS

API REST desenvolvida com NestJS, Prisma e SQLite seguindo princípios de Clean Architecture.

## 🚀 Tecnologias

- **NestJS** 11.x - Framework Node.js
- **Prisma** 6.x - ORM
- **SQLite** - Banco de dados
- **TypeScript** 5.x

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Sincronizar banco de dados
npx prisma db push

# Gerar Prisma Client
npx prisma generate
```

## 🏃 Executar

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

**Porta padrão:** 5400

## 📚 Arquitetura

Projeto organizado em camadas seguindo Clean Architecture:

```
src/
├── [módulo]/
│   ├── domain/           # Entidades e interfaces
│   ├── application/      # Casos de uso e DTOs
│   ├── infrastructure/   # Implementações (Prisma)
│   └── presentation/     # Controllers (REST)
```

---

## 👤 Módulo Users

### Entidade User

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID único |
| `email` | string | Email único |
| `name` | string | Nome completo |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Data de atualização |

**Métodos:**
- `getDisplayName()` - Retorna nome formatado
- `getInitials()` - Retorna iniciais
- `getEmailDomain()` - Retorna domínio do email

### Rotas Users

#### `POST /users`
Criar novo usuário.

**Body:**
```json
{
  "email": "user@example.com",
  "name": "João Silva"
}
```

**Response:** `201`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "João Silva",
  "displayName": "João Silva",
  "initials": "JS",
  "emailDomain": "example.com",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:00:00.000Z"
}
```

**Erros:**
- `400` - Email já está em uso

---

#### `GET /users`
Listar todos os usuários.

**Response:** `200`
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "João Silva",
    "displayName": "João Silva",
    "initials": "JS",
    "emailDomain": "example.com",
    "createdAt": "2025-10-05T10:00:00.000Z",
    "updatedAt": "2025-10-05T10:00:00.000Z"
  }
]
```

---

#### `GET /users/:id`
Buscar usuário por ID.

**Response:** `200`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "João Silva",
  "displayName": "João Silva",
  "initials": "JS",
  "emailDomain": "example.com",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:00:00.000Z"
}
```

**Erros:**
- `404` - Usuário não encontrado

---

#### `PUT /users/:id`
Atualizar usuário.

**Body:**
```json
{
  "email": "newemail@example.com",
  "name": "João da Silva"
}
```

**Response:** `200`
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "name": "João da Silva",
  "displayName": "João da Silva",
  "initials": "JS",
  "emailDomain": "example.com",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:00:00.000Z"
}
```

**Erros:**
- `400` - Email já está em uso
- `404` - Usuário não encontrado

---

#### `DELETE /users/:id`
Deletar usuário.

**Response:** `200`
```json
{
  "message": "Usuário deletado com sucesso"
}
```

**Erros:**
- `404` - Usuário não encontrado

---

## 📦 Módulo Products

### Entidade Product

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID único |
| `name` | string | Nome do produto (min: 2 chars) |
| `price` | number | Preço (> 0) |
| `description` | string | Descrição |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Data de atualização |

**Métodos:**
- `getFormattedPrice()` - Retorna preço formatado (R$ XX.XX)

### Rotas Products

#### `POST /products`
Criar novo produto.

**Body:**
```json
{
  "name": "Notebook",
  "price": 2500.00,
  "description": "Notebook Dell Inspiron 15"
}
```

**Response:** `201`
```json
{
  "id": 1,
  "name": "Notebook",
  "price": 2500.00,
  "description": "Notebook Dell Inspiron 15",
  "formattedPrice": "R$ 2500.00",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:00:00.000Z"
}
```

**Erros:**
- `400` - Nome deve ter pelo menos 2 caracteres
- `400` - Preço deve ser maior que zero

---

#### `GET /products`
Listar todos os produtos.

**Response:** `200`
```json
[
  {
    "id": 1,
    "name": "Notebook",
    "price": 2500.00,
    "description": "Notebook Dell Inspiron 15",
    "formattedPrice": "R$ 2500.00",
    "createdAt": "2025-10-05T10:00:00.000Z",
    "updatedAt": "2025-10-05T10:00:00.000Z"
  }
]
```

---

#### `GET /products/:id`
Buscar produto por ID.

**Response:** `200`
```json
{
  "id": 1,
  "name": "Notebook",
  "price": 2500.00,
  "description": "Notebook Dell Inspiron 15",
  "formattedPrice": "R$ 2500.00",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:00:00.000Z"
}
```

**Erros:**
- `404` - Produto não encontrado

---

#### `PUT /products/:id`
Atualizar produto.

**Body:**
```json
{
  "name": "Notebook Atualizado",
  "price": 2300.00,
  "description": "Notebook Dell Inspiron 15 - Atualizado"
}
```

**Response:** `200`
```json
{
  "id": 1,
  "name": "Notebook Atualizado",
  "price": 2300.00,
  "description": "Notebook Dell Inspiron 15 - Atualizado",
  "formattedPrice": "R$ 2300.00",
  "createdAt": "2025-10-05T10:00:00.000Z",
  "updatedAt": "2025-10-05T10:05:00.000Z"
}
```

**Erros:**
- `400` - Dados inválidos
- `404` - Produto não encontrado

---

#### `DELETE /products/:id`
Deletar produto.

**Response:** `200`
```json
{
  "message": "Produto deletado com sucesso"
}
```

**Erros:**
- `404` - Produto não encontrado

---

## 🗄️ Banco de Dados

**Tipo:** SQLite  
**Arquivo:** `prisma/dev.db`

### Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("users")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("products")
}
```

### Comandos Prisma

```bash
# Sincronizar schema
npx prisma db push

# Visualizar dados
npx prisma studio

# Gerar client
npx prisma generate
```

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

---

## 📝 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run build` | Compila o projeto |
| `npm run start:prod` | Inicia em produção |
| `npm run lint` | Executa ESLint |
| `npm run format` | Formata código com Prettier |

---

## 🔗 Endpoints Resumo

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Health check |
| `POST` | `/users` | Criar usuário |
| `GET` | `/users` | Listar usuários |
| `GET` | `/users/:id` | Buscar usuário |
| `PUT` | `/users/:id` | Atualizar usuário |
| `DELETE` | `/users/:id` | Deletar usuário |
| `POST` | `/products` | Criar produto |
| `GET` | `/products` | Listar produtos |
| `GET` | `/products/:id` | Buscar produto |
| `PUT` | `/products/:id` | Atualizar produto |
| `DELETE` | `/products/:id` | Deletar produto |

---

## 📄 Licença

UNLICENSED
