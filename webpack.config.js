module.exports = {
    entry : './js/app1.jsx',
    output : {
        filename : './js/out.js'
    },
    watch: true,
    module : {
        loaders : [
            {
                test : /\.jsx$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
                query : {
                    presets : ['es2015', 'stage-2', 'react'],
                },
            },
        ],
    },
};
