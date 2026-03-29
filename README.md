# CurrencyHub

CurrencyHub e um dashboard frontend para acompanhar moedas e visualizar cotacoes em relacao ao real brasileiro (BRL). O projeto foi estruturado com foco em arquitetura feature-based, performance e clareza de manutencao.

## Sobre o projeto

Este projeto foi desenvolvido como estudo pratico de arquitetura frontend, componentizacao e decisoes voltadas a performance. A interface de consulta de moedas serve como base para exercitar conceitos modernos do ecossistema React, como separacao por dominio, carregamento sob demanda de rotas, cache de dados, estado global enxuto e testes funcionais.

Hoje a aplicacao consome dados do Frankfurter para listagem e detalhe de moedas, usa favoritos persistidos com Zustand e ja possui uma base de testes voltada a comportamento visivel da interface.

## Tecnologias usadas

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `TanStack React Query`
- `Zustand`
- `React Hook Form`
- `Tailwind CSS`
- `shadcn/ui` e `Radix UI`
- `Recharts`
- `Vitest`
- `React Testing Library`
- `MSW`
- `ESLint`

## Estrutura do projeto

```text
src/
  app/
    providers/     # Providers globais da aplicacao
    router/        # Configuracao de rotas
  components/
    shared/        # Layout e componentes compartilhados
    ui/            # Componentes de interface reutilizaveis
  features/
    rates/
      components/  # Componentes da feature de moedas
      hooks/       # Hooks da feature
      services/    # Camada de acesso a dados
      store/       # Estado global com Zustand
      types/       # Tipagens da feature
  lib/
    utils/         # Utilitarios genericos
  pages/           # Paginas ligadas as rotas
  test/            # Infra de testes, mocks e helpers
```

## Como rodar o projeto

### Pre-requisitos

- `Node.js` 20 ou superior recomendado
- `npm`

### Instalacao

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Depois, abra o endereco exibido no terminal, normalmente `http://localhost:5173`.

### Variaveis de ambiente

O projeto usa a URL base da API do Frankfurter via variavel de ambiente:

```bash
VITE_FRANKFURTER_API_BASE_URL=https://api.frankfurter.dev/v1
```

Voce pode copiar o arquivo `.env.example` para `.env.local` se quiser customizar esse valor.

### Build de producao

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

## Testes

A aplicacao possui uma base de testes funcionais com foco em comportamento do usuario, evitando excesso de testes de implementacao.

### Stack de testes

- `Vitest` como test runner
- `React Testing Library` para interacao e renderizacao
- `@testing-library/user-event` para simular acoes reais
- `jsdom` como ambiente de navegador
- `MSW` para mockar as respostas da API do Frankfurter sem rede real

### Como rodar

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

### O que esta sendo testado hoje

- `CurrencySearchForm`
  - render do campo e CTA
  - erro ao enviar codigo invalido
  - navegacao para `/currencies/:code` com codigo valido
- `CurrenciesTable`
  - render da listagem a partir da API mockada
  - favoritar e desfavoritar moeda
  - navegacao para a rota de detalhe
  - fallback em caso de erro de API
- `CurrencyDetailContent`
  - render do snapshot principal
  - toggle de favoritos
  - render do bloco principal mesmo com o grafico lazy
- `AppHeader`
  - ausencia de spotlight sem favoritos
  - render do spotlight com favorita
  - atualizacao do `document.title`
- `NotFound`
  - mensagem e acao esperadas para 404

### Infra de testes

- `src/test/setup.ts`: setup global do Vitest, cleanup e reset da store
- `src/test/server.ts`: servidor MSW para os testes
- `src/test/mocks/handlers.ts`: handlers das rotas mockadas do Frankfurter
- `src/test/render-with-providers.tsx`: helper para renderizar com Query Client e Router

## CI/CD

O projeto possui uma pipeline de CI/CD com GitHub Actions e publicacao no GitHub Pages.

### O que o workflow faz

O arquivo `.github/workflows/ci.yaml` executa tres etapas principais:

- `quality`
  - instala dependencias com `npm ci`
  - roda `npm run lint`
  - roda `npm run test`
  - roda `npm run build`
- `github-pages-build`
  - roda apenas em `main` ou `master`
  - gera o build de producao
  - publica o artifact do `dist/` para o GitHub Pages
- `github-pages-deploy`
  - roda apenas em `main` ou `master`
  - faz o deploy final com `actions/deploy-pages`

### Estrategia por branch

- `pull_request`
  - executa validacao de qualidade
- `develop`
  - executa validacao de qualidade
  - nao faz deploy
- `main` e `master`
  - executam validacao de qualidade
  - executam build para Pages
  - executam deploy no GitHub Pages

### GitHub Pages

Para o deploy funcionar no GitHub:

1. abra `Settings > Pages`
2. em `Build and deployment`, selecione `GitHub Actions`

### Base path para Pages

O `vite.config.ts` ajusta automaticamente o `base` quando o build roda dentro do GitHub Actions.

Isso garante que o app funcione corretamente quando publicado em um caminho como:

```text
https://usuario.github.io/currency-hub/
```

Em ambiente local, o `base` continua `/`, sem impactar o `npm run dev`.

## Pontos tecnicos do projeto

- Alias `@` apontando para `src/` para simplificar imports
- Rotas carregadas com `lazy` e `Suspense`, ajudando no `code splitting`
- `React Query` configurado com `staleTime`, `retry` e `refetchOnWindowFocus: false`
- `Zustand` usado para favoritos persistidos no cliente
- `React Hook Form` usado para controlar o formulario de busca com validacoes simples
- Estrutura orientada a feature para manter componentes, hooks, services e types proximos do dominio

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera a build de producao
- `npm run preview`: sobe a build localmente para validacao
- `npm run lint`: executa a analise estatica com ESLint
- `npm run test`: executa a suite de testes com Vitest
- `npm run test:watch`: executa os testes em modo watch
