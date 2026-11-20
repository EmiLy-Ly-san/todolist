# construire l'application avec Node.js
FROM node:20-alpine AS build

# définir le dossier de travail dans l'image
WORKDIR /app

# copier les fichiers qui décrivent les dépendances
COPY package*.json ./

# installer les dépendances
RUN npm install

# copier le reste du projet
COPY . .

# générer la version de production dans dist
RUN npm run build

# utiliser Nginx pour servir l'application
FROM nginx:alpine

# récupérer uniquement le build de la première étape
COPY --from=build /app/dist /usr/share/nginx/html

# indiquer le port utilisé par Nginx
EXPOSE 80