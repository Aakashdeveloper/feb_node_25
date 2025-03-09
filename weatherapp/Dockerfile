FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9811
CMD ["npm","start"]