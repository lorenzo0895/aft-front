export function clientToOptions(clients: any[]) {
  return clients.map(it => {
    return {
      value: it.id,
      label: it.surname ? it.surname + ', ' + it.name : it.name,
    }
  })
}
