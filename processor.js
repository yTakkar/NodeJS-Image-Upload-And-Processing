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

const read = util.promisify(fs.readdir)
const dlt = util.promisify(fs.unlink)

const deleteTempImages = folder => {
    return new Promise((resolve, reject) => {
        read(folder)       
            .then(items => {
                items.map(item => {
                    dlt(folder+item)
                        .then(s => resolve('Deleted') )
                        .catch(e => reject(err) )
                }) 
            })
    })
}

module.exports = {
    modifyImage,
    deleteTempImages
}