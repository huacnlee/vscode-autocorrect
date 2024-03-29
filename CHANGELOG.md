## 2.6.4

- Upgrade AutoCorrect 2.8.5 for fix issues.

https://github.com/huacnlee/autocorrect/releases/tag/v2.8.5

## 2.6.3

- Fix #6, remove lint diagnostics when document close.

## 2.6.2

Incoming a lot of fix for markdown:

- Fix markdown to support parse `[foo]` as link text.
- Improve Markdown parser for soft wrap for avoid some mistakes.
- Fix markdown for support newline in link and mark `[text\nfoo]()`, `**Foo\nBar**`.
- Fix HTML parse in markdown.
- Fix markdown for support mark in link text.

https://github.com/huacnlee/autocorrect/releases/tag/v2.6.2

## 2.6.1

- Fix halfwidth converter for not change `‘...’`, `“...”` in english contents.

  The single `‘...’` and double `“...”` char is used in english typographic.
  ref: https://en.wikipedia.org/wiki/Quotation_marks_in_English

https://github.com/huacnlee/autocorrect/releases/tag/v2.6.1

## 2.6.0

- Add for Jupyter Notebook supports `.jupyter`, `.ipynb`.

https://github.com/huacnlee/autocorrect/releases/tag/v2.6.0

## 2.5.8

- Add to support Svelte (.svelte)
- Improve Markdown grammar for use COMMENT built-in rule name.
- Improve grammars for complex white spaces and comments.

https://github.com/huacnlee/autocorrect/releases/tag/v2.5.8

## 2.5.2

- Improve AsciiDoc parser details for fix a lot of issues.

https://github.com/huacnlee/autocorrect/releases/tag/v2.5.2

## 2.5.1

- VS Code plugin renamed to: `huacnlee.autocorrect`.
- Add `fileTypes` config key for support customize file types mapping.
- Add rule: `no-space-fullwidth-quote` for allows config keep or remove space around fullwidth quotes `“”`,
- Add `.asc` as AsciiDoc.
- Add `.mdx` as Markdown.
- Add `Rakefile`, `.gemspec`, `Profile` as Ruby.
- Fix halfwidth covert for escape quote when wrap has same quote.
- Fix AsciiDoc issue that will lose the end char in mark.

https://github.com/huacnlee/autocorrect/releases/tag/v2.5.1

## 2.4.3

- Watch configuration to clear lint diagnostics when `autocorrect.enableLint` or `autocorrect.enable` config has disabled.

## 2.4.2

- Add `enableLint` config for enable/disable linting.

## 2.4.0

- Upgrade AutoCorrect v2.4.0 to support `.xml`, `.kt`, `.proto`, `.proto` and improve Markdown parser.
- Fix VS Code Extension to load `.autocorrectrc` config.

https://github.com/huacnlee/autocorrect/releases/edit/v2.4.0

## 2.3.0

- Add to support correct full-width punctuations into half-width in english contents.
- Define languages to let VS Code kwnow `.autocorrectrc`, `.autocorrectignore` file type.

https://github.com/huacnlee/autocorrect/releases/tag/v2.3.0

## 2.2.0

Add `textRules` options for config some special words or texts to ignore.

**For example we wants:**

- `Hello世界` - To just give warning.
- `Hi你好` - To ignore.

Use can config in `.autocorrectrc`:

```yml
textRules:
  Hello世界: 2
  Hi你好: 0
```

After that, the AutoCorrect will follow your `textRules` to process.

## 2.1.1

- Fix `path should be a`path.relative()`d string, but got ".."` error on Windows.

https://github.com/huacnlee/autocorrect/issues/100

## 2.1.0

- Implement Web Extension feature for support use on VS Code Web version, like [VS Code Dev](https://vscode.dev/), [GitHub Dev](https://github.dev)
- Quick fix behavior is changed, just replace text not save.
- Avoid invoke format action when use `Save without format`.

## 2.0.1

- Change diagnostic message for lint use warning and spellcheck use information style.

## 2.0.0

- Upgrade AutoCorrect 2.0.

https://github.com/huacnlee/autocorrect/releases/tag/v2.0.0

## 1.8.0

- Use `Error` diagnostic to show correct issue.
- Add `Warning` diagnostic to show spellcheck issue.

## 1.7.5

- Fix #75 avoid change HTML tag attributes in Markdown.

https://github.com/huacnlee/autocorrect/releases/tag/v1.10.8

## 1.7.3

- Improve performance for some complex file case.
- core: Limit parse stack max depth for avoiding some complex parser will hangs indefinitely.
- core: Improve Markdown parser for supports meta info.
- core: Improve HTML parser details.
- core: Fix Markdown parser may deadlock issue.

https://github.com/huacnlee/autocorrect/releases/tag/v1.10.5

## 1.7.2

- Markdown support comment for disable autocrrect.

```md
<!-- autocorrect: false -->

This line will ignore

<!-- autocorrect: true -->
```

## 1.7.0

- Add C, C++ supports.
- fix(Markdown): Avoid add space on WikiLinks.
- Improve AsciiDoc.
- Fix Markdown for avoid add space near the link #54

https://github.com/huacnlee/autocorrect/releases/tag/v1.10.0

## 1.6.5

- Fix #53, #43 avoid change `!` near the alphabet.

https://github.com/huacnlee/autocorrect/releases/tag/v1.9.5

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
