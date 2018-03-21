import chalk from 'chalk'

import DefaultHandler from './default-handler'

export default class UserReportHandler extends DefaultHandler {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {
    console.log(chalk.green('User report initialized'))
  }

  onMessage(message) {
    const {
      author,
      content,
      guild,
    } = message
    if (!this.isHandledCommand(content, '/userreport')) {
      return
    }
    const splitContent = content.split(' ')
    splitContent.splice(0, 1)
    const [
      region,
    ] = splitContent.splice(0, 1)
    const summonerName = splitContent.join(' ')

    guild.channels.get(process.env.USER_REPORT_CHANNEL).send(`<@${author.id}> just reported \`${summonerName}\` from ${region}`)
    message.author.send(`Your report about \`${summonerName}\` has been sent. We might get in touch with you soon to learn more about it.`)

    message.delete()
  }
}
