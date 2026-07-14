# 上线与运营维护指南

这是 `wangkunwlh.github.io` 个人学术网站的中文维护说明。当前方案是无构建依赖的静态网站：GitHub Pages 可以直接托管，不需要 Node、Ruby、Quarto 或 GitHub Actions。

## 为什么选择这个方案

- 简单：网页由 `index.html`、`styles.css`、`script.js` 和 `data/profile.json` 组成。
- 稳定：GitHub Pages 直接发布，不依赖额外构建流程。
- 易维护：日常更新主要改 `data/profile.json`。
- 可迁移：以后如果你想写学术博客、研究笔记或课程页面，可以迁移到 Quarto 或 Astro。

## 第一次上线

1. 打开 GitHub，新建一个 public repository。
2. 仓库名必须完全等于：

```text
wangkunwlh.github.io
```

3. 建议新仓库不要勾选自动创建 README，因为本地已经有完整文件。
4. 在本地运行：

```bash
cd /Users/wangkun/Documents/Codex/2026-07-13/ke/outputs/wangkunwlh.github.io
git remote add origin https://github.com/wangkunwlh/wangkunwlh.github.io.git
git push -u origin main
```

5. 几分钟后访问：

```text
https://wangkunwlh.github.io
```

如果页面没有出现，进入仓库的 Settings > Pages，确认 Source 是 `Deploy from a branch`，Branch 是 `main`，目录是 `/root`。

## 用 GitHub 网页直接修改

适合小更新，例如改简介、加论文、改链接。

1. 打开仓库 `wangkunwlh/wangkunwlh.github.io`。
2. 进入 `data/profile.json`。
3. 点击右上角编辑按钮。
4. 修改内容。
5. 页面底部选择 commit directly to `main`。
6. 等待 GitHub Pages 自动更新。

注意：`profile.json` 必须保持合法 JSON。常见错误是少逗号、多逗号、引号不配对。

## 本地修改并推送

适合一次改很多内容，或改样式。

```bash
cd /Users/wangkun/Documents/Codex/2026-07-13/ke/outputs/wangkunwlh.github.io
python3 -m http.server 8000
```

打开：

```text
http://127.0.0.1:8000
```

确认没问题后：

```bash
git status
git add data/profile.json index.html styles.css script.js assets/ docs/
git commit -m "Update website content and style"
git push
```

如果你改了样式或页面结构，把对应文件也加入 `git add`。

## 最该先改的内容

1. 把 `data/profile.json` 里的研究方向改成你的真实方向。
2. 把 GitHub 头像换成正式照片：把照片保存为 `assets/profile.jpg`，然后把 `photo` 改成 `assets/profile.jpg`。
3. 上传 CV：保存为 `assets/cv.pdf`，然后把 CV 链接改成 `assets/cv.pdf`。
4. 替换 Google Scholar、ORCID、ResearchGate、LinkedIn 链接。
5. 加入 3 到 6 篇最能代表你的论文或预印本。

## 用 ORCID 和 Google Scholar 更新内容

当前首页内容主要来自 `data/profile.json`。如果后续 ORCID 或 Google Scholar 更新了，可以同步改这些地方：

- `summary`：一句话研究简介，适合写研究对象、方法和应用方向。
- `facts`：affiliation、education、profile links 等短信息。
- `research`：3 个左右研究方向，每个方向一段话即可。
- `publications`：只放精选论文，不建议把所有论文都堆在首页。
- `experience`：工作经历，例如 postdoc、research assistant、visiting researcher。
- `actions` 和 `contact`：首页和联系区的图标链接。
- `publications.html`：完整论文列表、会议报告、期刊审稿等学术活动页面。

Google Scholar 的引用数会变化。如果你想在 `facts` 里写 citation/h-index，建议每隔几个月手动更新一次，并写清楚更新时间，例如 `as of July 2026`。

## 调整字体大小和排版

主要改 `styles.css`：

- 全站字体：改 `body` 里的 `font-family`、`font-size`、`line-height`。
- 大标题：改 `h1`。
- 分区标题：改 `h2`。
- 卡片标题：改 `h3`。
- 首页简介：改 `.lead`。
- 页面最大宽度：改 `:root` 里的 `--max`。
- 颜色：改 `:root` 里的 `--bg`、`--ink`、`--accent` 等变量。
- 分区上下间距：改 `.section` 和 `.section-tight`。

示例：

```css
h1 {
  font-size: clamp(3rem, 7vw, 6rem);
}

.lead {
  max-width: 62ch;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
}

.section {
  padding: clamp(4rem, 7vw, 7rem) 0;
}
```

`clamp(最小值, 响应值, 最大值)` 很适合响应式字体：手机不会太小，桌面不会太大。

## 添加论文模板

如果是首页精选论文，在 `data/profile.json` 的 `publications` 数组中加入：

```json
{
  "title": "Paper Title",
  "authors": "Kun Wang, Coauthor Name",
  "venue": "Conference or Journal, 2026",
  "description": "一句话说明论文贡献。",
  "links": [
    { "label": "PDF", "url": "assets/paper.pdf" },
    { "label": "DOI", "url": "https://doi.org/..." },
    { "label": "Code", "url": "https://github.com/wangkunwlh/repo" }
  ]
}
```

如果是完整论文列表、会议报告、期刊审稿等内容，直接修改 `publications.html`。首页保持简洁，完整记录放在独立页面。

## 添加图片

建议把图片放进 `assets/` 文件夹。文件名用英文小写和连字符，例如：

```text
assets/profile.jpg
assets/elastocaloric-regenerator.jpg
assets/lab-setup.jpg
```

更换头像：

```json
"photo": "assets/profile.jpg"
```

图片建议：

- 头像用正方形或接近正方形，至少 800px 宽。
- 不要上传太大的原图，单张图片最好压缩到 300KB 到 800KB。
- 不要上传未授权的论文图、合作项目内部图或含隐私信息的实验照片。

## 添加图标链接

首页和联系区的 logo 链接来自 `data/profile.json` 里的 `actions` 和 `contact`。模板：

```json
{
  "label": "LinkedIn",
  "url": "https://www.linkedin.com/in/kun-wang-wk8837/",
  "icon": "assets/icons/linkedin.svg"
}
```

当前已有图标：

```text
assets/icons/google-scholar.svg
assets/icons/orcid.svg
assets/icons/researchgate.svg
assets/icons/linkedin.svg
assets/icons/email.svg
```

## 添加或调整动画

当前网站已经有轻量的滚动出现动画：

- CSS 在 `styles.css` 的 `.reveal` 和 `.reveal.is-visible`。
- JS 在 `script.js` 的 `setupRevealAnimations()`。
- 系统开启“减少动态效果”时，动画会自动关闭。

如果想让动画更慢：

```css
.reveal {
  transition:
    opacity 800ms ease,
    transform 800ms ease;
}
```

如果想完全关闭动画，可以在 `script.js` 删除或注释这一行：

```js
setupRevealAnimations();
```

学术主页建议动画保持克制：轻微淡入、轻微上移即可，不建议使用强烈旋转、闪烁或大面积视差效果。

## 添加工作经历模板

在 `experience` 数组中加入：

```json
{
  "date": "2026 - Present",
  "title": "Position, Institution",
  "description": "一句话说明单位、研究所、导师或主要工作。"
}
```

## 运营节奏建议

- 每次论文接收、预印本发布、工作经历变化时更新一次。
- 每学期至少更新一次 CV。
- 首页保持简洁：精选论文和工作经历通常已经足够。
- 保持联系方式稳定：邮箱、Google Scholar、ORCID、ResearchGate、LinkedIn。
- 不要公开私人电话、住址、未公开合作材料或未获授权的论文 PDF。

## 未来升级方向

- 需要研究博客和引用管理：迁移到 Quarto。
- 需要更强视觉定制和多页面应用感：迁移到 Astro。
- 需要自定义域名：购买域名后，在 GitHub Pages 设置 custom domain，并在仓库根目录添加 `CNAME` 文件。
