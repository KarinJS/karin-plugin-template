import { karin } from 'node-karin'
export const hello = karin.command(/^#你好$/, async (e) => {
  await e.reply('hello', { at: false, recallMsg: 0, reply: true })
  return true
})
