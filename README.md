# App

Gympass style app.

## RFs (Requisitos funcioanis)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de checkins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de checkins;
- [x] Deve ser possível buscar academias próximas (ate 10 km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar checkin na academia;
- [x] Deve ser possível validar o checkin de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## Rns (Regras de Negocios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O checkin só pode ser validado até 20 minutos após criado;
- [ ] O Checkin só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requsiitos não - funcionais)

- [x] Senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identifcado por um JWT (JSON Web Token);