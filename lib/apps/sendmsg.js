import { karin, segment, Bot, common } from 'node-karin'
/**
 * 发送主动消息插件demo
 * 触发指令: #测试主动消息
 */
export const sendMsg = karin.command(/^#测试主动消息$/, async (e) => {
  /** Bot的uid 哪个Bot发就填哪个的 */
  const uid = e.bot.account.uid || e.bot.account.uin
  /** 发送目标 */
  const contact = e.contact
  /** 发送内容 */
  const message = segment.text('\n这是一条主动消息，10秒后自动撤回~')
  /** 发送消息 */
  const { message_id } = await Bot.sendMsg(uid, contact, message, { recallMsg: 10 })
  /** 打印返回的消息ID */
  console.log(`发送成功，消息ID：${message_id}`)
  return true
}, {
  /** 插件优先级 */
  priority: 9999,
  /** 插件触发是否打印触发日志 */
  log: true,
  /** 插件名称 */
  name: '主动消息demo',
  /** 谁可以触发这个插件 'all' | 'master' | 'admin' | 'group.owner' | 'group.admin' */
  permission: 'all',
})
/**
 * 转发插件demo
 * 触发指令: #测试转发
 */
export const forwardMessage = karin.command(/^#测试转发$/, async (e) => {
  /** 定义具体的转发消息 */
  const message = [
    segment.text('这是一条测试转发消息'),
    segment.text('这是一条测试转发消息'),
    segment.text('这是一条测试转发消息'),
  ]
  /** 构建转发消息体 */
  const content = common.makeForward(message, e.self_id, e.bot.account.name)
  /** 发送转发消息 */
  await e.bot.sendForwardMessage(e.contact, content)
  /** 返回true 插件将不再继续执行下一个插件 */
  return true
}, {
  /** 插件优先级 */
  priority: 9999,
  /** 插件触发是否打印触发日志 */
  log: true,
  /** 插件名称 */
  name: '转发demo',
  /** 谁可以触发这个插件 'all' | 'master' | 'admin' | 'group.owner' | 'group.admin' */
  permission: 'all',
})
