const path = require('path');

module.exports = {
    mode:'development',
    entry:path.join(__dirname,'src','index.js'),
    output:{
        path:path.join(__dirname,'dist'),
        filename:'client.bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['@babel/preset-react','@babel/preset-env'],
                    plugins:[
                        ["@babel/plugin-proposal-class-properties"]
                    ]
                }
            }
        ]
    }
}