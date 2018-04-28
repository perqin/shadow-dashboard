const url = require('url')

function parse (text) {
  const nodes = []
  let result
  const ss = /ss:\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;[\]]*[-a-zA-Z0-9+&@#/%=~_|[\]]/g
  while ((result = ss.exec(text)) !== null) {
    const uri = new url.URL(result[0])
    if (uri.username === '' && uri.password === '') {
      // Legacy pattern
      throw new Error('Unsupported')
    }
  }
  const ssr = /ssr:\/\/([A-Za-z0-9_=-]+)/g
  while ((result = ssr.exec(text)) !== null) {
    const decoded = Buffer.from(result[1], 'base64').toString()
    const parsed = /^((.+):(\d+?):(.*):(.+):(.*):([^/]+))/.exec(decoded)
    const server = parsed[2]
    const serverPort = Number(parsed[3])
    const protocol = parsed[4]
    const method = parsed[5]
    const obfs = parsed[6]
    const password = Buffer.from(parsed[7], 'base64').toString()
    let r
    const obfsParam = (r = /[?&]obfsparam=([A-Za-z0-9_=-]*)/.exec(decoded)) !== null ? Buffer.from(r[1], 'base64').toString() : ''
    const remarks = (r = /[?&]remarks=([A-Za-z0-9_=-]*)/.exec(decoded)) !== null ? Buffer.from(r[1], 'base64').toString() : ''
    const protocolParam = (r = /[?&]protoparam=([A-Za-z0-9_=-]*)/.exec(decoded)) !== null ? Buffer.from(r[1], 'base64').toString() : ''
    const group = (r = /[?&]group=([A-Za-z0-9_=-]*)/.exec(decoded)) !== null ? Buffer.from(r[1], 'base64').toString() : ''
    nodes.push({
      type: 'ssr',
      server: server,
      serverPort: serverPort,
      method: method,
      password: password,
      obfs: obfs,
      obfsParam: obfsParam,
      protocol: protocol,
      protocolParam: protocolParam,
      remarks: remarks,
      group: group
    })
  }
  return nodes
}

module.exports = {
  parse
}
