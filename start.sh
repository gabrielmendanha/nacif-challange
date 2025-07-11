cd back

docker build --tag gabriel-mendanha-back .

docker run -d -p 8000:8000 gabriel-mendanha-back

cd ..

cd front

docker build --tag gabriel-mendanha-front .

docker run -d -p 8001:8001 gabriel-mendanha-front