# Unjobless: A simple way to apply

## Team members/Contributors

Will be listed in the contribution.md file

## Introduction

We are team 8 of COMPSCI 520, and we present Unjobless, an application that aims to streamline the application process for students and job seekers alike. The ultimate purpose of this project is to help ease some of the most frustrating aspects of employment seeking, which all of us have to go through in our lives. 

“We want to introduce a solution that
helps users get hired and make
recruiting better for everyone.” - Our motto


At the core of this application, we present application auto-filling and job-scraping functionalities that aim to save the user time and effort in their job-seeking process. We also present an application management system that will help users organize their job applications and update their profiles. 

New users can start immediately by creating a new account with their personal information, after which they can start filling out job applications right away!

## Project Components

This project has three major components:

### 1. Web application view

This allows the user to see a comprehensive and tabularized rundown of the current list of available jobs, those they have already applied to, and those that they have marked as "Rejected". There will also be a functionality that 
allow the user to view and edit their personal information, allowing for flexibility and personal growth.

### 2. Web extension view

The main functionality of this is to let the user perform instant application auto-filling at the click of a button. The extension can also allow for personalized AI-generated answers to questions that are not part of the predefined info in the profile.

### 3. NestJS Back-end

This backend bridges the gaps between the Front-end views and the MongoDB cloud database as well as other third-party APIs (Open AI). It allows for robust authentication and data processing/serving. 

The backend is also built on another repository [repository](https://github.com/kien-to/cs520-backend). This is for easiser hosting.

## How to run?

### Prerequesites

- Node.js and npm.

- pnpm package manager version 8. Install with 
```
npm install -g pnpm@8
```

NOTE: The backend is hosted on Vercel already so there is no need to run it locally.

### Apps and Packages

- `web`: Main web Next.js app
- `extension`: Chrome extension

### Develop

To run all apps and packages, run the following command:

```
pnpm dev
```

Dev individual apps:

- web:

```
pnpm dev:web
```

- extension:

```
pnpm dev:ext
```

1. Enable developer mode for Chrome
2. Load unpacked the `apps/extension/dist` directory

## Environment variables

We already provided a .env file with the necessary link for the back-end hosted on Vercel, so you just have to run the application for grading.

