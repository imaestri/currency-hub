# CurrencyHub

CurrencyHub e um dashboard frontend para acompanhar moedas e visualizar um resumo da cotação mais recente em relação ao real brasileiro (BRL). O projeto foi estruturado com foco em organização por feature, facilitando evolução e manutenção.

## Sobre o projeto

Este projeto foi desenvolvido como estudo prático de arquitetura frontend, componentização e decisões voltadas a performance. A ideia é usar uma interface simples de consulta de moedas como base para exercitar conceitos modernos do ecossistema React, como separação por domínio, carregamento sob demanda de rotas, gerenciamento de cache e estado global enxuto.

Além da interface, o projeto também serve como laboratório para explorar ferramentas bastante usadas no mercado, como `Zustand`, `React Hook Form`, `Zod` como validação, `React Query` e estratégias de `code splitting`.

## Tecnologias usadas

- `React 19` para a interface.
- `TypeScript` para tipagem estática.
- `Vite` para ambiente de desenvolvimento e build.
- `React Router` para roteamento da aplicação.
- `TanStack React Query` para gerenciamento de busca e cache de dados.
- `Zustand` para estado global simples.
- `React Hook Form` para formulário de busca.
- `Tailwind CSS` para estilização.
- `shadcn/ui` e `Radix UI` para a base de componentes.
- `Recharts` para visualização do gráfico de tendência.
- `ESLint` para padrão e qualidade de código.
- `Prettier` para formatação consistente.
- `Zod` para validação de dados.

## Estrutura do projeto

```text
src/
  app/
    providers/     # Providers globais da aplicação
    router/        # Configuração de rotas
  components/
    shared/        # Layout e componentes compartilhados
    ui/            # Componentes de interface reutilizáveis
  features/
    rates/
      components/  # Componentes da feature de moedas
      hooks/       # Hooks da feature
      services/    # Camada de acesso a dados
      store/       # Estado global com Zustand
      types/       # Tipagens da feature
  pages/           # Paginas ligadas as rotas
```

## Como rodar o projeto

### Pre-requisitos

- `Node.js` 20 ou superior recomendado
- `npm`

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Depois, abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

### Preview local da build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Pontos técnicos do projeto

- Alias `@` apontando para `src/` para simplificar imports.
- Rotas carregadas com `lazy` e `Suspense`, ajudando no `code splitting` da aplicação.
- `React Query` configurado com `staleTime`, `retry` e `refetchOnWindowFocus` desativado.
- `Zustand` usado para uma store global enxuta e direta.
- `React Hook Form` usado para controlar o formulário de busca com validações simples.
- Estrutura orientada a feature para manter componentes, hooks, serviços e tipos próximos do domínio.

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera a build de produção.
- `npm run preview`: sobe a build localmente para validação.
- `npm run lint`: executa a análise estática com ESLint.
