import { dirPath } from '@/utils'
import { karin, render, common, segment, logger } from 'node-karin'

/**
 * 渲染demo
 * 触发指令: #测试渲染
 */
export const image = karin.command(/^#?测试渲染$/, async (e) => {
  try {
    const filePath = common.absPath(dirPath + '/resources')
    const html = filePath + '/template/test.html'
    const image = filePath + '/image/启程宣发.png'

    const img = await render.render({
      name: 'render',
      file: html,
      data: {
        file: image,
        pluResPath: process.cwd(),
      },
      pageGotoParams: {
        waitUntil: 'networkidle2',
      },
    }) as string

    await e.reply(segment.image(img))
    return true
  } catch (error) {
    logger.error(error)
    await e.reply(JSON.stringify(error))

    return true
  }
}, {
  /** 插件优先级 */
  priority: 9999,

  /** 插件触发是否打印触发日志 */
  log: true,

  /** 插件名称 */
  name: '测试渲染',

  /** 谁可以触发这个插件 'all' | 'master' | 'admin' | 'group.owner' | 'group.admin' */
  permission: 'all',

})

/**
 * 渲染demo
 * 触发指令: #渲染
 */
export const renderUrl = karin.command(/^#?渲染/, async (e) => {
  const file = e.msg.replace(/^#?渲染/, '').trim()
  try {
    const img = await render.render({
      name: 'render',
      file: file || 'https://whitechi73.github.io/OpenShamrock/',
      type: 'png',
      pageGotoParams: {
        waitUntil: 'networkidle2',
      },
      setViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      },
    }) as string
    await e.reply(segment.image(img))
    return true
  } catch (error: any) {
    logger.error(error)
    await e.reply(error.message)
    return true
  }
}, {
  /** 插件优先级 */
  priority: 9999,

  /** 插件触发是否打印触发日志 */
  log: true,

  /** 插件名称 */
  name: '渲染demo',

  /** 谁可以触发这个插件 'all' | 'master' | 'admin' | 'group.owner' | 'group.admin' */
  permission: 'master',
})
