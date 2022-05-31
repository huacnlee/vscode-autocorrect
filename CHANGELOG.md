## 1.6.4

- Fix for avoid remove space in Markdown Table.
- Change upgrade command by update as default: autocorrect update.
- Fix space with -100, +100 case.
- Fix for avoid change URL or Path.
- Fix remove spaces near the punctuations.

https://github.com/huacnlee/autocorrect/releases/tag/v1.9.4

## 1.6.3

- Fix for avoid remove space prefix within Markdown list, quote case.

https://github.com/huacnlee/autocorrect/releases/tag/v1.9.2

## 1.6.2

- Improve Spellcheck for only change words neer the CJK or Fullwidth punctuations.

https://github.com/huacnlee/autocorrect/releases/tag/v1.8.1

## 1.6.1

- Fix stat error when .autocorrectrc not exist.

## 1.6.0

- Add LaTex support.
- Add AsciiDoc support.

https://github.com/huacnlee/autocorrect/releases/tag/v1.8.0

## 1.5.6

- Avoid load config error, when `.autocorrectrc` not exists.

https://github.com/huacnlee/autocorrect/releases/v1.7.4

## 1.5.4

- Disable Spellcheck by default.

https://github.com/huacnlee/autocorrect/releases/v1.7.4

## 1.5.3

- Bugfix.

https://github.com/huacnlee/autocorrect/releases/v1.7.3

## 1.5.0

- Support `.autocorrectrc` config.

https://github.com/huacnlee/autocorrect/releases/v1.7.0

## 1.4.0

- Add Gettext (.po, .pot) support.
- Add to support multiple config files (.conf, .properties, .toml, .ini) #30.

> Config files just support comments syntax.

https://github.com/huacnlee/autocorrect/releases/v1.6.0

## 1.3.8

- Upgrade AutoCorrect 1.5.13 for fix issues.

https://github.com/huacnlee/autocorrect/releases/tag/v1.5.13

## 1.3.7

- Fix for let format and lint get same result for Markdown Table.

## 1.3.6

- Upgrade AutoCorrect 1.5.9 for fix issues.

- https://github.com/huacnlee/autocorrect/releases/tag/v1.5.9

## 1.3.5

- Upgrade AutoCorrect 1.5.6 for fix issues.

- https://github.com/huacnlee/autocorrect/releases/tag/v1.5.5
- https://github.com/huacnlee/autocorrect/releases/tag/v1.5.6

## 1.3.3

- Upgrade AutoCorrect 1.5.4 for fix issues.

https://github.com/huacnlee/autocorrect/releases/tag/v1.5.4

## 1.3.2

- Fix `//!` comment format for Rust.
- Fix full width for avoid convert leading punctuation char.

## 1.3.0

Suggest you upgrade this version, by test a large file (1000 lines may speed up 10x - 100x).

- Upgrade AutoCorrect 1.5.0 for improve performance for large files.

## 1.2.2

- Fix for not add space near the `*` chars.

## 1.2.1

- Fix error when `.gitignore` or `.autocorrectignore` is not exist.

## 1.2.0

- Rewrite for use @huacnlee/autocorrect WebAssembly version, now not need AutoCorrect bin.
- Improve for run lint after text changed.

## 0.3.2

- Fix lint display and quickfix for multi-line.
- Fix "autocorrect.format" command for remove lint warning on complete.

## 0.3.1

- Lint check on document open.

## 0.3.0

- Always use AutoCorrect to lint and show diagnostics.
- Add QuickFix for fix part.
- Add install/update Dialog for install AutoCorrect bin.

## 0.1.0

- Initial release
