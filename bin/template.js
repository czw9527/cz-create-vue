function indexPage({
  filename,
}) {
  const exportName = filename.charAt(0).toUpperCase() + filename.slice(1)
  return `import ${exportName} from './${filename}.vue';
export default ${exportName};`
}

// vue2.x文件模板
function vuePage({
  filename,
  cssSuffix
}) {
  return `<template>
    <div class="${filename}Page">

    </div>
</template>
<script>
export default {
  name: '${filename}',
  data() {
    return {
      
    }
  }
}
</script>
<style lang="${cssSuffix}" scoped>
@import url('./${filename}.${cssSuffix}');
</style>`
}

// vue3.x文件模板
function vue3Page({
  filename,
  cssSuffix
}) {
  return `<template>
    <div class="${filename}Page">

    </div>
</template>
<script lang="ts" setup>
import {} from 'vue'
</script>
<style lang="${cssSuffix}" scoped>
@import url('./${filename}.${cssSuffix}');
</style>`
}

// less/scss文件模板
function stylePage({
  filename,
}) {
  return `.${filename}Page {

}`
}

// vue2.x directive文件模板
function directivePage({
  filename,
}) {
  return `const ${filename} = {
    bind(el, binding) {},
    unbind(el, binding) {},
    componentUpdated(el, binding) {},
  }
  export default ${filename};`
}

// vue3.x directive文件模板
function directive3Page({
  filename,
}) {
  return `const ${filename} = {
    // 指令绑定元素挂载前
    beforeMount(el) {},
    // 指令绑定元素挂载后
    mounted(el, binding) {},
    // 指令绑定元素因为数据修改触发修改前
    beforeUpdate(el) {},
    // 指令绑定元素因为数据修改触发修改后
    updated(el) {},
    // 指令绑定元素销毁前
    beforeUnmount(el) {},
    // 指令绑定元素销毁后
    unmounted(el) {},
}
export default ${filename};`
}

// directive文件模板
function pluginPage({
  filename,
}) {
  return `const ${filename} = {
    install: (Vue, options) => {

    }
}
export default ${filename};`
}

export {
  indexPage,
  vuePage,
  vue3Page,
  stylePage,
  directivePage,
  directive3Page,
  pluginPage
}