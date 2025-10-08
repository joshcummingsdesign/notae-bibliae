# Notae Bibliae

A collection of biblical, liturgical, and historical notes.

## Markdown

### Initial

Stylized h1 with initial letter.

```md
<Initial text="Gloria Patri" />
```

### Image

The `fixed-width` class removes the 100% width.

The `sepia` class makes it sepia tone.

The `rounded` class gives it rounded corners.

```js
<Image
  className="fixed-width sepia rounded"
  src="/relative-to-public/image.png"
  alt="A nice image"
  width="600"
  height="600"
/>
```

### Red Text

```md
<Red text="this is red" />
```

### Definition

Display a tooltip with a word from the glossary.

```md
<Definition lang="hebrew" anchor="shalom" text="Shalom" />
```

### Poetry

Poetry with indentation and symbols.

```md
<Poetry>
|  \V O Lord, open thou my _ lips, *
|    \R and my mouth shall _ show forth thy praise.
</Poetry>
```

**Symbols**

```
\A = Ant.
\V = ℣
\R = ℟
_ = ·
* = *
+ = †
ˇ = ˇ
¯ = ¯
% = ‡
```

### Footnotes

```md
This is some text.[^1]

[^1]: And this is the footnote.
```

### Mermaid

```md
/public/mermaid/foo.mmd

<Mermaid file="foo" />
```
