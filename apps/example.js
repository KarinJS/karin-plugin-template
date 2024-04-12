// 导入 App 模块
import { App, logger } from '#Karin'
import Config from '../lib/config.js'

logger.info(Config.Config.key)

// 创建插件实例，名称为 hello
const app = App.init({ name: 'hello' })

// 注册一个名为 hello 的函数，当接收到消息内容以"你好"结尾时触发
app.reg({
  reg: '^你好$',
  fnc: 'hello',
  // 定义名为 hello 的异步函数
  async hello () {
    // 使用 this.reply 方法回复消息内容为 hello
    this.reply({ type: 'text', text: 'hello' }, { at: true })
  }
})

// 导出插件实例
export const hello = app.plugin(app)
