<div align="center">
  <h1>💰 Finance FE</h1>
  <p>Sistema de gerenciamento financeiro pessoal moderno e intuitivo</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
</div>

---

## 📋 Sobre o Projeto

**Finance FE** é uma aplicação frontend completa para gerenciamento financeiro pessoal, desenvolvida com as tecnologias mais modernas do ecossistema React. O sistema oferece controle total sobre receitas, despesas, compras parceladas, cartões de crédito e muito mais.

### ✨ Funcionalidades Principais

- 📊 **Dashboard Interativo** - Visualização em tempo real do orçamento com gráficos dinâmicos
- 💳 **Gestão de Cartões** - Controle completo de cartões de crédito
- 💸 **Controle de Despesas** - Registro e acompanhamento de todas as despesas
- 💰 **Gestão de Receitas** - Controle de ganhos e rendimentos
- 🛒 **Compras e Parcelamentos** - Gerenciamento de compras à vista e parceladas
- 👥 **Cadastro de Pessoas** - Gestão de credores e devedores
- 📝 **Tipos de Pagamento** - Customização de formas de pagamento
- 📈 **Tipos de Compra** - Categorização de compras
- 🎯 **Deduções** - Controle de deduções fiscais

---

## 🚀 Stack Tecnológica

### Core
- **[Next.js 15.2](https://nextjs.org/)** - Framework React com SSR e rotas otimizadas
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI & Estilização
- **[TailwindCSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Flowbite 3](https://flowbite.com/)** - Componentes UI baseados em Tailwind
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e customizáveis

### Visualização de Dados
- **[Chart.js 4](https://www.chartjs.org/)** - Biblioteca de gráficos
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - Wrapper React para Chart.js

### Comunicação & Roteamento
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[React Router DOM](https://reactrouter.com/)** - Roteamento declarativo

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta performance

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.x ou superior
- **npm** ou **yarn** ou **pnpm**
- **Git**

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd finance-fe
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (se necessário):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8180
```

> **Nota:** A aplicação está configurada para se conectar ao backend na porta `8180` por padrão.

---

## 🎯 Como Usar

### Modo Desenvolvimento

Execute o servidor de desenvolvimento com Turbopack:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
finance-fe/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── creditCard/
│   │   ├── deduction/
│   │   ├── earning/
│   │   ├── expense/
│   │   ├── installment/
│   │   ├── paymentType/
│   │   ├── person/
│   │   ├── purchase/
│   │   ├── purchaseType/
│   │   ├── Dashboard.tsx
│   │   ├── Layout.tsx
│   │   └── NavBar.tsx
│   ├── pages/           # Páginas Next.js (rotas)
│   │   ├── api/         # API routes
│   │   ├── _app.tsx     # App customizado
│   │   ├── _document.tsx
│   │   └── [páginas]
│   ├── services/        # Serviços de API
│   │   ├── config.tsx   # Configuração Axios
│   │   └── [serviços]
│   └── styles/          # Estilos globais
│       └── globals.css
├── utils/               # Utilitários e helpers
├── next.config.ts       # Configuração Next.js
├── tailwind.config.ts   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── package.json
```

---

## 🔌 Backend / API

A aplicação consome uma API REST que deve estar rodando em:

```
http://127.0.0.1:8180
```

### Configuração da API

A configuração do cliente HTTP está em [`src/services/config.tsx`](src/services/config.tsx):

- **Base URL:** `http://127.0.0.1:8180`
- **Timeout:** 15 segundos
- **Headers:** JSON (Content-Type e Accept)
- **Interceptors:** Log de erros no console

### Endpoints Disponíveis

Os serviços estão organizados por módulo:

- `creditCard` - Gerenciamento de cartões de crédito
- `deduction` - Deduções fiscais
- `earning` - Receitas/Ganhos
- `expense` - Despesas
- `installment` - Parcelamentos
- `paymentType` - Tipos de pagamento
- `person` - Pessoas
- `purchase` - Compras
- `purchaseType` - Tipos de compra

---

## 🎨 Características UI/UX

- ✅ **Design Responsivo** - Funciona em desktop, tablet e mobile
- 🌗 **Dark Mode** - Suporte a tema escuro
- 📊 **Gráficos Interativos** - Visualizações de dados com Chart.js
- 🎭 **Modais** - Componentes modais para CRUD de entidades
- 🧭 **Navegação Intuitiva** - NavBar com acesso rápido a todas as funcionalidades

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com Turbopack |
| `npm run build` | Cria build de produção otimizado |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa verificação de código com ESLint |

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e de uso pessoal.

---

## 👤 Autor

**Roger Toledo**

---

## 🙏 Agradecimentos

- Next.js Team
- React Community
- TailwindCSS & Flowbite
- Chart.js Contributors

---

<div align="center">
  <p>Desenvolvido com ❤️ usando Next.js e React</p>
</div>

