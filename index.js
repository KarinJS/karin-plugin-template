import path from 'path'
import { logger, common } from '#Karin'

/** 当前文件的绝对路径 */
const filePath = common.absPath(import.meta.url.replace(/^file:(\/\/\/|\/\/)/, ''))
/** 插件包的目录路径 */
const dirname = path.dirname(filePath)

export { dirname }

logger.info('karin-plugin-template 插件 0.0.1初始化~')
