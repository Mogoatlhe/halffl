# halffl

<p style="text-align: justify">
halffl (half football leagues) is a website which displays what selected football league tables would look like if points were awarded after each half ended.
</p>

### reasoning

<p style="text-align: justify">
i've heard people say "at least they didn't lose the second half", referring to a team that conceded a few goals in the first half. i then got curious what league tables would look like if points were awarded on a per half basis.
</p>

## design (preview)

### desktop

![desktop design](./public/images/design/halffl-desktop-design.png)

## Stack

- ~~made with love~~
- [Next.js](https://nextjs.org)
  - instead of storing the data from the api in a database and updating it whenever there's a fixture i periodically call the api multiple times a day and update the tables accordingly. [isr (incremental static regeneration)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) from `nextjs` allows me to do so without affecting performance. this makes it extremely helpful especially when dealing with multiple leagues and when there's fixture postponements.
- [Tailwind CSS](https://tailwindcss.com)
  - makes styling a lot easier.
  <p style="text-align: justify">
  </p>

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
