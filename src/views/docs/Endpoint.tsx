/** @jsxImportSource hono/jsx */

type Param = {
  name: string
  type: string
  required?: boolean
  description: string
}

type EndpointProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  authRequired?: boolean
  queryParams?: Param[]
  params?: Param[] // body params
  requestBody?: object
  responseBody?: object
  responses?: {
    status: number
    description: string
  }[]
}

export const Endpoint = ({
  method,
  path,
  description,
  authRequired = false,
  params,
  queryParams,
  requestBody,
  responseBody,
  responses
}: EndpointProps) => {
  return (
    <div class="endpoint">
      <h2>
        <code>{method}</code> <code>{path}</code>
      </h2>
      {authRequired && (
        <div class="text-sm text-red-600 font-semibold mb-2">Требуется JWT-аутентификация</div>
      )}
      <p>{description}</p>

      {/* Query parameters */}
      {queryParams && queryParams.length > 0 && (
        <>
          <h3>Query-параметры</h3>
          <table border={1} cellpadding="5">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Тип</th>
                <th>Обязательный</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {queryParams.map((p) => (
                <tr>
                  <td><code>{p.name}</code></td>
                  <td>{p.type}</td>
                  <td>{p.required ? 'Да' : 'Нет'}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Body параметры (или JSON тело запроса) */}
      {params && params.length > 0 && (
        <>
          <h3>Параметры тела запроса</h3>
          <table border={1} cellpadding="5">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Тип</th>
                <th>Обязательный</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {params.map((p) => (
                <tr>
                  <td><code>{p.name}</code></td>
                  <td>{p.type}</td>
                  <td>{p.required ? 'Да' : 'Нет'}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {requestBody && (
        <>
          <h3>Пример JSON тела запроса</h3>
          <pre><code>{JSON.stringify(requestBody, null, 2)}</code></pre>
        </>
      )}

      {responseBody && (
        <>
          <h3>Пример JSON ответа</h3>
          <pre><code>{JSON.stringify(responseBody, null, 2)}</code></pre>
        </>
      )}

      {responses && responses.length > 0 && (
        <>
          <h3>Ответы сервера</h3>
          <table border={1} cellpadding="5">
            <thead>
              <tr>
                <th>Код</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((r) => (
                <tr>
                  <td>{r.status}</td>
                  <td>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
