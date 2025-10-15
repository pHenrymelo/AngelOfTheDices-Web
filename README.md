# Angel of the Dices 🎲

![Logo do Projeto](https://raw.githubusercontent.com/pHenrymelo/AngelOfTheDices-Web/main/public/logo-violet.png)

**Angel of the Dices** é uma plataforma web moderna e interativa para gerenciamento de fichas de RPG de mesa, criada para ser uma ferramenta completa e agnóstica a sistemas. Esta primeira versão foi desenvolvida com foco no sistema **Ordem Paranormal RPG**, servindo como um protótipo robusto e funcional da visão final do projeto.

O projeto nasceu como uma aplicação de estudo full-stack, utilizando **React** no front-end e **Java com Spring Framework** no back-end, demonstrando a aplicação de tecnologias modernas para criar uma experiência de usuário rica e responsiva.

A aplicação está atualmente deployada na **Vercel** e pode ser acessada publicamente.

---

## ✨ Funcionalidades Principais

- **Autenticação de Usuários**: Sistema completo de login e registro.
- **Gerenciamento de Fichas**: Crie, visualize, liste e delete suas fichas de personagem.
- **Ficha de Personagem Detalhada**:
  - **Detalhes Pessoais**: Informações como nome, idade, classe, trilha, origem e afinidade.
  - **Status e Atributos**: Gerenciamento completo de PV, Sanidade, PE, atributos e NEX.
  - **Combate**: Adicione e gerencie ataques, com cálculos de dano e acerto.
  - **Inventário**: Controle de itens, carga e limites por categoria.
  - **Perícias**: Lista completa de perícias com cálculos de bônus e rolagens.
  - **Habilidades e Rituais**: Adicione e gerencie habilidades de classe, poderes e rituais paranormais.
  - **Anotações**: Um espaço para anotações importantes sobre o personagem ou a campanha.
- **Rolador de Dados**: Uma página dedicada para rolar diferentes tipos de dados (D4, D6, D8, D10, D12, D20, etc.).
- **Tematização Dinâmica**: O tema da interface pode ser sincronizado com a afinidade do personagem (Sangue, Morte, Energia, Conhecimento, Medo), proporcionando uma imersão visual única.

---

## 🛠️ Arquitetura e Tecnologias

O front-end do Angel of the Dices foi construído com uma arquitetura moderna e componentizada, visando escalabilidade e manutenibilidade.

### Tech Stack

- **Framework**: [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/), uma coleção de componentes reutilizáveis construídos com [Radix UI](https://www.radix-ui.com/).
- **Gerenciamento de Estado do Servidor**: [TanStack Query (React Query)](https://tanstack.com/query/latest) para caching, sincronização e atualização de dados.
- **Gerenciamento de Estado Global**: [React Context](https://react.dev/learn/passing-data-deeply-with-context) para estados globais como autenticação e tema.
- **Roteamento**: [React Router](https://reactrouter.com/)
- **Requisições HTTP**: [Axios](https://axios-http.com/), com interceptors para refresh de token automático.
- **Validação de Formulários**: [Zod](https://zod.dev/) e [React Hook Form](https://react-hook-form.com/).
- **Notificações**: [Sonner](https://sonner.emilkowal.ski/) para toasts.
- **Linting e Formatação**: [Biome](https://biomejs.dev/).

### Estrutura de Pastas (`/src`)

A organização do projeto segue as melhores práticas de desenvolvimento React, separando as responsabilidades de forma clara:

-   `api/`: Contém todas as funções que interagem com a API back-end. Cada arquivo representa uma chamada de endpoint específica e é organizado por recurso (ex: `auth`, `sheet`, `user`).
-   `assets/`: Imagens, SVGs e outros recursos estáticos.
-   `components/`:
    -   `ui/`: Componentes base da biblioteca Shadcn/ui.
    -   `auth/`, `theme/`, `toasts/`: Componentes customizados e de maior complexidade, como rotas protegidas, seletores de tema e toasts personalizados.
-   `contexts/`: Provedores de contexto React para gerenciamento de estado global (ex: `AuthContext`, `SettingsContext`).
-   `lib/`: Configurações de bibliotecas e funções utilitárias, como a instância do `axios` e `cn` para classes CSS.
-   `pages/`: Componentes que representam as páginas da aplicação, organizados em subpastas que refletem as rotas.
    -   `layouts/`: Estruturas de layout principais da aplicação (ex: `AppLayout` para a área logada e `AuthLayout` para autenticação).
-   `routes.tsx`: Definição central de todas as rotas da aplicação usando `react-router-dom`.
-   `types/`: Definições de tipos TypeScript, organizadas por domínio para garantir a tipagem segura em todo o projeto.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [pnpm](https://pnpm.io/installation) (ou outro gerenciador de pacotes de sua preferência)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Kaii-S/AngelOfTheDices-Web.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd AngelOfTheDices-Web
    ```
3.  Instale as dependências:
    ```bash
    pnpm install
    ```

### Configuração

1.  Crie um arquivo `.env` na raiz do projeto, copiando o exemplo `.env.example` (se houver) ou criando um novo.
2.  Adicione a variável de ambiente para a URL da API:
    ```
    VITE_API_BASE_URL=http://localhost:8080
    ```
    *Substitua pela URL da sua API back-end, se for diferente.*

### Executando

Para iniciar o servidor de desenvolvimento, execute:

```bash
pnpm dev
```

Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no terminal) em seu navegador para ver a aplicação.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
