# Developing
## With compose
- `docker-compose -p fin2you up` in one terminal, to start application and postgres
- `docker exec -it fin2you_app_1 /bin/bash` in another terminal. Once you get into the app's container, do `npm run dev`.
## Without compose
- For a faster development experience, use an in-memory db or sqlite. 
    - Just use the class InMemoryDatabase instead of TypeORMDatabase on index.js  when instantiating the `database` variable. 
    - Or set the database type as sqlite in ormconfig.ts.    
    
In this case, there is no need to use Docker at all. Just do `npm run dev`.
### Deploying
- `docker build -t iagosrm/fin2you .` to build image
- `docker run --name fin2you -p 3006:3006 iagosrm/fin2you` to run this service.
- `docker push iagosrm/fin2you` to update image in DockerHub
- `docker tag iagosrm/fin2you registry.heroku.com/fin2you/web`
- `docker push registry.heroku.com/fin2you/web`
- `heroku container:release web -a fin2you`