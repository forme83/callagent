# Используем базовый образ с Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Порт для приложения
EXPOSE 3000

# Запуск приложения напрямую через Node.js
CMD ["node", "dist/main.js"]
