<img width="250" height="250" alt="inclmais-removebg-preview" src="https://github.com/edu426/IncluiMais/blob/main/public/images/inclmais-removebg-preview.png" />

# Inclui + - Plataforma de Gestão Inclusiva

Inclui + é uma plataforma web moderna e segura desenvolvida para auxiliar professores (nomeadamente de Educação Especial) na gestão de processos dos seus alunos. Permite centralizar de forma rápida e elegante informações essenciais, como as Medidas de Suporte à Aprendizagem e à Inclusão (MSAI), Terapias, Assiduidades, Atividades e contactos dos Encarregados de Educação.

## ✨ Principais Funcionalidades

- **Gestão Integral de Alunos**: Registo detalhado do perfil do aluno, diagnóstico clínico, estratégias de intervenção, diretor de turma e encarregados de educação associados.
- **Medidas de Suporte (MSAI)**: Interface visual para gestão das 15 medidas (Universais, Seletivas e Adicionais) aplicadas a cada aluno, tornando a configuração intuitiva.
- **Acompanhamento de Terapias**: Registo das sessões em que o aluno está envolvido (Terapia da Fala, Terapia Ocupacional, Fisioterapia, Psicologia, etc.) com área para notas adicionais.
- **Assiduidade & Atividades**: Controlo rigoroso de aulas de apoio, gestão de faltas (com ou sem justificação) e planeamento/sumário das atividades diárias ou semanais.
- **Segurança & Privacidade**: 
  - Autenticação e gestão de utilizadores através da plataforma **Clerk**.
  - A base de dados (`schema.prisma`) foi desenhada com marcações de encriptação (`/// @encrypted`) para salvaguardar dados sensíveis como moradas, notas clínicas e contactos.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite, React Router, CSS Vanilla (com design moderno focando interfaces em *Glassmorphism* e UX *Premium*).
- **Backend**: Node.js, Express.
- **Base de Dados**: PostgreSQL (hospedado em Neon Tech), manipulado com **Prisma ORM**.

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Instalar o [Node.js](https://nodejs.org/en/) (versão 18+ recomendada).
- Obter o ficheiro `.env` com as chaves privadas (contactar o administrador do repositório, pois este ficheiro não é guardado no GitHub por segurança).

### 1. Iniciar a Aplicação Frontend (Vite)

Na diretoria principal do projeto (onde está localizado o `package.json` principal), executa:

```bash
# Instalar as dependências (usa --force se houver conflitos de dependências antigas)
npm install --force

# Iniciar o servidor de desenvolvimento
npm run dev
```

### 2. Iniciar a API Backend (Express + Prisma)

Abre um segundo terminal e navega para a pasta `backend`:

```bash
cd backend

# Instalar as dependências do servidor
npm install --force

# Gerar o cliente Prisma com base no schema da base de dados
npx prisma generate

# Sincronizar o schema com a base de dados (se necessário)
npx prisma db push

# Arrancar o servidor backend (porta 3000 por defeito)
npm run dev
```

## 🔒 Variáveis de Ambiente (.env)

A aplicação requer variáveis de ambiente específicas para arrancar corretamente. As mais comuns incluem:
- `VITE_CLERK_PUBLISHABLE_KEY` (Para a app React comunicar com o Clerk)
- `DATABASE_URL` (String de ligação à base de dados PostgreSQL)

