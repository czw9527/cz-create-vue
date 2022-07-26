// 命令行交互
import inquirer from 'inquirer'

// 引入文件模板
import {
    mkdirsSync,
    mkdirsAndFileSync,
} from './files.js'

// 引入文件模板
import {
    vuePage,
    stylePage,
    vue3Page,
    directivePage,
    directive3Page,
    pluginPage
}
from './template.js'
const {
    version,
    choice,
    name,
    cssType
} = await inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'list',
            name: 'version',
            message: 'you version',
            choices: ['vue2.x', 'vue3.x'],
        },
        /* Pass your questions in here */
        {
            type: 'list',
            name: 'choice',
            message: 'what do you want to do',
            choices: ['create component', 'create view', 'create directive', 'create plugin'],
        },
        /* Pass your questions in here */
        {
            type: 'list',
            name: 'cssType',
            message: 'what do you want to use',
            choices: ['scss', 'less'],
            when: function (answer) {
                return ['create component', 'create view'].includes(answer.choice)
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'please input dirname eg:`views/default`',
            // default: 'views/default',
            /* Legacy way: with this.async */
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                var done = this.async()

                // Do async stuff
                if (
                    input === '' ||
                    typeof input !== 'string' ||
                    !isNaN(Number(input[0]))
                ) {
                    // Pass the return value in the done callback
                    return done('You need to provide a string')
                }
                // Pass the return value in the done callback
                done(null, true)
            },
        },
    ])
let dirname;

let templateFns = [{
        fn: version === 'vue2.x' ? vuePage : vue3Page,
        suffix: 'vue',
        cssSuffix: cssType
    },
    {
        fn: stylePage,
        suffix: `${cssType}`,
        cssSuffix: cssType
    }
];
// 创建文件夹
mkdirsSync('./src')

// 根据选择创建对应的文件夹
switch (choice) {
    case 'create component':
        dirname = `./src/components`
        mkdirsSync('./src/components')
        break;
    case 'create view':
        dirname = `./src/views`
        mkdirsSync('./src/views')
        break;
    case 'create directive':
        dirname = `./src/directives`
        templateFns = [{
            fn: version === 'vue2.x' ? directivePage : directive3Page,
            suffix: version === 'vue2.x' ? 'js' : 'ts'
        }, ]
        mkdirsSync('./src/directives')
        break;
    case 'create plugin':
        dirname = `./src/plugins`
        templateFns = [{
            fn: pluginPage,
            suffix: version === 'vue2.x' ? 'js' : 'ts'
        }, ]
        mkdirsSync('./src/plugins')
        break;
    default:
        break;
}
const nameArr = name.split('/')
// 如果层级较深，先创建目录
while (nameArr.length > 1) {
    const nowName = nameArr.shift()
    dirname += `/${nowName}`
    mkdirsSync(dirname)
}
const dirName = `${dirname}/${nameArr[0]}`
// 创建文件
mkdirsAndFileSync(dirName, nameArr[0], templateFns)