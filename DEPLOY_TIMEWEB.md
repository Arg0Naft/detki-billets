# Deploy Timeweb

Документ описывает общий сценарий развёртывания фронтенда и self-hosted Directus на VPS в Timeweb Cloud.

## 1. VPS

- Создать VPS в Timeweb Cloud.
- Выбрать Linux-дистрибутив, например Ubuntu LTS.
- Открыть доступ по SSH.
- Настроить базовую безопасность:
  - отдельный пользователь без root для повседневной работы
  - SSH-ключи
  - firewall для `22`, `80`, `443`

## 2. Docker

- Установить Docker Engine и Docker Compose Plugin.
- Проверить запуск:
  - `docker --version`
  - `docker compose version`

## 3. Directus

- Скопировать на сервер:
  - `docker-compose.directus.yml`
  - `.env.directus` на основе `.env.directus.example`
- Заполнить реальные значения:
  - логин/пароль администратора
  - `DIRECTUS_KEY`
  - `DIRECTUS_SECRET`
  - публичный URL
  - CORS origin фронтенда
- Запустить:
  - `docker compose -f docker-compose.directus.yml --env-file .env.directus up -d`

## 4. PostgreSQL

- В базовом варианте использовать PostgreSQL из `docker-compose.directus.yml`.
- Для продакшена:
  - настроить резервные копии тома/базы
  - следить за диском и обновлениями
  - ограничить внешний доступ к порту PostgreSQL

## 5. Nginx

- Установить Nginx на VPS.
- Запустить Node-приложение на `127.0.0.1:3000`.
- Для публичного сайта использовать `deploy/nginx/site.conf.example` как шаблон reverse proxy к Node-приложению.
- Для Directus admin/API использовать `deploy/nginx/admin.conf.example` как шаблон.
- Подставить реальные домены:
  - например `example.com` для фронтенда
  - `admin.example.com` для Directus
- Проверить конфигурацию:
  - `nginx -t`
- Перезагрузить Nginx.

## 6. SSL

- Выпустить сертификаты, например через Let's Encrypt / Certbot.
- Подключить HTTPS и редирект с HTTP на HTTPS.
- Проверить, что:
  - фронтенд доступен по HTTPS
  - Directus admin и API доступны по HTTPS
  - `DIRECTUS_PUBLIC_URL` совпадает с реальным HTTPS-адресом

## 7. Сборка и запуск приложения

- На сервере выполнить `npm install`.
- Указать `VITE_DIRECTUS_URL` перед production-сборкой.
- Выполнить `npm run build`.
- Убедиться, что создан runnable entry `dist/server/index.mjs`.
- Запустить приложение командой `npm run start`. По умолчанию Nitro слушает порт `3000`; другой порт можно задать через переменную `PORT`.
- Для постоянной работы запускать `npm run start` через systemd или PM2 с автоматическим перезапуском после сбоя и старта VPS:
  - systemd: создать unit с `WorkingDirectory=/var/www/detki-billets`, `Environment=PORT=3000` и `ExecStart=/usr/bin/npm run start`
  - PM2: выполнить `PORT=3000 pm2 start npm --name detki-billets -- run start`, затем `pm2 save` и `pm2 startup`
- Не публиковать `dist/client` как отдельный статический сайт: HTML формирует SSR-сервер, а Nginx проксирует запросы к Node-приложению.

## 8. Проверка после деплоя

- Открыть сайт и проверить загрузку публичных данных из Directus.
- Проверить:
  - главную страницу
  - билеты
  - спикеров
  - программу
  - FAQ
  - юридические ссылки
- Проверить вход в Directus admin.
- Проверить CORS и отсутствие mixed content ошибок.

## 9. Резервные копии и обновления

- Делать регулярный backup PostgreSQL.
- Сохранять `.env.directus` отдельно от репозитория.
- Обновлять Directus и PostgreSQL по плану, сначала на тестовом стенде.

## Важно

Это высокоуровневый документ. Перед продакшен-запуском стоит отдельно проверить:

- политику безопасности сервера
- резервное копирование
- юридические тексты
- настройки платёжного провайдера
