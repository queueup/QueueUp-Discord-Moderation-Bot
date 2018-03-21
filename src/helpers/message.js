export const getAuthorTag = message =>
  `${message.author.username}#${message.author.discriminator}`

export const parseMessage = (message = '') =>
  message.split(' ')

export const getCommand = (message = '') =>
  parseMessage(message)[0]

