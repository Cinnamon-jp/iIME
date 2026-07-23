// content3.js
window.convertKanaToKanji = async function(kanaText) {
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
     return data.convertedText || data.converted_text || kanaText;
    } catch (error) {
    console.error("Python サーバー通信エラー:", error);

    return kanaText;
  }
}