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
- **Git** - Controle de versão

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/Valdeilson-lima/OdontoPro.git
cd OdontoPro
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
odontopro/
├── public/                 # Arquivos estáticos
│   ├── logo-odonto.png    # Logo da clínica
│   ├── doctor-hero.png    # Imagem hero
│   └── ...
├── src/
│   ├── app/               # App Router do Next.js
│   │   ├── (public)/      # Rotas públicas
│   │   │   ├── page.tsx   # Landing page
│   │   │   └── _components/
│   │   │       └── header.tsx
│   │   ├── (panel)/       # Painel administrativo
│   │   │   └── dashboard/
│   │   ├── globals.css    # Estilos globais
│   │   └── layout.tsx     # Layout principal
│   ├── components/        # Componentes reutilizáveis
│   │   └── ui/           # Componentes UI (Shadcn)
│   └── lib/              # Utilitários e configurações
├── components.json        # Configuração Shadcn/ui
├── tailwind.config.js     # Configuração Tailwind
└── tsconfig.json         # Configuração TypeScript
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

### Cores Principais
- **Primary**: Emerald (`#10b981`)
- **Background**: White (`#ffffff`)
- **Text**: Zinc (`#18181b`, `#71717a`)

### Tipografia
- **Fonte Principal**: Inter (via next/font)
- **Tamanhos**: Responsivos com classes Tailwind

### Componentes
Todos os componentes UI são baseados no **Shadcn/ui**, garantindo:
- Acessibilidade (a11y)
- Consistência visual
- Fácil customização
- Performance otimizada

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Features Mobile
- Menu hambúrguer com Sheet lateral
- Navegação touch-friendly
- Imagens otimizadas
- Carregamento rápido

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t odontopro .
docker run -p 3000:3000 odontopro
```

## 📄 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run lint:fix     # Corrigir problemas automaticamente
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Sistema de autenticação completo
- [ ] CRUD de pacientes
- [ ] Agendamento de consultas
- [ ] Dashboard com métricas
- [ ] Notificações em tempo real
- [ ] Integração com WhatsApp
- [ ] Relatórios financeiros
- [ ] App mobile (React Native)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Valdeilson Lima**
- GitHub: [@Valdeilson-lima](https://github.com/Valdeilson-lima)
- LinkedIn: [Valdeilson Lima](https://linkedin.com/in/valdeilson-lima)

---

<div align="center">
  <p>Feito com ❤️ e ☕ por <strong>Valdeilson Lima</strong></p>
  <p>🦷 <strong>OdontoPRO</strong> - Seu sorriso, nossa prioridade!</p>
</div>
