# Comaps

A platform for creating and visualising community maps. 

It is available to use at [comaps.radicaldata.org](https://comaps.radicaldata.org).

### Install

1. Clone the repository: `git clone https://github.com/radical-data/comaps.git`
1. Navigate to the project folder: `cd comaps`.
1. Install dependencies: `npm install`.
1. Set up a Supabase (local) project with the [official CLI](https://supabase.com/docs/guides/cli/getting-started).
1. Set the environment variables.
    1. Copy the `.env.example` file to `.env` (manually or with `cp .env.example .env`).
    1. Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the output of `supabase start`.
1. Run the DB migrations locally with `supabase db reset`.
1. Fetch the data from Supabase: `npm run fetch-data`.

### Develop

To develop Comaps locally:

1. Start a development server: `npm run dev`.
1. Comaps will be running locally at http://localhost:5173/.

## Build

To create a production version of Comaps:

1. Build it: `npm run build`.
1. (Optional) You can preview the production build with `npm run preview`.

## Deploying to Production

To use Supabase as a remote backend make sure to link your local development with your remote Supabase project:

1. Make sure you have a Supabase acount and connect it to the supabase cli: `supabase login`
1. Link a specific remote project `supabase link --project-ref <project-ref>`  ([more info](https://supabase.com/docs/reference/cli/supabase-link))
1. Run migrations on remote DB `supabase db push` ([more info](https://supabase.com/docs/reference/cli/supabase-db-push))
1. Make sure that the env vars `SUPABASE_URL` and `SUPABASE_ANON_KEY` do point to the correct production project and not the local containers. You can grab them from inside [your Supabase project's dashboard](https://supabase.com/dashboard/project/_/settings/api).

## Sharing feedback

Your feedback helps us improve Comaps! If you have feature requests or find bugs, please [open an issue](https://github.com/radical-data/comaps/issues/new).
