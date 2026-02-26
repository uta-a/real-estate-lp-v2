// プログレッシブエンハンスメント: details/summary はJSなしでも動作する
// JSが有効な場合のみ、滑らかなアニメーションを追加
document.querySelectorAll("details").forEach((details) => {
  const content = details.querySelector(".accordion-content");
  if (!content) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  details.addEventListener("toggle", () => {
    if (details.open) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
    }
  });

  const summary = details.querySelector("summary");
  if (!summary) return;

  summary.addEventListener("click", (e) => {
    if (details.open) {
      e.preventDefault();
      content.style.maxHeight = "0";
      content.style.opacity = "0";

      content.addEventListener(
        "transitionend",
        () => {
          details.removeAttribute("open");
          content.style.maxHeight = "";
          content.style.opacity = "";
        },
        { once: true }
      );
    }
  });

  // 初期状態: 閉じている場合のスタイル設定
  if (!details.open) {
    content.style.maxHeight = "0";
    content.style.opacity = "0";
  }

  content.style.overflow = "hidden";
  content.style.transition = "max-height 300ms ease-out, opacity 300ms ease-out";
});
