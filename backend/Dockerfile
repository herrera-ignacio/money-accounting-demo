FROM node:15.12.0

WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

# Copy everything else
COPY ./ ./

# Default commands
CMD ["yarn", "dev"]