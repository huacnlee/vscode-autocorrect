# auto-correct for VS Code

VS Code extentsion for automatically format your source code for add whitespace between CJK (Chinese, Japanese, Korean) and half-width characters (alphabetical letters, numerical digits and symbols).

Base on: https://github.com/huacnlee/auto-correct.rs

## Show case

![auto-correct](https://user-images.githubusercontent.com/5518/123918476-7ed38a00-d9b6-11eb-91f7-6af7a9c49a3e.gif)

## Installation

https://marketplace.visualstudio.com/items?itemName=huacnlee.auto-correct

## Configuration

```json
// enable formatOnSave
"auto-correct.formatOnSave": true
```

## Disable AutoCorrect

If you want disable `formatOnSave` for a file, put `autocorrect: false` as comment it a file.

```rb
# autocorrect: false
puts "This file will ignore."
```

## Requirements

You must install `autocorrect` command first.

```bash
$ curl -sSL https://git.io/JckA6 | bash
$ autocorrect -V
0.5.2
```
