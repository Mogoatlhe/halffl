# halffl

<p style="text-align: justify">
halffl (half football leagues) is a website which displays what selected football league tables would look like if points were awarded after each half ended.
</p>

### reasoning

<p style="text-align: justify">
i've heard people say "at least they didn't lose the second half", referring to a team that conceded a few goals in the first half. i then got curious what league tables would look like if points were awarded on a per half basis.
</p>

## Stack

- ~~made with love~~
- [Next.js](https://nextjs.org)
  <p style="text-align: justify">
  - instead of storing the data from the api in a database and updating it whenever there's a fixture i periodically call the api multiple times a day and update the tables accordingly. [isr (incremental static regeneration)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) from `nextjs` allows me to do so without affecting performance. this makes it extremely helpfull especially dealing with multiple leagues and when there's fixture postponements.
  </p>
- [Tailwind CSS](https://tailwindcss.com)
  - makes styling a lot easier.
  <p style="text-align: justify">
  </p>

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
