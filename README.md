# 📱 GymPass Style – Aplicativo de Check-ins em Academias

Aplicativo para controle de check-ins em academias com funcionalidades de autenticação, geolocalização e gerenciamento de usuários e academias. Inspirado na experiência de uso do GymPass.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando:

- **Node.js** – Plataforma de desenvolvimento backend em JavaScript/TypeScript
- **Prisma ORM** – Mapeamento objeto-relacional para comunicação com o banco de dados
- **PostgreSQL** – Banco de dados relacional
- **JWT (JSON Web Token)** – Autenticação segura baseada em tokens
- **Princípios SOLID** – Código estruturado com foco em manutenibilidade, escalabilidade e responsabilidade única

---

## ✅ Requisitos Funcionais (RF)

O sistema **deve permitir**:

- [ ] Cadastro de usuários  
- [ ] Autenticação de usuários (login)  
- [ ] Consulta ao perfil do usuário autenticado  
- [ ] Visualização do número total de check-ins do usuário autenticado  
- [ ] Acesso ao histórico de check-ins  
- [ ] Busca de academias próximas (geolocalização)  
- [ ] Busca de academias pelo nome  
- [ ] Realização de check-in em uma academia  
- [ ] Validação de check-ins  
- [ ] Cadastro de novas academias  

---

## 🧩 Regras de Negócio (RN)

O sistema **deve obedecer às seguintes regras**:

- [ ] Não permitir cadastro com e-mail já existente  
- [ ] Impedir mais de um check-in por dia por usuário  
- [ ] Check-in permitido apenas se o usuário estiver a no máximo 100 metros da academia  
- [ ] Validação do check-in deve ocorrer em até 20 minutos após sua criação  
- [ ] Apenas administradores podem validar check-ins  
- [ ] Apenas administradores podem cadastrar academias  

---

## 🖥️ Requisitos Não Funcionais (RNF)

O sistema **deve atender aos seguintes critérios técnicos**:

- [ ] Senhas dos usuários devem ser armazenadas de forma criptografada  
- [ ] Os dados da aplicação devem ser persistidos em um banco de dados **PostgreSQL**  
- [ ] Listagens de dados devem ser paginadas (20 itens por página)  
- [ ] Autenticação deve ser feita via **JWT (JSON Web Token)**  

---
