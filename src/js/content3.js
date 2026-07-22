// content3.js
async function convertKanaToKanji(kanaText) {
  if (!kanaText) return "";

  try {
    // Pythonサーバー(localhost:8000)へリクエストを送信
    const response = await fetch("http://localhost:8000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: kanaText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.convertedText; // 変換された漢字テキストを返す
  } catch (error) {
    console.error("Python サーバー通信エラー:", error);
    return kanaText; // エラー時はひらがなのまま返す
  }
}