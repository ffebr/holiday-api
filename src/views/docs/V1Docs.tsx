/** @jsxImportSource hono/jsx */
import { Layout } from './Layout'
import { Endpoint } from './Endpoint'

export const V1Docs = () => {
  return (
    <Layout title="API Docs — v1">
      <Endpoint
        method="POST"
        path="/api/v1/register"
        description="Регистрация нового пользователя. Требует email и пароль не короче 8 символов."
        params={[
          { name: "email", type: "string", required: true, description: "Email пользователя" },
          { name: "password", type: "string", required: true, description: "Пароль пользователя" }
        ]}
        requestBody={{
          email: 'example@example.com',
          password: 'securePassword123'
        }}
        responses={[
          { status: 200, description: 'Пользователь успешно зарегистрирован' },
          { status: 400, description: 'Некорректные параметры запроса' },
          { status: 409, description: 'Пользователь с таким email уже существует' }
        ]}
        responseBody={{
          id: 1,
          email: 'example@example.com'
        }}
      />
      <Endpoint
        method="POST"
        path="/api/v1/login"
        description="Аутентификация пользователя. Возвращает токен при успешной авторизации."
        params={[
          { name: "email", type: "string", required: true, description: "Email пользователя" },
          { name: "password", type: "string", required: true, description: "Пароль пользователя" }
        ]}
        requestBody={{
          email: "user@example.com",
          password: "securePassword123"
        }}
        responseBody={{
          token: "jwt.token.here",
          id: 42
        }}
        responses={[
          { status: 200, description: "Успешная авторизация" },
          { status: 400, description: "Неверный формат данных запроса" },
          { status: 401, description: "Неправильный email или пароль" }
        ]}
      />
      <Endpoint
        method="GET"
        path="/api/v1/holidays"
        description="Получить список праздников с возможной фильтрацией по query-параметрам"
        queryParams={[
          { name: 'id', type: 'number', required: false, description: 'ID праздника' },
          { name: 'country', type: 'string', required: false, description: 'Страна праздника' },
          { name: 'name', type: 'string', required: false, description: 'Название праздника' },
          { name: 'date', type: 'string', required: false, description: 'Дата праздника (ISO-формат)' }
        ]}
        responseBody={{
          holidays: [
            {
              id: 1,
              country: 'RU',
              date: "2030-03-17 00:00:00",
		          start: "2030-03-17T00:00:00.000Z",
		          end: "2030-03-18T00:00:00.000Z",
              name: 'Новый год',
              type: 'public',
              substitute: false,
              rule: 'по пятницам',
              custom: false,
              isDel: false
            }
          ]
        }}
        responses={[
          { status: 200, description: 'Успешный ответ, возвращается массив праздников' },
          { status: 400, description: 'Некорректные параметры запроса' }
        ]}
      />
      <Endpoint
        method="POST"
        path="/api/v1/holidays/search"
        description="Поиск праздников по заданным критериям. Все поля опциональны, лишние поля запрещены."
        params={[
            { name: "country", type: "string", required: false, description: "Страна праздника" },
            { name: "date", type: "string", required: false, description: "Дата праздника (ISO-формат)" },
            { name: "start", type: "string (date)", required: false, description: "Дата начала праздника" },
            { name: "end", type: "string (date)", required: false, description: "Дата окончания праздника" },
            { name: "name", type: "string", required: false, description: "Название праздника" },
            { name: "type", type: "\"public\" | \"bank\" | \"school\" | \"optional\" | \"observance\"", required: false, description: "Тип праздника" },
            { name: "substitute", type: "boolean", required: false, description: "Замещение праздника" },
            { name: "rule", type: "string", required: false, description: "Правило праздника" },
          ]}
        requestBody={{
          country: 'RU',                     
          date: "2030-03-17 00:00:00",
		      start: "2030-03-17T00:00:00.000Z",
		      end: "2030-03-18T00:00:00.000Z",   
          name: 'Новый год',                
          type: 'public',                   
          substitute: false,                
          rule: 'по пятницам',              
          custom: true,                     
          isDel: false                      
        }}
        responses={[
          { status: 200, description: 'Результаты найдены' },
          { status: 400, description: 'Ошибка валидации запроса' }
        ]}
        responseBody={{
          holidays: [
            {
              id: 1,
              country: 'RU',
              date: "2030-03-17 00:00:00",
		          start: "2030-03-17T00:00:00.000Z",
		          end: "2030-03-18T00:00:00.000Z",
              name: 'Новый год',
              type: 'public',
              substitute: false,
              rule: 'по пятницам',
              custom: false,
              isDel: false
            }
          ]
        }}
    />
    <Endpoint
      method="POST"
      authRequired = {true}
      path="/api/v1/holidays"
      description="Создать новый праздник"
      params={[
        { name: "country", type: "string", required: true, description: "Страна праздника" },
        { name: "date", type: "string", required: true, description: "Дата праздника (ISO-формат)" },
        { name: "start", type: "string (date)", required: true, description: "Дата начала праздника" },
        { name: "end", type: "string (date)", required: true, description: "Дата окончания праздника" },
        { name: "name", type: "string", required: true, description: "Название праздника" },
        { name: "type", type: "\"public\" | \"bank\" | \"school\" | \"optional\" | \"observance\"", required: true, description: "Тип праздника" },
        { name: "substitute", type: "boolean", required: false, description: "Замещение праздника" },
        { name: "rule", type: "string", required: false, description: "Правило праздника" },
      ]}
      requestBody={{
        country: "RU",
        date: "2030-03-17 00:00:00",
		    start: "2030-03-17T00:00:00.000Z",
		    end: "2030-03-18T00:00:00.000Z",
        name: "Новый год",
        type: "public",
        substitute: false,
        rule: "fixed",
      }}
      responseBody={{
	      holiday: {
		      id: 1,
          country: 'RU',
          date: "2030-03-17 00:00:00",
		      start: "2030-03-17T00:00:00.000Z",
		      end: "2030-03-18T00:00:00.000Z",
          name: 'Новый год',
          type: 'public',
          substitute: false,
          rule: 'по пятницам',
          custom: false,
          isDel: false
        }
      }}
      responses={[
        { status: 201, description: "Праздник успешно создан" },
        { status: 400, description: "Ошибка в данных запроса" },
        { status: 401, description: 'Неавторизованный запрос' }
      ]}
      />

    <Endpoint
      method="PATCH"
      authRequired = {true}
      path="/api/v1/holidays/:id"
      description="Обновить существующий праздник. Все поля необязательные — обновятся только переданные."
      queryParams={[{
        name: 'id',
        type: 'number',
        required: true,
        description: 'ID праздника (path-параметр)'
      }]}
      params={[
        { name: "country", type: "string", required: false, description: "Страна праздника" },
        { name: "date", type: "string", required: false, description: "Дата праздника (ISO-формат)" },
        { name: "start", type: "string (date)", required: false, description: "Дата начала праздника" },
        { name: "end", type: "string (date)", required: false, description: "Дата окончания праздника" },
        { name: "name", type: "string", required: false, description: "Название праздника" },
        { name: "type", type: "\"public\" | \"bank\" | \"school\" | \"optional\" | \"observance\"", required: false, description: "Тип праздника" },
        { name: "substitute", type: "boolean", required: false, description: "Замещение праздника" },
        { name: "rule", type: "string", required: false, description: "Правило праздника" },
      ]}
      requestBody={{
        country: 'RU',                    
        date: "2030-03-17 00:00:00",
		    start: "2030-03-17T00:00:00.000Z",
		    end: "2030-03-18T00:00:00.000Z",               
        name: 'Новый праздник',          
        type: 'public',                  
        substitute: false,               
        rule: 'some rule',               
        custom: false,                   
        isDel: false                    
      }}
      responses={[
        { status: 200, description: 'Праздник успешно обновлен' },
        { status: 400, description: 'Неверные параметры запроса' },
        { status: 401, description: 'Неавторизованный запрос' },
        { status: 404, description: 'Праздник с таким ID не найден' }
      ]}
      responseBody={{
        id: 1,
        country: 'RU',
        date: "2030-03-17 00:00:00",
		    start: "2030-03-17T00:00:00.000Z",
		    end: "2030-03-18T00:00:00.000Z",
        name: 'Новый праздник',
        type: 'public',
        substitute: false,
        rule: 'some rule',
        custom: false,
        isDel: false
      }}
    />
    <Endpoint
      method="DELETE"
      authRequired = {true}
      path="/api/v1/holidays/:id"
      description="Удалить праздник по ID. При `force: true` выполняется жёсткое удаление, иначе — мягкое (soft delete)."
      queryParams={[
        { name: "id", type: "number", required: true, description: "ID праздника, передаётся в URL" },
      ]}
      params={[
        { name: "force", type: "boolean", required: true, description: "'Сила' удаления: false - мягкое переключает поле isDel в true, true - жесткое удаление из таблицы в бд" }
      ]}
      requestBody={{
        force: true
      }}
      responseBody={{
        id: 1,
        force: true
      }}
      responses={[
        { status: 200, description: "Праздник успешно удалён (soft или hard)" },
        { status: 401, description: 'Неавторизованный запрос' },
        { status: 404, description: "Праздник не найден или уже удалён" }
      ]}
      />

    </Layout>
  )
}
