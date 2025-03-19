This is a Next.js application built with Tailwind CSS and TypeScript. The backend, hosted on `/app/api`, employs OpenAI API, GitHub API with Vercel AI toolkit. I wrote this readme documentation while I was building the application. 

## AI Tools Used

- Augment Code

## Insights

- Since the user-facing code changes are pushed onto the main branch, the main branch is where we want to look for the commits that would shape how the changelog is written.
- Because most changes in the main branch are based on pull requests, the commit messages usually are quite detailed. 

## Deployment

- Vercel Platform. To access the application, go to [https://changelog-builder.vercel.app/](https://changelog-builder.vercel.app/). 
- To run locally, clone this repo and run `npm run dev`

## Design Decisions

- To make this as easy as possible, the developer just needed to copy and paste the GitHub repository URL. The developer can then review the changelog before committing the changes.
- For each changelog section, there is a Title (which is initialized to today's date), and a list of bullet points the developer can edit.
- I used OpenAI API since I knew the behavior of OpenAI the best. 
- I initially wanted to use the code diff to summarize the commits; however, it seems like from most of the repositories that I look explored, the commit messages were already enough to accurately describe the changes made to the codebase.
  - A corollary however would be that, if the commit messages from the pull requests were poorly detailed, then the resulting changelog would also reflect the poor message documentation. Garbage In, Garbage Out. 
- Interestingly enough, Claude API was under an outage while working on the assignment, so I had to use OpenAI API.
- I added support for the developer to delete Changelog bullet points and delete sections, and for the developer to edit the output of the OpenAI LLM-generated changelog. This is because LLMs may not always be accurate or phrase in such a way that the developer would want.

## Explored / Tested Repositories

- TailwindCSS
- Browser Use

## Reflection

- I initially considered using a Firebase database to store the changelog, because I had previous experiences using Firebase.
    - However, I then realized that this would absolutely overengineer the application for the scope of this project. 
    - An useContext hook would probably be enough to store the changelog, though each time the program is reloaded, the changelog would be reset, and users would not be able to share the changelog with others.


## Future Considerations

- This currently only works with public (open-source) repositories. A support for a GitHub API key would be needed to support private repositories.
- I would probably add authentication on the developer side
- I would probably integrated the diffs (insertions/deletions), though this would easily overcrowd the context window of even the largest LLMs like Claude 3.7 which have only 200k tokens.
- If I had more time, I would do a better job of having the Github commits be placed with in context with the rest of the codebase. This is something that I would need to learn more about, having codebase context. 
- I might also have used Claude 3.5 Haiku / 3.7 Sonnet next time instead of OpenAI API 