const context: any = require.context('../presentations', true, /\.yml$/)

const modules = {}
const subscriptions: any[] = []

if (module.hot) {
  module.hot.accept(context.id, function() {
    const reloadedContext = require.context('../presentations', true, /\.yml$/)

    const changedModules = reloadedContext
      .keys()
      .map((key: string) => [key, reloadedContext(key)])
      .filter(
        (reloadedModule: any) =>
          modules[reloadedModule[0]] !== reloadedModule[1]
      )

    changedModules.forEach((module: any) => {
      modules[module[0]] = module[1]
      subscriptions.forEach(f => f(module[0], module[1], true))
    })
  })
}

const subscribe = (f: any) => {
  context.keys().map((key: string) => {
    const module = context(key)
    modules[key] = module
    f(key, module, false)
  })
  subscriptions.push(f)
  return subscriptions
}

export { modules, subscribe, subscriptions }
