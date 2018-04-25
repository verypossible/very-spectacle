declare var NODE_ENV: string

declare module '*.yml' {
  const data: any
  export default data
}

declare module 'presentations' {
  const data: object
  export default data
}
