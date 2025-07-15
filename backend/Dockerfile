# Usa come base un'immagine ufficiale di Node.js
FROM node:20

# Imposta la cartella di lavoro dentro il container
WORKDIR /app

# Copia i file necessari per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze (npm install)
RUN npm install

# Copia tutto il contenuto (della tua cartella backend) nel container
COPY . .

# Espone la porta su cui gira il server (es. 3001)
EXPOSE 3001

# Comando per avviare il server
CMD ["npm", "start"]
