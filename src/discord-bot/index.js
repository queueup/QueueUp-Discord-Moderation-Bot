import Discord from 'discord.js'

export default class DiscordBot {
  constructor() {
    this.client = new Discord.Client()
  }

  start() {
    this.client.login(process.env.DISCORD_TOKEN)
  }
}
