docker-compose down
docker-compose build
# this will show output in current window
docker-compose up
# this will run in detach mode
docker-compose up -d
# shell into container
docker ps
docker exec -it <container> /bash
docker logs -f <container>
#
#
# For deveploment
mv docker-compose.override.yml.dev docker-compose.override.yml
docker-compose down
docker-compose up

