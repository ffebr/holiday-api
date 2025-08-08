/** @jsxImportSource hono/jsx */

export const Layout = (props: { title: string; children: any }) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <style>{`
          body { font-family: sans-serif; padding: 2rem; }
          h1, h2 { color: #333; }
          .endpoint { margin-bottom: 2rem; }
          code { background: #eee; padding: 2px 4px; border-radius: 3px; }
        `}</style>
      </head>
      <body>
        <h1>{props.title}</h1>
        <div>{props.children}</div>
      </body>
    </html>
  )
}
