# CurrencyHub

CurrencyHub e um dashboard frontend para acompanhar moedas e visualizar um resumo da cotação mais recente em relação ao real brasileiro (BRL). O projeto foi estruturado com foco em organização por feature, facilitando evolução e manutenção.

## Tecnologias usadas

- `React 19` para a interface.
- `TypeScript` para tipagem estatica.
- `Vite` para ambiente de desenvolvimento e build.
- `React Router` para roteamento da aplicação.
- `TanStack React Query` para gerenciamento de busca e cache de dados.
- `Zustand` para estado global simples.
- `React Hook Form` para formulário de busca.
- `Tailwind CSS` para estilização.
- `shadcn/ui` e `Radix UI` para a base de componentes.
- `Recharts` para visualização do gráfico de tendência.
- `ESLint` para padrão e qualidade de código.

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

### Instalacao

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
- Rotas carregadas com `lazy` e `Suspense`.
- `React Query` configurado com `staleTime`, `retry` e `refetchOnWindowFocus` desativado.
- Store global enxuta para manter a moeda selecionada.

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera a build de produção.
- `npm run preview`: sobe a build localmente para validação.
- `npm run lint`: executa a análise estática com ESLint.
