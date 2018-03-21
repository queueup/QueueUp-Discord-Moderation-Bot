import chalk from 'chalk'
import { RichEmbed } from 'discord.js'

import DefaultHandler from './default-handler'

import helpData from '../data/help.json'
import { formatParams } from '../helpers/help'
import { blue } from '../helpers/colors'

export default class HelpHandler extends DefaultHandler {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {
    console.log(chalk.green('Help initialized'))
  }

  onMessage({ channel, content }) {
    if (!this.isHandledCommand(content, '/help')) {
      return
    }
    const splitMessage = content.split(' ')
    let embed = {}

    if (splitMessage[1]) {
      const data = helpData.find(helpDatum => helpDatum.command === splitMessage[1])
      if (data) {
        embed = {
          description: data.description,
          fields: data.actions.map(action => ({
            name: action.description,
            value: `\`/${data.command} ${formatParams(action.params)}\`\n ${action.notes}`,
          })),
        }
      } else {
        channel.send('Unknown help command')
        return
      }
    } else {
      embed = {
        description: 'Needing some help ? Choose the command you want to learn more about',
        fields: helpData.map(helpDatum => ({
          name: helpDatum.description,
          value: `\`/help ${helpDatum.command}\``,
        })),
      }
    }
    channel.send('', new RichEmbed({
      author: {
        icon_url: this.client.user.avatarURL,
        name: 'QueueUp - Help',
        url: 'http://queueup.gg',
      },
      color: blue,
      ...embed,
    }))
  }
}
