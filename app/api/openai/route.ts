import { OpenAI } from "openai";
import { openingPrompt, closingPrompt } from "./prompt";

const openai = new OpenAI();
const TEXT_MODEL = "gpt-4o"

async function getCommitMessages(repoPath: string, since: string) {
    const response = await fetch(`https://api.github.com/repos/${repoPath}/commits?sha=main&since=${since}`);
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

    const repoRegex = /repos\/([^\/]+\/[^\/]+)/;
    const match = repo.match(repoRegex);
    const repoPath = match ? match[1] : null;

    const commitMessages = await getCommitMessages(repoPath as string, formattedTime);
    const promptMessages = generatePrompt(commitMessages);

    const response = await openai.chat.completions.create({
        model: TEXT_MODEL,
        messages: promptMessages,
    })

    return new Response(response.choices[0].message.content, { status: 200 });
}
