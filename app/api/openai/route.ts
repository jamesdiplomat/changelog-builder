import { OpenAI } from "openai";
import { openingPrompt, closingPrompt } from "./prompt";


const openaiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openaiKey });

const TEXT_MODEL = "gpt-4o"

function getRepoPath(repo: string) {
    let repoArray = repo.split("/");
    repoArray.filter((item: string) => item !== "");
    const repoPath = repoArray.slice(-2).join("/");
    return repoPath;
}

async function getCommitMessages(repoPath: string, since: string) {
    const endpoint = `https://api.github.com/repos/${repoPath}/commits?sha=main&since=${since}`;
    const response = await fetch(endpoint);
    const commits = await response.json();
    const commitMessages = commits.map((commit: any) => commit.commit.message);

    return commitMessages;
}

function generatePrompt(commitMessages: string[]) {
    return [
        { role: "system" as const, content: openingPrompt },
        ...commitMessages.map((message: string) => ({ 
            role: "assistant" as const, 
            content: "Commit message: " + message 
        })),
        { role: "user" as const, content: closingPrompt }
    ];
}

export async function GET(request: Request) {
    const currentTime = new Date();
    const sevenDaysAgo = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formattedTime = sevenDaysAgo.toISOString();
    const repo = request.headers.get("repo") as string;
    const repoPath = getRepoPath(repo);

    const commitMessages = await getCommitMessages(repoPath as string, formattedTime);
    const promptMessages = generatePrompt(commitMessages);

    const response = await openai.chat.completions.create({
        model: TEXT_MODEL,
        messages: promptMessages,
    })

    return new Response(response.choices[0].message.content, { status: 200 });
}
