# Directus Schema

Документ фиксирует data contract между Directus и frontend проекта `detki-billets`.

## Общие правила

- Во всех коллекциях primary key называется `id`.
- Тип primary key: UUID string, генерируемый Directus.
- Поле `$id` не создаётся: это удалённое наследие Appwrite.
- `site_settings` и `event_config` — обычные коллекции, в каждой должна существовать ровно одна запись.
- UI-режим Singleton для `site_settings` и `event_config` должен быть выключен. Frontend читает эти коллекции через обычный endpoint с `limit=1`.
- `sort_order` имеет тип integer и используется для ручной сортировки по возрастанию.
- `is_active` имеет тип boolean, значение по умолчанию `true`.
- Публичный frontend запрашивает только записи с `is_active = true`.
- Публичной роли разрешён только read-доступ; create, update и delete запрещены.
- Русские display labels разрешены, технические имена коллекций и полей менять нельзя без миграции frontend.

## `site_settings`

Обычная коллекция с одной записью глобальных настроек сайта. Режим Singleton в интерфейсе Directus выключен.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key, создаётся Directus |
| `site_name` | string | да | Название сайта |
| `footer_description` | text | да | Описание в футере |
| `contact_email` | string | да | Email для связи |
| `contact_phone` | string | да | Телефон для связи |
| `instagram_url` | string | нет | Публичный URL |
| `telegram_url` | string | нет | Публичный URL |
| `vk_url` | string | нет | Публичный URL |
| `youtube_url` | string | нет | Публичный URL |
| `max_url` | string | нет | Публичный URL |

## `event_config`

Обычная коллекция с одной записью основных параметров мероприятия. Режим Singleton в интерфейсе Directus выключен.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key, создаётся Directus |
| `title` | string | да | Заголовок мероприятия |
| `subtitle` | text | да | Подзаголовок |
| `date` | string | да | Отображаемая дата |
| `time` | string | да | Отображаемое время |
| `location` | string | да | Город или краткое название площадки |
| `location_address` | string | да | Полный адрес |
| `description_1` | text | да | Временный fallback до заполнения `event_descriptions` |
| `description_2` | text | да | Временный fallback до заполнения `event_descriptions` |
| `hero_badge` | string | нет | Текст плашки над главным заголовком; при пустом значении используется frontend fallback |
| `sales_enabled` | boolean | да | По умолчанию `false` до подключения оплаты |

## `event_descriptions`

Управляемые раскрывающиеся пункты раздела «О мероприятии». Каждая запись — отдельный пункт. Записи можно добавлять, скрывать и переставлять без изменения схемы.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `title` | string | нет | Заголовок раскрывающегося пункта; при пустом значении frontend формирует запасной заголовок |
| `text` | text | да | Раскрывающееся содержимое пункта |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

Если коллекция недоступна, frontend временно использует `description_1` и `description_2` из `event_config`. Если коллекция доступна, но в ней нет активных записей, пункты описания не отображаются.

## `event_highlights`

Карточки преимуществ под разделом «О мероприятии». Каждая запись — отдельная карточка.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `title` | string | да | Заголовок карточки |
| `text` | text | да | Текст карточки |
| `icon` | string | да | Поддержанные значения: `book`, `heart`, `sparkles`; неизвестное значение отображается как `sparkles` |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

## `tickets`

Тарифы билетов.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `name` | string | да | Название тарифа |
| `price` | integer | да | Цена в рублях без копеек |
| `old_price` | integer | да | `0`, если старой цены нет |
| `description` | text | да | Краткое описание |
| `features` | JSON | да | Массив строк, например `["Пункт 1", "Пункт 2"]` |
| `payment_url` | string | нет | Внешняя HTTPS-ссылка ЮKassa/оплаты |
| `is_popular` | boolean | да | По умолчанию `false` |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

Frontend временно умеет прочитать старое строковое значение `features`, но штатный формат новой схемы — JSON array of strings.

## `speakers`

Спикеры конференции.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `name` | string | да | Имя |
| `title` | string | да | Должность или роль |
| `bio` | text | да | Биография |
| `photo_url` | string | нет | Прямой публичный HTTPS URL; пустое значение включает avatar-заглушку |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

На текущем этапе используется `photo_url`, а не relation на Directus Files. Это сохраняет существующий frontend-контракт. Переход на Directus Files должен выполняться отдельной миграцией с asset URL mapping и правами на `directus_files`.

## `program`

Пункты программы мероприятия.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `time_slot` | string | да | Отображаемое время блока |
| `title` | string | да | Название блока |
| `speaker` | string | нет | Имя спикера или команды |
| `description` | text | нет | Описание блока |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

## `faq`

Часто задаваемые вопросы.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `question` | string | да | Вопрос |
| `answer` | text | да | Ответ |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

## `legal_pages`

Юридические ссылки для футера.

| Поле | Тип | Обязательное | Примечание |
| --- | --- | --- | --- |
| `id` | UUID | да | Primary key |
| `title` | string | да | Название ссылки |
| `url` | string | да | Публичный HTTPS URL документа |
| `is_active` | boolean | да | По умолчанию `true` |
| `sort_order` | integer | да | По умолчанию `0` |

## Ожидаемые публичные запросы

Списковые коллекции запрашиваются с сортировкой и фильтром активности:

```text
sort=sort_order
limit=-1
filter[is_active][_eq]=true
```

К ним относятся `event_descriptions`, `event_highlights`, `tickets`, `speakers`, `program`, `faq` и `legal_pages`.

`site_settings` и `event_config` запрашиваются через обычный endpoint коллекции с `limit=1`. Наличие более одной записи считается ошибкой управления контентом и должно предотвращаться процессом настройки Directus, а не режимом Singleton.
