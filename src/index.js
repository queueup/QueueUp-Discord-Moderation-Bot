import dotenv from 'dotenv'

import DiscordBot from './discord-bot'
import BugReportHandler from './handlers/bug-report-handler'
import HelpHandler from './handlers/help-handler'
import UserReportHandler from './handlers/user-report-handler'
import WelcomeHandler from './handlers/welcome-handler'

dotenv.config()

const bot = new DiscordBot()

console.clear()


new BugReportHandler(bot.client)
new HelpHandler(bot.client)
new UserReportHandler(bot.client)
new WelcomeHandler(bot.client)

bot.start()
