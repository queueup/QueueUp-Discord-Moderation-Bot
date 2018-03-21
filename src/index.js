import dotenv from 'dotenv'

import DiscordBot from './discord-bot'
import BugReportHandler from './handlers/bug-report-handler'
import HelpHandler from './handlers/help-handler'
import UserReportHandler from './handlers/user-report-handler'


const bot = new DiscordBot()

dotenv.config()
console.clear()


new BugReportHandler(bot.client)
new HelpHandler(bot.client)
new UserReportHandler(bot.client)

bot.start()
