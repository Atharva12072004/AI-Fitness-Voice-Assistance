// const publicKey = '8ad9baae-e280-4cb9-a87a-c0823f5b8641';
//             const assistantId = '60ee31ba-31f8-46ce-8482-e4b4b2a0d611';

document.addEventListener("DOMContentLoaded", () => {
  const widget     = document.querySelector("#fitness-widget");
  const transcript = document.querySelector("#transcript");
  const toggleBtn  = document.querySelector("#toggleBtn");
  let sessionActive = false;

  function appendLine(text, cls) {
    const div = document.createElement("div");
    div.textContent = text;
    div.classList.add(cls);
    transcript.appendChild(div);
    transcript.scrollTop = transcript.scrollHeight;
  }

  // 1) Listen for AI & user messages
  widget.addEventListener("message", evt => {
    if (!sessionActive) return;
    const { role, text } = evt.detail;
    if (role === "assistant") appendLine(`Coach: ${text}`, "assistant");
    else if (role === "user") appendLine(`You: ${text}`, "user");
  });

  // 2) Session start/end markers (fired by the widget itself)
  widget.addEventListener("call-start", () => {
    if (!sessionActive) return;
    appendLine("🔊 Session started. Speak now…", "system");
  });
  widget.addEventListener("call-end", () => {
    if (!sessionActive) return;
    appendLine("⏹️ Session ended.", "system");
  });

  // 3) Our Start/End button only dispatches the widget events
  toggleBtn.addEventListener("click", () => {
    if (!sessionActive) {
      sessionActive = true;
      toggleBtn.textContent = "End Session";
      toggleBtn.classList.add("end");
      widget.dispatchEvent(new CustomEvent("call-start"));
    } else {
      widget.dispatchEvent(new CustomEvent("call-end"));
      sessionActive = false;
      toggleBtn.textContent = "Start Session";
      toggleBtn.classList.remove("end");
    }
  });
});
