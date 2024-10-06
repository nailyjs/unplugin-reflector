import type { WebpackContext } from '@malagu/cli-service'
import { ConfigurationContext } from '@malagu/cli-service'
import * as NailyReflector from 'unplugin-naily-reflector'

export default async (context: WebpackContext) => {
  const { configurations } = context
  const config = ConfigurationContext.getBackendConfiguration(configurations)
  if (!config)
    return

  // 将NailyReflector插件添加到webpack配置中
  // @ts-expect-error
  config.plugin('naily-reflector').use(NailyReflector.webpack({}))
}
