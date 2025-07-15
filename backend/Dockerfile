# Usa Node.js LTS
FROM node:18

# Imposta la working directory nel container
WORKDIR /app

# Copia solo i file del backend (Render parte da /backend già)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file del backend nel container
COPY . .

# Espone la porta (Render userà process.env.PORT)
EXPOSE 3001

# Comando di avvio
CMD ["node", "server.js"]
