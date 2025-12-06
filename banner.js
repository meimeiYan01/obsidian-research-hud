//请复制下方的代码块内容放入 Obsidian 的 `dataviewjs` 块中。

```javascript
// --- 科研主页 Banner (V2.5 全时空同步版) ---

// 1. [配置区]
const config = {
    username: "Researcher", 
    mottos: [
        "Stay hungry, stay foolish. 🧬",
        "Talk is cheap. Show me the code. 💻",
        "Research is creating new knowledge. 🧪",
        "The best way to predict the future is to create it. 🚀",
        "Keep pushing. The breakthrough is near. 🔥"
    ]
};

// 定义不同时段的主题
const themes = {
    morning: {
        image: "[https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200](https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200)", 
        gradient: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
        overlay: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
        icon: "🌥️", greeting: "Good Morning"
    },
    afternoon: {
        image: "[https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200](https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200)",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        overlay: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
        icon: "☀️", greeting: "Good Afternoon"
    },
    evening: {
        image: "[https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200](https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&q=85&fm=jpg&w=1200)",
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        overlay: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
        icon: "🌙", greeting: "Good Evening"
    }
};

// 2. 核心逻辑
const now = moment();
const hour = now.hour();

const startOfYear = moment().startOf('year');
const endOfYear = moment().endOf('year');
const yearProgress = ((now - startOfYear) / (endOfYear - startOfYear)) * 100;
const yearProgressStr = yearProgress.toFixed(1) + "%"; 

let theme = themes.evening;
if (hour >= 5 && hour < 12) theme = themes.morning;
else if (hour >= 12 && hour < 18) theme = themes.afternoon;

const randomMotto = config.mottos[Math.floor(Math.random() * config.mottos.length)];
const clockId = "xyan-clock-" + Math.floor(Math.random() * 10000);

// 3. 样式构建
const containerStyle = "position: relative; width: 100%; height: 230px; border-radius: 20px; overflow: hidden; margin-bottom: 25px; box-shadow: 0 8px 30px rgba(0,0,0,0.25); font-family: 'Segoe UI', Roboto, sans-serif; background-color: #222; display: block !important;";
const bgStyle = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: " + theme.overlay + ", " + theme.gradient + ", url('" + theme.image + "'); background-blend-mode: overlay; background-size: cover; background-position: center; z-index: 0; transition: all 1s ease;";
const contentStyle = "position: relative; z-index: 1; width: 100%; height: 100%; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; padding: 20px; text-align: center;";
const timeStyle = "color: rgba(255,255,255,0.95) !important; font-size: 3.5em; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1; margin-bottom: 5px; text-shadow: 0 4px 20px rgba(0,0,0,0.3); font-family: 'Menlo', 'Consolas', monospace !important; letter-spacing: -2px;";
const dateStyle = "color: rgba(255,255,255,0.85) !important; font-size: 1.1em; letter-spacing: 2px; font-weight: 700; margin-bottom: 12px; font-family: 'Segoe UI', sans-serif !important;";
const greetingStyle = "color: #ffffff !important; font-size: 1.2em; font-weight: 500; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);";
const mottoStyle = "color: rgba(255,255,255,0.9) !important; font-size: 0.9em; font-style: italic; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 15px; backdrop-filter: blur(4px);";
const progressContainerStyle = "position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: rgba(255,255,255,0.2); z-index: 2;";
const progressBarStyle = "height: 100%; width: " + yearProgress + "%; background: #fff; box-shadow: 0 0 10px rgba(255,255,255,0.8); border-radius: 0 2px 2px 0;";
const progressLabelStyle = "position: absolute; bottom: 8px; right: 15px; font-size: 0.7em; color: rgba(255,255,255,0.6); font-family: monospace; z-index: 2;";

// 4. 渲染输出
let html = "";
html += "<div style=\"" + containerStyle + "\">";
    html += "<div style=\"" + bgStyle + "\"></div>";
    html += "<div style=\"" + contentStyle + "\">";
        html += "<div id='" + clockId + "' style=\"" + timeStyle + "\">" + now.format("HH:mm") + "</div>";
        html += "<div style=\"" + dateStyle + "\">" + now.format("YYYY/MM/DD") + "&nbsp;&nbsp;<span style='opacity:0.7; font-weight:400;'>" + now.format("dddd") + "</span></div>";
        html += "<div style=\"" + greetingStyle + "\">" + theme.icon + " " + theme.greeting + ", " + config.username + "</div>";
        html += "<div style=\"" + mottoStyle + "\">" + randomMotto + "</div>";
    html += "</div>";
    html += "<div style=\"" + progressContainerStyle + "\"><div style=\"" + progressBarStyle + "\"></div></div>";
    html += "<div style=\"" + progressLabelStyle + "\">" + now.format("YYYY") + " Progress: " + yearProgressStr + "</div>";
html += "</div>";

dv.paragraph(html);

// 启动时钟
setTimeout(() => {
    const clockEl = document.getElementById(clockId);
    if (!clockEl) return;
    function updateClock() {
        if (!document.body.contains(clockEl)) { clearInterval(timer); return; }
        clockEl.innerText = moment().format("HH:mm:ss");
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
}, 100);
```