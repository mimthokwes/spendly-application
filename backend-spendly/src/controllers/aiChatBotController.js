import fetch from "node-fetch";

// Fungsi helper untuk menunggu jeda (delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const aiChatBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const AI_API_KEY = process.env.AI_API_KEY;
    const MAX_RETRIES = 30; // berapa kali mencoba ulang
    const MODEL = "gemini-2.5-flash";

    let aiReply = null;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`🤖 Mencoba hubungi AI (percobaan ke-${attempt})...`);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": AI_API_KEY,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: message }],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (aiReply) {
          console.log(`✅ Berhasil dapat respons AI pada percobaan ke-${attempt}`);
          break; // keluar dari loop kalau sudah berhasil
        } else {
          console.warn(`⚠️ Tidak ada respons AI pada percobaan ke-${attempt}`);
          lastError = "AI tidak memberikan respons.";
        }

      } catch (err) {
        console.error(`❌ Error pada percobaan ke-${attempt}:`, err.message);
        lastError = err.message;
      }

      // Jika belum berhasil, tunggu 2 detik sebelum mencoba ulang
      if (attempt < MAX_RETRIES) {
        await delay(2000);
      }
    }

    // Jika setelah semua percobaan masih gagal
    if (!aiReply) {
      aiReply = "Maaf, AI lambat merespons :(";
    }

    res.status(200).json({
      success: !!aiReply,
      reply: aiReply,
      error: lastError,
    });

  } catch (error) {
    console.error("🔥 AI Fatal Error:", error);
    res.status(500).json({ success: false, error: "Gagal menghubungi AI sepenuhnya." });
  }
};
