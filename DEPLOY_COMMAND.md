# Актуальная команда деплоя на VPS

Проект на сервере:

```text
/home/deploy/detki-billets
```

Сервис:

```text
detki-billets.service
```

## Обычный деплой

```bash
cd /home/deploy/detki-billets
git switch main
git restore src/routeTree.gen.ts
git pull --ff-only origin main
npm install
sudo rm -rf /home/deploy/detki-billets/dist
sudo chown -R deploy:deploy /home/deploy/detki-billets
sudo -u deploy bash -lc 'cd /home/deploy/detki-billets && npm run build'
sudo systemctl restart detki-billets.service
sudo systemctl status detki-billets.service --no-pager
```

## Один блок

```bash
cd /home/deploy/detki-billets && \
git switch main && \
git restore src/routeTree.gen.ts && \
git pull --ff-only origin main && \
npm install && \
sudo rm -rf /home/deploy/detki-billets/dist && \
sudo chown -R deploy:deploy /home/deploy/detki-billets && \
sudo -u deploy bash -lc 'cd /home/deploy/detki-billets && npm run build' && \
sudo systemctl restart detki-billets.service && \
sudo systemctl status detki-billets.service --no-pager
```

## Почему есть дополнительные команды

- `git restore src/routeTree.gen.ts` — сбрасывает локально изменённый сгенерированный файл, который раньше блокировал `git pull`.
- `sudo rm -rf .../dist` — удаляет старую сборку, если у неё неверный владелец.
- `sudo chown -R deploy:deploy ...` — возвращает правильного владельца проекту.
- сборка выполняется от пользователя `deploy`.
