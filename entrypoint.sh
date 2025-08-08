#!/bin/sh
set -ex

echo "Выполняем миграции..."
bun drizzle-kit migrate

echo "RUN_SEED is: '$RUN_SEED'"

if [ "$RUN_SEED" = "true" ]; then
    echo "Проверяем, нужно ли сидировать..."
    HAS_HOLIDAYS=$(bun src/seeder/holidaysEmptyCheck.ts | tr -d '\r\n' || echo "0")
    if [ "$HAS_HOLIDAYS" = "1" ]; then
        echo "HAS_HOLIDAYS is: '$HAS_HOLIDAYS'"
        echo "Сидирование holidays..."
        bun run src/seeder/seedHolidays.ts \
            --from=${SEED_FROM:-2025} \
            --to=${SEED_TO:-2030} \
            --country=${SEED_COUNTRY:-RU}
    else
        echo "Данные уже есть, сидирование пропущено."
    fi
fi

echo "Запускаем сервер..."
bun run src/index.ts
