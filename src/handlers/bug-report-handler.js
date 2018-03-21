import chalk from 'chalk'
import { RichEmbed } from 'discord.js'

import DefaultHandler from './default-handler'

import {
  androidReportChannelId,
  iosReportChannelId,
} from '../config'
import { red } from '../helpers/colors'

export default class BugReportHandler extends DefaultHandler {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {
    console.log(chalk.green('Bug report initialized'))
  }

  onMessage(message) {
    const {
      attachments,
      author,
      content,
      guild,
    } = message
    if (!this.isHandledCommand(content, '/bugreport')) {
      return
    }
    let channelId
    const splitMessage = content.split(' ')
    const [
      platform,
    ] = splitMessage.slice(1)
    const description = splitMessage
      .filter((item, index) => index > 1)
      .join(' ')
    switch (platform) {
      case 'android':
        channelId = androidReportChannelId
        break
      case 'ios':
        channelId = iosReportChannelId
        break
      default:
        return
    }
    const attachment = attachments.first()
    guild.channels
      .get(channelId)
      .send(
        '',
        new RichEmbed({
          author: {
            icon_url: author.avatarURL,
            name: author.username,
          },
          color: red,
          description,
          image: {
            url: attachment
              ? attachment.url
              : null,
          },
        })
      )
    message.delete()
  }
}
