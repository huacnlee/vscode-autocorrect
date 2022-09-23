# AutoCorrect for VS Code

[AutoCorrect](https://github.com/huacnlee/autocorrect) 用于「自动纠正」或「检查并建议」文案，给 CJK（中文、日语、韩语）与英文混写的场景，补充正确的空格，同时尝试以安全的方式自动纠正标点符号等等。

类似 ESlint、Rubocop、Gofmt 等工具，[AutoCorrect](https://github.com/huacnlee/autocorrect) 结合 VS Code，它提供 Lint 功能能便捷的检测出项目中有问题的文案，起到统一规范的作用。

支持各种类型源代码文件支持，能自动识别文件名，并准确找到字符串、注释做自动纠正。

> 此方案最早于 [2013 年](https://github.com/huacnlee/auto-correct/commit/688b7f492623baead3477b4cf0baa706777864d6) 出现于 Ruby China 的项目，并逐步完善规则细节，当前准确率较高（级少数异常情况），你可以放心用来辅助你完整自动纠正动作。

## Show case

### Lint

[AutoCorrect](https://github.com/huacnlee/autocorrect) 可以在打开文件或保存文件后，对当前文件做 Lint 检查，并用颜色标注出有问题的部分。

<img width="900" alt="huacnlee.autocorrect" src="https://user-images.githubusercontent.com/5518/191890126-4e0c99dc-91ce-4262-a774-3813a636eea1.png">

## 使用演示

<img width="900" src="https://user-images.githubusercontent.com/5518/191890586-f184b798-9432-48e8-a7ff-92b5c9f8f230.gif" />

### Use FormatOnSave

当开启 FormatOnSave 的时候，保存文件会自动纠正有问题的部分。

## Configuration

Open VS Code `settings.json`:

```json
{
  // 开启/关闭 AutoCorrect
  "autocorrect.enable": true,
  // 是否启用 formatOnSave，默认: true
  "autocorrect.formatOnSave": true
}
```

### AutoCorrect 配置文件

参见：https://github.com/huacnlee/autocorrect#configuration

支持 `.autocorrectrc` 配置文件

```yml
# 配置拼写检查
spellcheck:
  # 0 - 仅用, 1 - 开启, 2 - 仅做检查提示
  mode: 1
  # 名字纠正（主要不要用常见的英文单词）
  words:
    - GitHub
    - App Store
    # This means "appstore" into "App Store"
    - AppStore = App Store
    - Git
    - Node.js
    - nodejs = Node.js
    - VIM
    - DNS
    - HTTP
    - SSL
```

## 临时禁用 AutoCorrect

某些时候或某些特殊场景你可能不期望 AutoCorrect 纠正，例如：

- 本身需要验证错误文案的场景；
- AutoCorrect 存在没有覆盖正确的场景（尤其是正则）；

你可以在项目根目录准备一个 `.autocorrectignore` 来告诉 AutoCorrect 那些文件需要忽略，用法和 `.gitignore` 类似，同时 AutoCorrect 默认也会忽略 `.gitignore` 匹配的文件。

此外，你还可以采用 `autocorrect: false` 或 `autocorrect-disable` 在文件内部禁用某些行，当 AutoCorrect 检测到此标记，将会暂时停用，直到遇到下一个 `autocorrect: true` 或 `autocorrect-enable` 将会恢复。

例如：

```js
function hello() {
  // autocorrect: false
  console.log('现在这行开始autocorrect会暂时禁用');
  console.log('这行也是disable的状态');
  // autocorrect: true
  let a = '现在起autocorrect回到了启用的状态';
}
```

当纠正以后，处于 `autocorrect: false` 和 `autocorrect: true` 的部分 AutoCorrect 不会处理。

```js
function hello() {
  // autocorrect: false
  console.log('现在这行开始autocorrect会暂时禁用');
  console.log('这行也是disable的状态');
  // autocorrect: true
  let a = '现在起 autocorrect 回到了启用的状态';
}
```
