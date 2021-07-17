# AutoCorrect for VS Code

VS Code extentsion for automatically format your source code for add whitespace between CJK (Chinese, Japanese, Korean) and half-width characters (alphabetical letters, numerical digits and symbols).

## Show case

### Lint

<img width="901" alt="huacnlee.autocorrect" src="https://user-images.githubusercontent.com/5518/126027685-cee6f91d-1a10-4fcc-b5f4-1a99ac4cd5ae.png">

### Use FormatOnSave

![autocorrect](https://user-images.githubusercontent.com/5518/123918476-7ed38a00-d9b6-11eb-91f7-6af7a9c49a3e.gif)

## Installation

https://marketplace.visualstudio.com/items?itemName=huacnlee.auto-correct

## Configuration

Open VS Code `settings.json`:

```json
{
  // Turn on/off enable AutoCorrect
  "autocorrect.enable": true,
  // Turn on/off formatOnSave, default: true
  "autocorrect.formatOnSave": true,
  // Change the autocorrect bin path, default: autocorrect
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
0.6.0
```
