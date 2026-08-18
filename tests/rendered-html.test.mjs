import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(new Request("http://localhost/"));
}

test("serves the StreamOne AI manager experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>StreamOne · Your Personal AI Manager<\/title>/);
  assert.match(html, /AI-Generated Demo/);
  assert.match(html, /Some descriptions may be inaccurate or contain errors/);
  assert.match(html, />Songs\s*<b>24<\/b>/);
  assert.match(html, />Dance\s*<b>8<\/b>/);
  assert.match(html, />Topics\s*<b>36<\/b>/);
  assert.match(html, /Your always-on growth loop/);
  assert.match(html, /Creator Growth/);
  assert.match(html, /Live Copilot/);
  assert.match(html, /James’s personal AI manager/);
  assert.match(html, /class="ai-signal"/);
  assert.match(html, /class="signal-core"/);
  assert.match(html, /class="signal-scan"/);
  assert.match(html, /node-session/);
  assert.match(html, /AI monitoring live signals/);
  assert.match(html, /Ask StreamOne AI/);
  assert.match(html, /data-chat-prompt/);
  assert.match(html, /sendChat\(/);
  assert.match(html, /Upgrade what viewers see and hear/);
  assert.match(html, /Lighting/);
  assert.match(html, /Camera Makeup/);
  assert.match(html, /Background/);
  assert.match(html, /Audio Quality/);
  assert.match(html, /growthModules/);
  assert.match(html, /CREATOR MISSIONS · WEEK 4/);
  assert.match(html, /Turn every small win into visible growth/);
  assert.match(html, /id="missionClaimReward"/);
  assert.match(html, /missionXpValue/);
  assert.match(html, /AI Deep Review/);
  assert.match(html, /Join Official Community/);
  assert.match(html, /StreamOne Official Creator Community/);
  assert.match(html, /id="communityModal"/);
  assert.match(html, /id="communityJoinButton"/);
  assert.match(html, /id="voiceCoach"/);
  assert.match(html, /id="voiceToggle"/);
  assert.match(html, /id="voiceTranscript"/);
  assert.match(html, /id="voiceGuidance"/);
  assert.match(html, /SpeechRecognition/);
  assert.match(html, /getVoiceAdvice/);
  assert.match(html, /Microphone access is active only while listening/);
  assert.match(html, /Summer Jazz Medley/);
  assert.match(html, /A stranger who made your day/);
  assert.match(html, /Commenting on another creator’s income/);
  assert.match(html, /id="languageSelect"/);
  assert.match(html, /<option value="zh">中文<\/option>/);
  assert.match(html, /<option value="ja">日本語<\/option>/);
  assert.match(html, /<option value="ko">한국어<\/option>/);
  assert.match(html, /<option value="id">Bahasa Indonesia<\/option>/);
  assert.match(html, /class="live-nudge glance-cue"/);
  assert.match(html, /Welcome the new viewers first\./);
  assert.doesNotMatch(html, /Room Sentiment/);
  assert.doesNotMatch(html, /Ranked by urgency/);
  assert.match(html, /app\/i18n\.js/);
  assert.doesNotMatch(html, /MuseCast/);
});

test("serves the five-language localization runtime", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("i18n", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(new Request("http://localhost/app/i18n.js"));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/javascript/i);
  const source = await response.text();
  assert.doesNotThrow(() => new Function(source));
  assert.match(source, /あなた専属のAIマネージャー/);
  assert.match(source, /나만의 AI 매니저/);
  assert.match(source, /主播的 AI 经纪人/);
  assert.match(source, /官方主播社群/);
  assert.match(source, /公式クリエイターコミュニティ/);
  assert.match(source, /공식 크리에이터 커뮤니티/);
  assert.match(source, /Manajer AI Pribadi Anda/);
  assert.match(source, /Sapa penonton baru terlebih dahulu/);
  assert.match(source, /speech: "id-ID"/);
  assert.match(source, /zh-CN/);
  assert.match(source, /このページはAIによって生成されたデモです/);
  assert.match(source, /이 페이지는 AI가 생성한 데모/);
  assert.match(source, /streamone:languagechange/);
  assert.match(source, /localStorage\.setItem\("streamone-language"/);
});

test("loads the page interaction runtime without syntax errors", async () => {
  const source = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const inlineScripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  assert.ok(inlineScripts.length > 0);
  for (const script of inlineScripts) assert.doesNotThrow(() => new Function(script));
  assert.match(source, /document\.querySelectorAll\('\[data-target\]'\)/);
  assert.match(source, /function go\(t\)/);
});

test("every visible button has an interaction contract", async () => {
  const source = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const staticHtml = source.replace(/<script[\s\S]*?<\/script>/gi, "");
  const buttons = [...staticHtml.matchAll(/<button\b([^>]*)>/gi)].map((match) => match[1]);
  const knownIds = new Set([
    "agentMenuButton", "globalSearchButton", "noticeButton", "voiceToggle",
    "addAsset", "newChatButton", "attachButton", "mentionButton",
    "sendChatButton", "markReadButton", "startGrowthTask", "actionPrimary",
    "actionSecondary", "missionClaimReward", "communityJoinButton",
  ]);
  const contractAttributes = [
    "data-target", "data-go", "data-toast", "data-modal", "data-chat-open",
    "data-chat-prompt", "data-growth-module", "data-library",
  ];
  const contractClasses = new Set(["modal-close", "chat-close", "utility-close", "cue-done"]);
  const deadButtons = buttons.filter((attrs) => {
    if (contractAttributes.some((name) => new RegExp(`\\b${name}(?:=|\\s|$)`).test(attrs))) return false;
    const id = attrs.match(/\bid="([^"]+)"/)?.[1];
    if (id && knownIds.has(id)) return false;
    const classes = (attrs.match(/\bclass="([^"]+)"/)?.[1] ?? "").split(/\s+/);
    return !classes.some((name) => contractClasses.has(name));
  });
  assert.deepEqual(deadButtons, []);

  const toastActions = [...staticHtml.matchAll(/data-toast="([^"]+)"/g)].map((match) => match[1]);
  for (const action of toastActions) {
    assert.match(source, new RegExp(`${action.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}'?:button=>`));
  }
  const ids = new Set([...staticHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const attribute of ["data-target", "data-go"]) {
    for (const target of [...staticHtml.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1])) {
      assert.ok(ids.has(target), `${attribute} points to missing section #${target}`);
    }
  }
  for (const modal of [...staticHtml.matchAll(/data-modal="([^"]+)"/g)].map((match) => match[1])) {
    assert.ok(ids.has(`${modal}Modal`), `data-modal points to missing #${modal}Modal`);
  }
  for (const library of [...staticHtml.matchAll(/data-library="([^"]+)"/g)].map((match) => match[1])) {
    assert.match(source, new RegExp(`${library}:\\{head:`));
  }
  assert.match(source, /const actionFlows=/);
  assert.match(source, /addAsset\.onclick=\(\)=>openAction/);
  assert.match(source, /event\.target\.closest\('\.cue-done'\)/);
});

test("builds a self-contained StreamOne HTML deliverable", async () => {
  const html = await readFile(
    new URL("../outputs/StreamOne.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<style>[\s\S]+<\/style>/);
  assert.match(html, /<script>[\s\S]+<\/script>/);
  assert.match(html, /StreamOne/);
  assert.match(html, /libraryData/);
  assert.match(html, /@keyframes signalCore/);
  assert.match(html, /@keyframes signalNode/);
  assert.match(html, /@keyframes signalFade/);
  assert.match(html, /@keyframes signalScan/);
  assert.match(html, /prefers-reduced-motion:reduce/);
  assert.match(html, /Large, glanceable type for live use/);
  assert.match(html, /live-strip strong\{font-size:15px\}/);
  assert.match(html, /message-bubble\{font-size:13px/);
  assert.match(html, /Real-time voice coaching/);
  assert.match(html, /English copy layout refinements/);
  assert.match(html, /Five-language switcher/);
  assert.match(html, /主播的 AI 经纪人/);
  assert.match(html, /<option value="zh">中文<\/option>/);
  assert.match(html, /<option value="id">Bahasa Indonesia<\/option>/);
  assert.match(html, /StreamOne Official Creator Community/);
  assert.match(html, /官方主播社群/);
  assert.match(html, /community-entry-button\{display:inline-flex;align-items:center;justify-content:center/);
  assert.match(html, /community-entry-button,.voice-entry-button\{flex:0 0 auto\}/);
  assert.match(html, /あなた専属のAIマネージャー/);
  assert.match(html, /나만의 AI 매니저/);
  assert.match(html, /Manajer AI Pribadi Anda/);
  assert.match(html, /Live glance mode: minimal information, maximum readability/);
  assert.match(html, /font-size:clamp\(40px,4\.2vw,64px\)!important/);
  assert.match(html, /voice-guidance strong\{display:block;margin:10px 0 8px;font-size:30px/);
  assert.doesNotMatch(html, /<script src="app\/i18n\.js"><\/script>/);
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet["']/i);
  assert.doesNotMatch(html, /MuseCast/);
});
