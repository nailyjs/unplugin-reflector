import { Controller, Get, Text } from '@malagu/mvc/lib/node'

class Test<T> {
    data: T
}

@Controller()
export class HomeController {
    
    @Get()
    @Text()
    // 像这个藏在Test里的string类型，我就能通过反射拿到
    home(): Test<string> {
        return { data: 'Hello malagu.' }
    }
}

console.log('Test的返回值类型为:');
console.dir(Test[Symbol.metadata].__naily__.properties[0].getFlagsName(), { depth: null });