# 🧬 Obsidian Research HUD (沉浸式科研主页系统)

> 一个专为科研人员打造的 Obsidian 动态主页系统。
>
> 集成全时空感知 Banner 与多维度项目管理看板，让科研进度一目了然。
>
> **还在面对杂乱无章的文献和无限延期的 ToDo 发愁吗？**
>
> 这是一个专为科研人员打造的 **Obsidian 动态主页系统**。它不仅仅是一个好看的 Banner，更是一套完整的**科研项目管理流**。 通过 DataviewJS 强力驱动，它能根据早晚时间自动切换氛围，帮你计算年度进度，自动标记“僵尸任务”，并用可视化的火焰 (🔥🔥🔥) 提醒你哪些课题最紧迫。 **拒绝摆烂，从拥有一个帅气的主页开始。**

---

## 🖼️ 效果预览 (Demo)

![cut1](https://github.com/meimeiYan01/obsidian-research-hud/blob/main/cut1.png?raw=true)



![cut2](https://github.com/meimeiYan01/obsidian-research-hud/blob/main/cut2.png?raw=true)

---

## ✨ 核心特性 (Features)

### 🌅 模块一：全时空动态 Banner

- **🌍 全时空同步**：背景色调与图片随真实时间（早/中/晚）自动切换，从清晨暖光到午夜星空。
  
- **⏱️ 动态时钟**：秒针级跳动的实时时钟，搭配严谨的 `YYYY/MM/DD` 日期格式。
  
- **⏳ 年度进度条**：可视化显示当年已逝去的时间百分比（如 `93.5%`），拒绝拖延。
  
- **🎲 随机格言**：每次刷新随机展示科研/励志格言，保持灵感新鲜。
  
- **🛡️ 主题防御**：内置深色底板与样式强制，在 Obsidian 浅色模式下依然保持美观。
  

### 📊 模块二：交互式科研看板

- **🔥 优先级可视化**：基于 `priority` 属性自动渲染火焰等级 (🔥🔥🔥)，高优任务强制置顶。
  
- **🕒 双时空记录**：同时显示“相对时间”（如 `2 hours ago`）与“绝对时间”，精准感知项目活跃度。
  
- **🕸️ 僵尸任务预警**：超过 14 天未修改的项目自动变灰并标记蜘蛛网，提醒填坑。
  
- **↕️ 垂直无限滚动**：支持局部滚动条，无论多少项目，看板高度始终固定，保持页面整洁。
  
- **📂 智能归档**：完成 (`done`) 或废弃 (`drop`) 的项目自动折叠进底部收纳箱。
  
- **🎨 强交互 UI**：按钮式卡片设计，支持点击跳转与悬停预览。
  

---

## 🚀 快速开始 (Quick Start)

### 1. 依赖插件

本系统完全基于 **Dataview** 插件构建。请确保你已安装并进行如下配置：

- 打开 `Settings` -> `Dataview`
  
- ✅ 开启 `Enable JavaScript Queries`
  
- ✅ 开启 `Enable Inline JavaScript Queries`
  

### 2. 安装代码

1. 在你的 Obsidian 仓库中新建一个笔记，例如 `Homepage.md`。
   
2. **Banner 部分**：复制 `banner.js` (或对应 Markdown 文件) 中的代码，放入一个 `dataviewjs` 代码块中。
   
3. **看板 部分**：复制 `dashboard.js` (或对应 Markdown 文件) 中的代码，放入另一个 `dataviewjs` 代码块中。

---

## ⚙️ 配置指南 (Configuration)

本系统设计为“**配置与逻辑分离**”，你无需懂编程，只需修改代码顶部的 `config` 区域。

### Banner 配置



```JavaScript
const config = {
    username: "Researcher", // 修改为你的名字
    // 格言库
    mottos: [
        "Stay hungry, stay foolish.",
        "Talk is cheap. Show me the code."
    ]
};
// 在 themes 对象中可修改不同时间段的背景图链接
```

### 看板项目绑定

找到看板代码中的 `projects` 数组，添加你的研究课题：



```JavaScript
const projects = [
    // path: 你的 Obsidian 文件夹路径 (必填)
    // doc: 点击标题跳转的主文档名称
    { id: "p1", path: "课题组/Transformer优化", doc: "Project_A_Index", name: "Transformer 改进" },
    { id: "p2", path: "课题组/对比实验", doc: "Project_B_Index", name: "对比实验" }
];
```

---

## 📝 笔记规范 (Usage)

为了让看板正确抓取并渲染样式，请在你的笔记头部添加以下 **YAML Frontmatter**：

YAML

```
---
status: doing      # 必填。可选值: doing (进行中) | done (完成) | drop (废弃)
priority: high     # 选填。可选值: high (🔥🔥🔥) | medium (🔥🔥) | low (🔥)
---
```

- **自动分类逻辑**：
  
    - 文件名包含 **"方案"** -> 自动进入左侧列。
      
    - 文件名包含 **"仿真"** -> 自动进入右侧列。
      

---

## 🤝 贡献与反馈 (Contributing)

如果你有更好的 UI 设计想法或功能建议，欢迎提交 Issue 或 Pull Request！

1. Fork 本仓库
   
2. 创建你的 Feature 分支 
   
3. 提交修改
   
4. 推送到分支 
   
5. 提交 Pull Request
   

---

## 📄 开源协议 (License)

本项目遵循 [MIT License](https://www.google.com/search?q=LICENSE) 开源协议。

---

> Created with ❤️ by xYan.

---

