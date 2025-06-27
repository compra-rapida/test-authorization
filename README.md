# 🔐 Authorization Test - Sistema de Autenticação com Refresh Tokens

## 📋 Sobre o Projeto

Este é um sistema de autenticação completo desenvolvido em Node.js com TypeScript, implementando autenticação JWT com refresh tokens. O projeto utiliza Express.js como framework web, Prisma como ORM e SQLite como banco de dados.

## 🚀 Funcionalidades

- ✅ **Cadastro de usuários** (`/signup`)
- ✅ **Login com JWT** (`/signin`)
- ✅ **Refresh Token** (`/refresh-token`)
- ✅ **Acesso a informações pessoais protegidas** (`/personal-info/:userId`)
- ✅ **Middleware de autenticação**
- ✅ **Criptografia de senhas com bcrypt**
- ✅ **Validação de dados com Zod**

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM moderno para banco de dados
- **SQLite** - Banco de dados
- **JWT** - JSON Web Tokens para autenticação
- **bcryptjs** - Criptografia de senhas
- **Zod** - Validação de esquemas
- **ESLint** - Linting de código

## 📁 Estrutura do Projeto

```
src/
├── config/
│   ├── constants.ts      # Constantes da aplicação
│   └── env.ts           # Configurações de ambiente
├── controllers/
│   ├── GetPersonalInfoController.ts  # Controller para info pessoal
│   ├── RefreshTokenController.ts     # Controller para refresh token
│   ├── SignInController.ts           # Controller de login
│   └── SignUpController.ts           # Controller de cadastro
├── errors/
│   ├── EmailAlreadyInUse.ts         # Erro de email em uso
│   ├── ExpiredRefreshToken.ts       # Erro de token expirado
│   ├── InvalidCredentials.ts        # Erro de credenciais inválidas
│   └── InvalidRefreshToken.ts       # Erro de token inválido
├── lib/
│   └── prisma.ts                    # Cliente do Prisma
├── middlewares/
│   └── authMiddleware.ts            # Middleware de autenticação
├── repositories/
│   ├── AccountsRepository.ts        # Repositório de contas
│   └── RefreshTokenRepository.ts    # Repositório de refresh tokens
└── index.ts                         # Arquivo principal da aplicação
```

## 🏗️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn (gerenciador de pacotes)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone [url-do-repositorio]
   cd authorization-test
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Configure o banco de dados:**
   ```bash
   # Gerar o cliente Prisma
   yarn db:generate

   # Executar as migrações
   yarn db:migrate
   ```

## 🚀 Como Executar

### Desenvolvimento
```bash
yarn dev
```

### Scripts Disponíveis

```bash
# Executar em modo de desenvolvimento
yarn dev

# Gerar cliente do Prisma
yarn db:generate

# Executar migrações
yarn db:migrate

# Resetar banco de dados
yarn db:reset

# Abrir Prisma Studio
yarn db:studio
```

## 📡 API Endpoints

### 1. Cadastro de Usuário
```http
POST /signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nome do Usuário"
}
```

### 2. Login
```http
POST /signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Resposta:**
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token-id"
}
```

### 3. Renovar Token
```http
POST /refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh-token-id"
}
```

### 4. Informações Pessoais (Protegido)
```http
GET /personal-info/:userId
Authorization: Bearer jwt-token
```

## 🗄️ Esquema do Banco de Dados

### Tabela: accounts
- `id` - ID único da conta
- `email` - Email único do usuário
- `name` - Nome do usuário
- `password` - Senha criptografada
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Tabela: refresh_tokens
- `id` - ID único do refresh token
- `accountId` - ID da conta (FK)
- `expiresAt` - Data de expiração
- `createdAt` - Data de criação

## 🛡️ Segurança

- ❌ **Senhas criptografadas** com bcryptjs
- ❌ **JWT com tempo de expiração curto** (15 segundos)
- ❌ **Refresh tokens com expiração configurável**
- ❌ **Middleware de autenticação** para rotas protegidas
- ❌ **Validação de entrada** com Zod

## 🧪 Testando a API

Use o arquivo `test.rest` incluído no projeto para testar os endpoints. Você pode usar extensões como REST Client no VS Code.

## 📝 Notas

- Os access tokens têm expiração de 15 segundos (configurado para testes)
- Os refresh tokens expiram com base na constante `EXP_TIME_IN_DAYS`
- O banco de dados SQLite é criado automaticamente na primeira execução

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

**Desenvolvido com ❤️ usando Node.js e TypeScript**
