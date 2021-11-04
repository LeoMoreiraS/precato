FROM node

WORKDIR /usr/precato

COPY package.json ./

RUN npm install

COPY . ./package

EXPOSE 3333

CMD ["npm", "run", "dev"]