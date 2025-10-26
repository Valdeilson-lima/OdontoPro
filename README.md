# 🦷 OdontoPRO

> Sistema web moderno para clínicas odontológicas

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-Latest-000000?style=for-the-badge)

## 📋 Sobre o Projeto

O **OdontoPRO** é um sistema web completo desenvolvido para clínicas odontológicas, oferecendo uma interface moderna e responsiva para gerenciamento de consultas, profissionais e pacientes.

### ✨ Funcionalidades

- 🏠 **Landing Page Responsiva** - Interface moderna e atrativa
- 📱 **Design Mobile-First** - Otimizado para todos os dispositivos
- 👨‍⚕️ **Painel Administrativo** - Gestão completa da clínica
- 📅 **Agendamento Online** - Sistema de marcação de consultas
- 🔐 **Autenticação Segura** - Portal exclusivo para profissionais
- 🎨 **UI/UX Moderno** - Components baseados no Shadcn/ui

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework de estilização utilitário
- **Shadcn/ui** - Biblioteca de componentes moderna
- **Lucide React** - Ícones SVG otimizados

### Ferramentas de Desenvolvimento

- **ESLint** - Linting e padronização de código
- **PostCSS** - Processamento de CSS
# 🦷 OdontoPRO

> Sistema web moderno para clínicas odontológicas

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?style=for-the-badge&logo=tailwind-css)

Uma aplicação Next.js (App Router) com painel administrativo, agendamento de consultas, gestão de pacientes e integração com Stripe e Cloudinary.

## Sumário

- Sobre
- Tecnologias
- Requisitos
- Configuração (.env)
- Rodando localmente
- Banco de dados (Prisma)
- Integrações (Stripe, Cloudinary)
- Deploy
- Contribuição

## 📋 Sobre o Projeto

O **OdontoPRO** é um sistema web completo para clínicas odontológicas com foco em usabilidade, performance e extensibilidade.

### Funcionalidades principais

- Painel administrativo (gestão de serviços, profissionais e pacientes)
- Agendamento de consultas
- Autenticação via OAuth (GitHub no exemplo) e NextAuth
- Integração com Stripe para planos e pagamentos
- Upload de imagens via Cloudinary

## 🚀 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma (Postgres)
- Stripe
- Cloudinary

## 🛠️ Requisitos

- Node.js 18+
- npm ou yarn
- Postgres (local ou remoto)

## ⚙️ Configuração de ambiente

Cópia do arquivo de exemplo:

```bash
cp .env.example .env.local
```

Preencha as variáveis no arquivo criado. Variáveis presentes (exemplos):

- DATABASE_URL=postgresql://user:password@localhost:5432/odontopro
- NEXT_PUBLIC_BASE_URL=http://localhost:3000
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=replace_with_a_long_secret
- AUTH_SECRET=replace_with_a_long_secret
- AUTH_GITHUB_ID=your_github_client_id
- AUTH_GITHUB_SECRET=your_github_client_secret
- STRIPE_SECRET_KEY=sk_test_xxx
- NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
- STRIPE_SUCCESS_URL=http://localhost:3000/dashboard/plans
- STRIPE_PLAN_BASIC=price_basic_xxx
- STRIPE_PLAN_PROFISSIONAL=price_professional_xxx
- STRIPE_SECRET_WEBHOOK_KEY=whsec_xxx
- CLOUDINARY_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret
- VERCEL_URL=your-production-url.vercel.app
- NEXTAUTH_URL_INTERNAL=http://localhost:3000

Observações:

- Nunca comite chaves reais. Use o `.env.example` apenas como referência.
- Mantenha `NEXTAUTH_SECRET`/`AUTH_SECRET` com valores longos e aleatórios (ex: 32+ caracteres).

## Rodando localmente

1. Instale dependências:

```bash
npm install
# ou
yarn install
```

2. Configure as variáveis de ambiente (veja acima).

3. Inicialize o banco (Prisma) e aplique migrations locais:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Rode a aplicação em modo desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000

## Banco de dados (Prisma)

- O projeto usa Prisma com Postgres. O `schema.prisma` está em `prisma/schema.prisma`.
- Comandos úteis:

```bash
npx prisma generate      # gera o client
npx prisma migrate dev   # cria/aplica migrations locais
npx prisma db push       # sincroniza schema sem criar migration
npx prisma studio        # abre Prisma Studio
```

Se estiver usando um banco remoto, atualize `DATABASE_URL` apropriadamente.

## Integrações

Stripe
- Configure `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` e `STRIPE_SECRET_WEBHOOK_KEY`.
- Para testar webhooks localmente, use o `stripe-cli` e copie o secret para `STRIPE_SECRET_WEBHOOK_KEY`.

Cloudinary
- Configure `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET` para permitir upload de imagens em `/api/image/upload`.

Auth (NextAuth)
- `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET` são exemplos. Ajuste provedores conforme necessário.

## Deploy

Vercel (recomendado)

- Crie o projeto no Vercel e adicione as variáveis de ambiente no painel (use os mesmos nomes do `.env.example`).
- Configure o domínio e a URL de produção (`VERCEL_URL` pode ser definida automaticamente pelo Vercel).

Docker

```bash
docker build -t odontopro .
docker run -p 3000:3000 -e DATABASE_URL="<sua_url>" odontopro
```

## Scripts disponíveis

```bash
npm run dev        # desenvolvimento
npm run build      # build produção
npm run start      # iniciar build
npm run lint       # lint
npm run lint:fix   # lint fix
```

## Contribuição

Contribuições e issues são bem-vindas. Siga o fluxo padrão de PRs:

1. Fork
2. Branch com feature
3. Commit e push
4. Abra um PR descrevendo as mudanças

## Licença

MIT

## Contato

- GitHub: [@Valdeilson-lima](https://github.com/Valdeilson-lima)

---

Feito com ❤️ por Valdeilson Lima
