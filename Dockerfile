FROM node:18.14.0

WORKDIR /app  

COPY package*.json ./  


RUN npm install

COPY . .

ENV PORT=3000

# allows incoming connection
EXPOSE 3000    

CMD ["npm", "run", "dev"]
