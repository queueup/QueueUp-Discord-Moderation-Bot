import chalk from 'chalk'
import {RichEmbed} from 'discord.js'

import DefaultHandler from './default-handler'

import {blue} from '../helpers/colors'

export default class ApprovalHandler extends DefaultHandler {
    constructor(client) {
        super(client)

        this.client.on('ready', () =>
            this.onReady())
        this.client.on('message', message =>
            this.onMessage(message))
    }

    onReady() {
        console.log(chalk.green('Approval initialized'))
    }

    onMessage(message) {
        const {
            channel,
            author,
            content,
        } = message
        if (!this.isHandledCommand(content, '/approve')) {
            return
        }
        const splitMessage = content.split('/approve ')

        if (splitMessage[1]) {
            let description = author.username + " needs your opinion about this:"
            let question = splitMessage[1]
            message.delete()
            channel.send(description,
                new RichEmbed({
                    author: {
                        name: author.username,
                        icon_url: author.avatarURL,
                    },
                    color: blue,
                    description: question,
                })).then((botMessage) => {
                botMessage.react("👍")
                botMessage.react("👎")
            }).catch((error) => {
                channel.send('Oops ! Something went wrong while executing your request ...')
                console.log(chalk.red(error))
            })
        } else {
            channel.send('Please add a description')
        }
    }
}