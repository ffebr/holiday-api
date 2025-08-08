import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { V1Docs } from '../../views/docs/V1Docs'

export const docsV1 = new Hono()

docsV1.use('*', jsxRenderer())

docsV1.get('/docs', (c) => {
  return c.render(<V1Docs />);
})

