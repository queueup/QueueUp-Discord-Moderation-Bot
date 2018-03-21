export const formatParams = params =>
  params.map((param) => {
    if (typeof param === 'string') {
      return `<${param}>`
    }
    switch (param.type) {
      case 'enum':
        return `<${param.name}:${param.values.join('|')}>`
      default:
        return ''
    }
  }).join(' ')

export default {
  formatParams,
}
