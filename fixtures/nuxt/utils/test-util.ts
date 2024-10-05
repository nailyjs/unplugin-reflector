import 'unplugin-naily-reflector/metadata'

export interface Test {
  id: number
  name: string
}

export class TestUtil implements Test {
  id = 1
  name = 'test'
}
