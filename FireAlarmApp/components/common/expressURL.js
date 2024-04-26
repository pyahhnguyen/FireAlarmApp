import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://10.0.238.153:3056/v1/api'
: baseURL = 'http://localhost:3056/v1/api'
}

export default baseURL;