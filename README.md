# GoogleMaps-API
![GitHub](https://img.shields.io/github/license/Johny-Fullstack/GoogleMaps-API)

# Sobre o projeto

Esse projeto  tem como  objetivo  renderizar uma página utilizando o Maps Javascript API para plotar os Markers(Points) e fazer agrupamento dos pontos no Mapa.

Foram utilizados 50 mil pontos com Latitude e  Longitude em formato Json.

http://images.contelege.com.br/poi.json

# Rodando o projeto

Copiar o arquivo .env.dev criando novo arquivo .env
- cp .env.dev .env

Adicionar as credencias do Google Maps, variável de ambiente 
- REACT_APP_GOOGLE_KEY=SUA_CHAVE

Rodar os comando

- npm install
- npm run start

#  Tecnologias utilizadas

- HTML/CSS/JavaScript
-  React
-  Goole Maps
-  NodeJs

# Bibliotecas

## Google Map React

google-map-react é um componente escrito sobre um pequeno conjunto da API do Google Maps . 
Ele permite que você renderize qualquer componente React no mapa do Google.


## useSupercluster

O desempenho pode começar a diminuir muito rapidamente quando você tenta mostrar grandes quantidades de dados em um mapa. Mesmo com centenas de marcadores usando o Google Maps via google-map-react , você pode sentir que começa a ficar lento. Ao agrupar os pontos, você pode melhorar muito o desempenho, ao mesmo tempo que apresenta os dados de uma maneira mais acessível.


## SWR 

SWR é uma biblioteca React Hooks para busca de dados remotos.
Primeiro retorna os dados do cache (obsoleto), em seguida, envia a solicitação de busca (revalidar) e, finalmente, vem com os dados atualizados novamente.


## libs

- https://www.npmjs.com/package//google-map-react
- https://www.npmjs.com/package/use-supercluster
- https://www.npmjs.com/package/swr

# Autor

Johny de Sousa Santos

Linkedin
https://www.linkedin.com/in/johny-de-sousa-santos-712aa116a

