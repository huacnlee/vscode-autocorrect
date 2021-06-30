# AutoCorrect for VS Code

VS Code extentsion for automatically format your source code for add whitespace between CJK (Chinese, Japanese, Korean) and half-width characters (alphabetical letters, numerical digits and symbols).

## Show case

![autocorrect](https://user-images.githubusercontent.com/5518/123918476-7ed38a00-d9b6-11eb-91f7-6af7a9c49a3e.gif)

## Installation

https://marketplace.visualstudio.com/items?itemName=huacnlee.auto-correct

## Configuration

Open VS Code `settings.json`:

```json
{
  // enable formatOnSave, default: true
  "autocorrect.formatOnSave": true,
  // change the autocorrect bin path, default: autocorrect
  "autocorrect.path": "autocorrect"
}
```

## Disable AutoCorrect

If you want disable `formatOnSave` for a file, put `autocorrect: false` as comment it a file.

```rb
# autocorrect: false
puts "This file will ignore."
```

## Requirements

You must install `autocorrect` command first.

https://github.com/huacnlee/autocorrect

```bash
$ curl -sSL https://git.io/JcGER | bash
$ autocorrect -V
0.5.3
```
