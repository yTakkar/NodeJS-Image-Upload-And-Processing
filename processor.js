const gm = require('gm')
const fs = require('fs')
const util = require('util')

const modifyImage = obj => {
    return new Promise((resolve, reject) => {
        let { srcFile, width, height, destFile } = obj
        gm(srcFile)
        .resize(width, height)
        .gravity('center')
        .quality(100)
        .write(destFile, err => {
            err ? reject(err) : resolve('Processed!!')
        })
    })
}

const deleteTempImages = folder => {
    return new Promise((resolve, reject) => {
        const read = util.promisify(fs.readdir)
        read(folder)       
            .then(items => {
                items.map(item => {
                    fs.unlink(folder+item, err => {
                        err ? reject(err) : resolve('Deleted!')
                    })
                }) 
            })
    })
}

module.exports = {
    modifyImage,
    deleteTempImages
}