import fs from 'fs'

// 创建目录
function mkdirsSync(dirname) {
  // 判断目录是否存在
  if (fs.existsSync(dirname)) {
    return console.log(dirname + '已存在')
  } else {
    fs.mkdir(dirname, () => {
      console.log(dirname + '创建成功')
    })
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


function copyFile(dirList, fileName) {
  let paths = fs.readdirSync(dirList);
  // const writable = fs.createWriteStream(fileName); //创建写入流
  paths.forEach(function (path) {
    const _src = dirList + '/' + path;
    const writable = fs.createWriteStream(`${fileName}/${path}`); //创建写入流
    fs.stat(_src, function (err, stats) { //stats  该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) { //如果是个文件则拷贝 
        fs.createReadStream(_src).pipe(writable); //创建读取流
      } else if (stats.isDirectory()) { //是目录则 递归 
        checkDirectory(_src, fileName, copy);
      }
    });
  });
}

function checkDirectory(src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
}

export {
  mkdirsSync,
  mkdirsAndFileSync,
  copyFile
}