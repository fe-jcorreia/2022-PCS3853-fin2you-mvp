# Developing
- `docker-compose -p fin2you up` in one terminal, to start application and postgres
- `docker exec -it fin2you_app_1 /bin/bash` in another terminal. Once you get into the app's container, do `npm run dev`.
- For a faster development experience, use an in-memory db. Just use the class InMemoryDatabase instead of TypeORMDatabase on index.js  when instantiating the `database` variable. In this case, there is no need to use Docker at all. Just do `npm run dev`.