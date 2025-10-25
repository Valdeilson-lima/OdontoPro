# Instruções rápidas para variáveis de ambiente

Este projeto usa arquivos `.env` para configurar segredos e URLs. Para segurança, apenas arquivos de exemplo devem ser versionados.

Como usar:

1. Copie o arquivo de exemplo para o arquivo local que não será versionado:

   cp .env.example .env.local

2. Atualize `.env.local` com os valores reais (não comite esse arquivo).

3. No CI/CD, defina as variáveis de ambiente no painel do provedor (GitHub Actions, Vercel, etc.).

Variáveis esperadas (exemplos, ver também `.env.example`):

- DATABASE_URL
- NEXT_PUBLIC_BASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET / AUTH_SECRET
- AUTH_GITHUB_ID / AUTH_GITHUB_SECRET
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLIC_KEY
- STRIPE_SECRET_WEBHOOK_KEY

Segurança:

- Nunca commit valores reais (chaves, segredos, tokens). Use o arquivo `.env.example` apenas com placeholders.
- Se por algum motivo você precisar versionar um arquivo de configuração com valores não sensíveis, prefira um arquivo específico e documente claramente.

Se quiser, eu posso adicionar exemplos de comandos para GitHub Actions / Vercel para configurar as variáveis de ambiente. 