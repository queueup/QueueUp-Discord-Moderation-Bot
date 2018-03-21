import chalk from 'chalk'

import DefaultHandler from './default-handler'

export default class WelcomeHandler extends DefaultHandler {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('guildMemberAdd', member =>
      this.onJoin(member))
  }

  onReady() {
    console.log(chalk.green('Welcome initialized'))
  }

  onJoin(member) {
    member.send(`
Hey there !
First of all, welcome and thanks for using QueueUp !
On this server you'll be notified of upcoming news on <#${process.env.ANNOUNCEMENTS_CHANNEL}>
We would love to have your <#${process.env.FEEDBACKS_CHANNEL}> and your possible <#${process.env.SUGGESTIONS_CHANNEL}> !
Of course, you can just chill and talk with other QueueUp users on <#${process.env.RANDOM_CHANNEL}>

It's dangerous to go alone ! You can type \`/help\` at any moment to summon our nice bot that will maybe save your day !

Hope you'll enjoy your new community :) 
Have a drink and QueueUp !
http://queueup.gg
    `)
  }
}
