FROM cypress/base:latest

WORKDIR /app

COPY package*.json ./

ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

RUN npm install
RUN npx cypress install

COPY . .

VOLUME ["/app/cypress/fixtures"]

RUN npx cypress verify

CMD ["npx", "cypress", "run"]
