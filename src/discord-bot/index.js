import Discord from 'discord.js'

export default class DiscordBot {
  constructor() {
    this.client = new Discord.Client()
  }

  start() {
    this.client.login('NDIzNDExMjgxMTAyNjM1MDA4.DYp8BA.qgg8QaxGMyK7WZg_jG_vrWL8plo')
  }
}
