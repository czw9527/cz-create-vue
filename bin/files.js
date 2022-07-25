import fs from 'fs'

// 创建目录
function mkdirsSync(dirname) {
  // 判断目录是否存在
  if (fs.existsSync(dirname)) {
    return console.log(dirname + '已存在')
  } else {
    fs.mkdir(dirname, () => {})
  }
}

// 创建目录和文件
function mkdirsAndFileSync(dirname, filename, templateFns) {
  // 判断目录是否存在
  if (fs.existsSync(dirname)) {
    return console.log(dirname + '已存在')
  } else {
    fs.mkdir(dirname, () => {
      mkFilsSync(dirname, filename, templateFns)
    })
  }
}

// 创建文件
function mkFilsSync(dirname, filename, templateFns) {
  for (const {
      fn,
      suffix,
      cssSuffix
    } of templateFns) {
    const option = {
      cssSuffix,
      filename
    }
    const filePath = `${dirname}/${filename}.${suffix}`
    wteFileSync(filePath, fn, option)
  }
}

// 写入文件
function wteFileSync(filePath, templateFn, option) {
  if (fs.existsSync(filePath)) {
    console.log(filePath + '已存在')
  } else {
    fs.writeFile(filePath, templateFn(option), function (err) {
      if (err) {
        return console.log('创建文件失败', err)
      }
      console.log(`创建文件成功！-${filePath}`)
    })
  }
}

export {
  mkdirsSync,
  mkdirsAndFileSync,
}