# Desafio Fullstack – Mini Kanban de Tarefas (React + Go)

Aplicação desenvolvida para o processo seletivo (Desafio Técnico) da **Veritas Consultoria Empresarial**. Trata-se de um Mini Kanban de tarefas funcional e responsivo, dividido entre um frontend moderno em React e um backend robusto em Go (Golang).

---

##  Tecnologias Utilizadas

### **Frontend**
* **React** (com TypeScript)
* **React Bootstrap** (para estilização e componentes de layout/modais)
* **Google Fonts (Poppins)** (tipografia padrão da interface)
* **HTML5 Drag and Drop API** (nativo para movimentação dos cards)

### **Backend**
* **Go (Golang)** (linguagem principal da API RESTful)
* **Gorilla Mux / Net/http** (manipulação de rotas e CORS)
* **Encoding/JSON** (persistência de dados em arquivo local)
* **Postman** (para testes manuais e validação dos endpoints da API)

---

## Estrutura do Repositório

```text
/
├── backend/
│   ├── handlers.go       # Controladores das rotas e lógica de negócio CRUD
│   ├── main.go           # Inicialização do servidor e configuração de CORS
│   ├── models.go         # Definição da Struct Task e funções de persistência JSON
│   └── tasks.json        # Banco de dados local em arquivo (ignorado pelo git)
├── frontend/
│   ├── public/           # Arquivos estáticos e index.html com a fonte Poppins
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── modals/       # Modais de Criação, Edição e Visualização
│   │   ├── App.tsx       # Componente principal e chamadas à API
│   │   └── ... 
├── docs/
│   └── user-flow.png     # Diagrama obrigatório de fluxo de usuário
└── README.md             # Documentação do projeto

```

---

## Como Executar o Projeto

Certifique-se de ter o **Go** e o **Node.js** instalados em sua máquina.

### 1. Executando o Backend (Go)

Abra um terminal na pasta `backend/` e execute:

```bash
cd backend

go run .

```

*O servidor será iniciado na porta `http://localhost:8080`.*

### 2. Executando o Frontend (React)

Abra um segundo terminal na pasta `frontend/` e execute os comandos:
```bash
cd frontend

# Instalar as dependências
npm install

# (Opcional caso precise garantir o pacote) 
npm install react-bootstrap bootstrap

# Iniciar a aplicação em modo de desenvolvimento
npm run dev

```

*A aplicação abrirá automaticamente no navegador em `http://localhost:5173`.*

---

## Decisões Técnicas

1. **Persistência em Arquivo JSON:** Optou-se por implementar a gravação automática em `tasks.json` utilizando as bibliotecas nativas de Go (`os` e `encoding/json`). Isso garante que os dados não sejam perdidos ao reiniciar o servidor, sem a complexidade de configurar um banco de dados relacional pesado para o escopo do MVP.
2. **Interface Limpa:** Os cartões do Kanban foram projetados para exibir apenas o título de forma limpa e alinhada à esquerda. Detalhes como descrição, status e ações avançadas (edição e exclusão via menu de três pontos `⋮`) foram isolados em um modal de visualização dedicado.
3. **Drag and Drop Nativo:** Utilizou-se a API nativa de HTML5 Drag and Drop do navegador, evitando dependências externas pesadas no React e garantindo fluidez ao mover tarefas entre as colunas (*A Fazer*, *Em Progresso* e *Concluídas*).

---

## Limitações Conhecidas & Melhorias Futuras

* **Limitação:** O arquivo `tasks.json` armazena os dados de forma local no servidor Go, o que significa que o sistema opera bem para instâncias de uso individual/local.
* **Melhoria Futuras:** 
- Adicionar "mini tarefas" dentro dos cards para deixar melhor distribuido a atividade.
- Adicionar a opção de ter mais usuários pra escolher tarefa.
- Adicionar cycle time na tarefa.
- Adicionar a opção de data da criação da tarefa.
- Quantidade de horas gasta na tarefa.
- Labels de prioridade da tarefa.

---

## Documentação

O diagrama de fluxo de usuário (`user-flow.png`) detalhando as ações de criação, movimentação, edição e exclusão encontra-se na pasta `/docs` do repositório.