import UAParser from 'ua-parser-js'

/**
 *  useragent 帮助类
 */
const uaParer = new UAParser()
const UA = {
  isIos:() => {
    return uaParer.getOS().name === 'iOS'
  },
  isAndroid:() => {
    return uaParer.getOS().name === 'Android'
  },
  getOsName:() => {
    return uaParer.getOS().name
  },
}

export default UA
