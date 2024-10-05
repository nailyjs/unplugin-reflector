import 'unplugin-naily-reflector/metadata'
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

createApp(App).mount('#root');

interface Hello {
  name: string;
}

class Test implements Hello {
  name = 'Rsbuild';
}

console.dir(Test)