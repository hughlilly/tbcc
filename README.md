# IT5090 Capstone Project: Telugu Badminton Club of Canterbury

## Introduction

This repository contains the frontend website for the IT5090 Capstone Project (Q4 2022). The author is Hugh Lilly (ID 20220344).

## Companion backend repository

This site displays the information contained in the CMS in the repository [hughlilly/tbcc-db](https://github.com/hughlilly/tbcc-db). Set up and install dependencies for that repository first before moving to this one.

## Source code

### Architecture

This site uses the SSR React framework [Remix](https://github.com/remix-run/remix).

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>=14)
- npm (>6)

### Installation

#### Environment variables

First, create a file to hold your environment variables by duplicating the included sample file:

```bash
cp .env.example .env
```

Open `.env` and paste the Strapi API token created [during the setup of the backend repository](https://github.com/hughlilly/tbcc-db#frontend-remix-site) as the value for `STRAPI_API_TOKEN` (i.e., after the equals sign). Save the file.

#### Install dependencies and start server

Run this series of chained commands:

```bash
npm i && npm run dev
```

This should install all dependencies, and start the Remix server. Open the `localhost` link to view the site.

## Deployed version

This site is deployed to Render at <http://tbcc.onrender.com>. I am using the free tier of Render so initial loads may cause the instance to spin up. If the site does not load initally, try again a few minutes later, or contact me.

## Images

All images are [sourced from Unsplash](https://unsplash.com/collections/OzIboe0O1MQ/it5090).

## Contact

Contact the author, Hugh Lilly (ID 20220344), by email (20220344@mywhitecliffe.com) if you have any questions.
