# People Sections Reorganization

## Goal

Replace the single **Scholars** section under **People** with two historically focused sections, and move the corresponding page routes into those sections.

## Navigation and ordering

The **People** menu will contain these sibling sections in place of **Scholars**:

### Early Christian Writers

1. Clement of Alexandria
2. Tertullian
3. Julius Africanus
4. Origen of Alexandria
5. Eusebius

### Medieval Theologians

1. Boethius
2. Peter Lombard
3. Duns Scotus
4. William of Ockham

## Routes

Early Christian Writers will use `/people/early-christian-writers/<slug>`. Medieval Theologians will use `/people/medieval-theologians/<slug>`.

The existing page slugs remain unchanged. In particular, Origen's existing slug is `origen`. Each section will have its own landing page at the section root.

The former `/people/scholars` landing page and all `/people/scholars/<slug>` routes will be removed. Per the approved requirement, no redirects or compatibility aliases will be added.

## Internal references

All repository-owned links to the moved pages will be updated to their new routes. Page metadata and prose content remain unchanged except where needed for the two new landing pages and section labels.

## Verification

- Search the source tree to ensure no `/people/scholars` links remain.
- Run the project's relevant formatting, type-checking, and build checks.
- Confirm the People menu shows both sections and the requested ordering.
