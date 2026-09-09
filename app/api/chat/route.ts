// In-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // Max 10 messages per minute per IP

  const userRecord = rateLimitMap.get(ip);
  if (!userRecord || now > userRecord.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (userRecord.count >= maxRequests) {
    return false;
  }
  userRecord.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown_ip";
    if (!checkRateLimit(ip)) {
      return new Response(
        "Waduh, pelan-pelan ngab! Limit pesan kamu udah abis nih, tunggu semenit lagi ya. 😅",
        { status: 429 },
      );
    }

    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("GROQ_API_KEY is not configured");
      return new Response("AI service is not configured", { status: 500 });
    }

    const systemPrompt = `
Kamu adalah asisten AI pribadi Ryan (seorang Full-Stack & Machine Learning Engineer).
Gaya bahasamu itu asyik, santai, friendly, dan ala Gen Z tapi nggak alay/cringe. Posisikan dirimu layaknya teman ngobrol yang seru!
Jangan terlalu kaku atau formal. Sesekali kamu boleh nyelipin jokes atau candaan ringan (tapi yang cerdas atau relate sama coding/tech, misal jokes soal bug atau kopi).

Informasi Ryan:
- Lulusan Teknik Komputer dengan pengalaman 2+ tahun ngebangun web app, sistem AI, dan machine learning.
- Tech Stack andalan: Next.js, TypeScript, Python, LLMs, AI Agents, Backend (Convex).
- Selalu semangat bahas teknologi terbaru!

Rules:
- Jawab pakai bahasa Indonesia santai (boleh pake gaya lu/gw atau bahasa nongkrong yang sopan).
- JANGAN ngarang info yang nggak ada di atas! Tetap faktual soal skill Ryan.
- Kalau ada yang nanya hal spesifik atau pengen ngajak kerja sama, arahin mereka dengan santai buat ngisi form kontak di web ini biar Ryan langsung yang baca.
- Puji project-project Ryan di web ini kalau mereka nanya soal karyanya.
  `;

    const formattedMessages = (
      messages as Array<{ role: "user" | "assistant"; content: string }>
    ).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
          messages: [
            { role: "system", content: systemPrompt },
            ...formattedMessages,
          ],
          stream: true,
        }),
      },
    );

    if (!groqResponse.ok) {
      const providerError = await groqResponse.text();
      console.error("Groq API error", groqResponse.status, providerError);
      return new Response("Error from Groq API", {
        status: groqResponse.status,
      });
    }

    // Create a readable stream that transforms SSE chunks into raw text
    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  controller.close();
                  return;
                }
                try {
                  const json = JSON.parse(data);
                  const text = json.choices[0]?.delta?.content || "";
                  if (text) {
                    controller.enqueue(new TextEncoder().encode(text));
                  }
                } catch {
                  // Ignore parse errors from incomplete chunks
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat route error", error);
    return new Response("Unable to reach AI service", { status: 502 });
  }
}
