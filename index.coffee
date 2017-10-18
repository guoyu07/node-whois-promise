Net = require 'net'

module.exports = (domain, server, options = {}) ->
    
    port = options.port || 43

    return new Promise (resolve, reject) ->
        buf = ''

        client = Net.connect port, server, ->
            client.write "#{domain}\r\n"

        if options.timeout isnt undefined
            client.setTimeout options.timeout, (err) ->
                reject 'Socket timeout.'

        client.on 'error', (err) ->
            reject err

        client.on 'data', (data) ->
            buf += data.toString()

        client.on 'end', ->
            resolve buf

