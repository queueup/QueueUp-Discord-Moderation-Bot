export default class DefaultHandler {
  constructor(client) {
    this.client = client
  }

  isHandledCommand(message, command) {
    return message.startsWith(command)
  }
}
