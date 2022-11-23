# Sylvan

An easy to use, but infinitely flexible site generator for _your_ Obsidian vault.

## Usage

To use Sylvan, simply add the Github action to your Obsidian project's workflow:
```yaml
[action goes here once it's created]
```

Sylvan is built with [Astro](https://astro.build) and mounts the root of your
vault into Astro's `pages` directory. This means your Obsidian vault's file
structure is a 1:1 mapping of your website's page structure. If you have a file
in `./kb/tech/js/frameworks/astro.md` than the web page's URL for that file will
be `https://youwebsite.tld/kb/tech/js/frameworks/astro`. The one exception is
that files in the `_sylvan` directory will not be visible on your site. This is
a special directory which contains the configuration files for your Sylvan site.
If this directory is not present in your vault, than Sylvan will use some sane
defaults to display your website.

The vault's contents are also copied to the `public/` directory, this means that
the source markdown file for each webpage is available simply by requesting the
`.md` (or `.mdx`) file. This also means that other static content, like images,
will be available exactly where you would expect them to be.

## 🚀 Project Structure

This is the structure of the Sylvan project itself:

```
/
├── public/
├── src/
│   └── layouts/
│   └── components/
│   └── pages/
└── package.json
```

Every layout and component file is overrideable simply by providing your own
version of that file in your `_sylvan` directory. For example, if you wish to
provide your own base layout file you could create `_sylvan/layouts/Base.layout`
and this will overwrite the default `Base.layout` provided by Sylvan.

## 🧞 Commands

These are the npm/yarn commands available for working directly with Sylvan:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |