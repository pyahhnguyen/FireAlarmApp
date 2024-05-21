import { registerRootComponent } from 'expo';
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import App from './App';

// Use this for Expo managed workflow
registerRootComponent(App);
