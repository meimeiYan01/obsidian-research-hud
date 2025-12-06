//请复制下方的代码块内容放入 Obsidian 的 `dataviewjs` 块中。

```javascript
// --- 科研项目看板 (V5.6 垂直滚动优化版) ---

// 1. [配置区]
const projects = [
    { id: "p1", path: "课题组/研究方向A", doc: "Project_A_Index", name: "Transformer 优化" },
    { id: "p2", path: "课题组/研究方向B", doc: "Project_B_Index", name: "对比实验" }
];

const STALE_DAYS = 14; 
const LIST_MAX_HEIGHT = "380px"; 

const palette = {
    design: "#D99E68", sim: "#6B9AC4", done: "#7FB088", 
    high: "#D66F6F", drop: "#A0AEC0", stale: "#8D6E63", 
    time: "var(--text-muted)", subTime:"var(--text-faint)"
};

// 2. 核心逻辑
function createLink(text, targetDoc) {
    return "<a class='internal-link' href='" + targetDoc + "' style='text-decoration:none; color:inherit; font-weight:bold; border-bottom: 2px solid " + palette.drop + "30; transition:opacity 0.2s;'>" + text + " <span style='font-size:0.8em; opacity:0.5;'>🔗</span></a>";
}

function getPriorityLevel(p) {
    if (p === "high" || p === 3) return 3;
    if (p === "medium" || p === 2) return 2;
    if (p === "low" || p === 1) return 1;
    return 0;
}

function renderCardList(rootPath, keyword, sectionTitle, themeColor, type, showEmptyPlaceholder) {
    if (showEmptyPlaceholder === undefined) showEmptyPlaceholder = true;

    let pages = dv.pages('"' + rootPath + '"');
    let files = pages.filter(p => p.file.path.includes(keyword));

    files = files.sort(p => {
        let weight = getPriorityLevel(p.priority) * 10000000000000; 
        return weight + p.file.mtime.ts;
    }, "desc");
    
    if (type === "active") files = files.filter(f => (!f.status || (f.status !== 'done' && f.status !== 'drop')));
    else if (type === "archive") files = files.filter(f => f.status === 'done');
    else if (type === "drop") files = files.filter(f => f.status === 'drop');
    
    if (files.length === 0 && !showEmptyPlaceholder) return "";

    let cardsHtml = "";
    if (files.length > 0) {
        for (let f of files) {
            let status = f.status || "Doing";
            let pLevel = getPriorityLevel(f.priority);
            let isHigh = pLevel >= 3; 
            
            let fireStr = "";
            if (pLevel === 3) fireStr = "🔥🔥🔥 ";
            else if (pLevel === 2) fireStr = "🔥🔥 ";
            else if (pLevel === 1) fireStr = "🔥 ";

            let now = dv.date("now");
            let mtime = f.file.mtime;
            let diffDays = mtime.diff(now, 'days').days * -1;
            let relativeTime = mtime.toRelative();
            let absoluteTime = mtime.toFormat("yyyy-MM-dd HH:mm:ss");
            let isStale = (type === "active" && diffDays > STALE_DAYS);
            
            let cardStyle = "background:var(--background-primary); border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px; margin-bottom:10px; box-shadow:0 1px 2px rgba(0,0,0,0.05); flex: 1 1 300px; transition: opacity 0.3s;";
            if (isHigh && type === "active") cardStyle += " background: linear-gradient(to right, " + palette.high + "15, var(--background-primary)); border-color:" + palette.high + "40;";
            if (type === "archive") cardStyle += " opacity: 0.85; border-style: dashed;";
            if (type === "drop") cardStyle += " opacity: 0.6; background: transparent;";
            if (isStale) cardStyle += " opacity: 0.6; filter: grayscale(0.5); border-color: " + palette.stale + ";";

            let badgeBg = themeColor + "20"; let badgeColor = themeColor;
            let statusIcon = ""; let fileIcon = "📄"; 
            if (status === 'done') { statusIcon = "✅ "; badgeBg = palette.done + "20"; badgeColor = palette.done; fireStr = ""; }
            else if (status === 'drop') { statusIcon = "🗑️ "; badgeBg = palette.drop + "20"; badgeColor = palette.drop; fireStr = ""; }
            else if (isStale) { statusIcon = "💤 "; badgeBg = palette.stale + "20"; badgeColor = palette.stale; fileIcon = "🕸️"; fireStr = ""; }

            let linkBtnBg = themeColor + "10";
            if (type === 'drop') linkBtnBg = "transparent";
            let linkStyle = "display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:" + linkBtnBg + "; border-radius:6px; text-decoration:none !important; color:var(--text-normal); margin: 8px 0; border:1px solid transparent; transition:all 0.2s;";
            if (isHigh && type === "active") linkStyle += " border:1px solid " + palette.high + "60;"; 
            let textDecor = (type === 'drop') ? "text-decoration:line-through !important; opacity:0.7;" : "";

            let taskHtml = "";
            let tasks = f.file.tasks;
            if (tasks.length > 0) {
                let completed = tasks.filter(t => t.completed).length;
                let total = tasks.length;
                let percent = Math.round((completed / total) * 100);
                let barColor = (percent === 100) ? palette.done : (isStale ? palette.stale : themeColor);
                if (isHigh && percent < 100) barColor = palette.high;
                taskHtml += "<div style='display:flex; align-items:center; font-size:0.7em; color:var(--text-muted); margin-top:8px;'><div style='flex:1; height:3px; background:var(--background-modifier-border); border-radius:2px; margin-right:8px; overflow:hidden;'><div style='width:" + percent + "%; height:100%; background:" + barColor + ";'></div></div><span>" + percent + "%</span></div>";
            }

            cardsHtml += "<div style='" + cardStyle + "'><div style='display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;'><div style='padding-top:2px;'><span style='font-size:0.7em; padding:2px 8px; border-radius:12px; font-weight:600; background:" + badgeBg + "; color:" + badgeColor + "; display:inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.05);'>" + fireStr + statusIcon + status.toUpperCase() + "</span></div><div style='text-align:right; line-height:1.2;'><div style='font-size:0.75em; color:" + palette.time + "; font-weight:600;'>" + relativeTime + "</div><div style='font-size:0.6em; color:" + palette.subTime + "; font-family:Menlo, Consolas, monospace; letter-spacing:0.5px; opacity:0.8;'>" + absoluteTime + "</div></div></div><a href='" + f.file.path + "' class='internal-link' style='" + linkStyle + "'><div style='display:flex; align-items:center; overflow:hidden;'><span style='font-size:1.1em; margin-right:8px; opacity:0.8;'>" + fileIcon + "</span><span style='font-weight:600; font-size:0.95em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; " + textDecor + "'>" + f.file.name + "</span></div><span style='color:" + themeColor + "; opacity:0.6; font-size:1.1em; font-weight:bold;'>⇲</span></a>" + taskHtml + "</div>"; 
        }
    } else {
        cardsHtml = "<div style='padding:15px; text-align:center; color:var(--text-muted); opacity:0.5; font-size:0.8em; border:1px dashed var(--background-modifier-border); border-radius:8px;'>Empty List</div>";
    }

    let titleHtml = "";
    if (sectionTitle) {
        titleHtml = "<div style='margin-bottom:12px; display:flex; align-items:center; gap:8px;'><div style='width:4px; height:16px; background:" + themeColor + "; border-radius:2px;'></div><div style='font-weight:600; color:" + themeColor + "; white-space:nowrap;'>" + sectionTitle + "</div></div>";
    }
    let scrollContainer = "<div style='max-height:" + LIST_MAX_HEIGHT + "; overflow-y:auto; overflow-x:hidden; padding-right:5px; margin-right:-5px;'>" + cardsHtml + "</div>";
    let containerStyle = (type === 'active') ? "margin-bottom:20px;" : "margin-bottom:20px; flex: 1 1 45%; min-width: 300px;";
    return "<div style='" + containerStyle + "'>" + titleHtml + scrollContainer + "</div>";
}

// 3. 布局组装
const colStyle = "flex:1; background:var(--background-secondary); padding:15px; border-radius:12px; border:1px solid var(--background-modifier-border); min-width: 300px;"; 

let leftColContent = ""; let rightColContent = "";
for (let p of projects) {
    leftColContent += renderCardList(p.path, "方案", createLink("📐 方案 · " + p.name, p.doc), palette.design, "active");
    rightColContent += renderCardList(p.path, "仿真", createLink("🧪 仿真 · " + p.name, p.doc), palette.sim, "active");
}

let mainBoard = "<div style='display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; width:100%;'><div style='" + colStyle + "'>" + leftColContent + "</div><div style='" + colStyle + "'>" + rightColContent + "</div></div>";

let archiveBlocks = "";
for (let p of projects) {
    archiveBlocks += renderCardList(p.path, "方案", "📐 方案成果 · " + p.name, palette.done, "archive", false);
    archiveBlocks += renderCardList(p.path, "仿真", "🧪 仿真成果 · " + p.name, palette.done, "archive", false);
}
let archiveSection = "";
if (archiveBlocks !== "") {
    archiveSection = "<div style='margin-top:24px; padding:20px; border-radius:12px; border:1px solid var(--background-modifier-border); background:var(--background-secondary);'><h3 style='margin:0 0 15px 0; display:flex; align-items:center; gap:8px; color:" + palette.done + "'>🏆 成果收集箱</h3><div style='display:flex; gap:20px; flex-wrap:wrap;'>" + archiveBlocks + "</div></div>";
}

let dropBlocks = "";
for (let p of projects) {
    dropBlocks += renderCardList(p.path, "方案", "📐 方案废弃 · " + p.name, palette.drop, "drop", false);
    dropBlocks += renderCardList(p.path, "仿真", "🧪 仿真废弃 · " + p.name, palette.drop, "drop", false);
}
let dropSection = "";
if (dropBlocks !== "") {
    dropSection = "<div style='margin-top:24px; padding:20px; border-radius:12px; border:1px dashed var(--background-modifier-border); opacity:0.7; background:var(--background-primary);'><h3 style='margin:0 0 15px 0; display:flex; align-items:center; gap:8px; color:" + palette.drop + "'>🗑️ 废弃回收站</h3><div style='display:flex; gap:20px; flex-wrap:wrap;'>" + dropBlocks + "</div></div>";
}

dv.paragraph(mainBoard + archiveSection + dropSection);
```