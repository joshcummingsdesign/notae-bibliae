# Notae Bibliae

A collection of biblical, liturgical, and historical notes.

## Markdown

### Initial

Stylized h1 with initial letter.

```md
<Initial text="Gloria Patri"/>
```

### Image

```md
<Image
  src="/chants/tone-ii-with-alleluia.png"
  alt="Tone II with Alleluia"
  width="600"
  height="88"
/>
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
\V = ℣
\R = ℟
_ = ·
* = *
+ = †
ˇ = ˇ
% = ‡
```

### Footnotes

```md
This is some text.[^1]

[^1]: And this is the footnote.
```
