# 网站维护指南

写给日常自己改内容用。跟着做就行，不需要写代码。

---

## 0. 先理解这台"机器"

- 网站是 **Jekyll 静态站**：把 Markdown / YAML / JSON 生成 HTML，没有数据库、没有后台。
- 托管在 **GitHub Pages**，仓库就是你电脑上的 `wangkunwlh.github.io` 文件夹。
- **发布 = git push**。推到 `main` 分支后，GitHub Actions 自动构建，一般 **2 分钟左右**上线。
- 你只需要：**改文件 → GitHub Desktop 提交 → Push**。

---

## 1. 日常发布流程（3 分钟）

1. 用任意编辑器改文件（推荐 VS Code；纯文本编辑也行）。
2. 打开 **GitHub Desktop**，左侧能看到改动的文件列表（Changes）。
3. 左下角 Summary 写一句人话，例如 `Add news: Nature Energy paper`。
4. 点 **Commit to main**。
5. 点 **Push origin**。
6. 等 ~2 分钟，浏览器 `⌘ + Shift + R` 强刷查看。

**发布失败了会怎样？** 线上不会挂——GitHub Pages 会保留上一个成功版本。到 GitHub 仓库的 **Actions** 标签，点红色 ✗ 那次运行看日志，最常见是 YAML 缩进或图片路径写错。

---

## 2. 文件地图：想改什么，去哪里

| 想改的内容 | 文件 |
|---|---|
| 首页自我介绍（正文段落） | `_pages/about.md` |
| 首屏小标签 / 一句话定位 | `_pages/about.md` 的 `eyebrow` / `subtitle` |
| 右侧"经历 / 学历"卡片 | `_pages/about.md` 的 `profile.side_details` |
| 右侧联系方式卡片 | `_pages/about.md` 的 `profile.more_info` |
| News（首页与 /blog/） | `_news/` 下新增 `.md` |
| 正式博客文章 | `_posts/` 下新增 `.md` |
| 论文列表（/publications/） | `_bibliography/papers.bib` |
| 首页"Recent publications"卡片 | `_data/recent_publications.json` |
| 研究方向卡片（/research/） | `_projects/*.md` |
| 研究方向的分类与子菜单 | `_pages/projects.md` |
| CV 页面 | `assets/json/resume.json` |
| 头像 | `assets/img/prof_pic.jpg` |
| 相册 | `_pages/gallery.md` |
| 邮箱 / 社交账号 | `_data/socials.yml` |
| 导航栏项目与顺序 | 各 `_pages/*.md` 里的 `nav` / `nav_order` |
| 全站配色、字体、间距 | `_sass/_components.scss` |
| 网站标题、URL、字体源 | `_config.yml` |

> ⚠️ `_sass/_themes.scss`、`_includes/cv/`、`_includes/hook/` 这些是主题自带的，尽量别动；你的自定义样式全部集中在 `_sass/_components.scss` 的末尾。

---

## 3. 常见操作（可直接复制模板）

### 3.1 改首页自我介绍

打开 `_pages/about.md`，找到 `---` 之间的配置之后的正文：

```html
<div class="home-intro">
  <p>第一段……</p>
  <p>第二段……</p>
  <p>Please see my <a href="/research/">research</a> …</p>
</div>
```

只改 `<p>` 里的文字即可。`<strong>` 用来加粗关键词。

### 3.2 改首屏那一行小字和定位句

```yaml
eyebrow: Postdoctoral Researcher · Ph.D.
subtitle: Elastocaloric cooling and sustainable thermal management
```

### 3.3 侧栏加一条经历 / 学历

`_pages/about.md` → `profile.side_details`：

```yaml
  side_details: |
    <div class="side-group">
      <h3>Experience</h3>
      <div class="side-item">
        <span class="side-when">2024 — present</span>
        <span class="side-what">Postdoctoral Researcher</span>
        <span class="side-where">KIT · Institute of Microstructure Technology</span>
      </div>
    </div>
```

**加一条**：复制整个 `<div class="side-item">…</div>` 粘在后面即可。
**加一组**（比如 Education）：复制整个 `<div class="side-group">…</div>`，改 `<h3>` 标题。
注意 YAML 里 `|` 后面的内容要整体**再多缩进两个空格**。

### 3.4 加一条 News

在 `_news/` 新建文件，文件名格式 `年_月_日_关键词.md`，例如 `_news/2026_11_06_new_paper.md`：

```markdown
---
layout: post
date: 2026-11-06 09:00:00+0100
inline: true
related_posts: false
---
Our paper, <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="external noopener">标题</a>, was published in <em>期刊名</em>.
```

`date` 决定排序，越新越靠前。

### 3.5 写一篇博客

`_posts/2026-11-06-my-post.md`：

```markdown
---
layout: post
title: My post title
date: 2026-11-06 09:00:00+0100
description: 一句话摘要，会显示在列表里。
tags: [research, notes]
---

正文用 Markdown 写，支持标题、列表、公式、图片。
```

图片在正文里这样引用：

```markdown
![说明文字]({{ '/assets/img/figures/my-figure.png' | relative_url }})
```

### 3.6 加一篇论文

**（a）论文列表页**：编辑 `_bibliography/papers.bib`，追加一条 BibTeX：

```bibtex
@article{wang2026newkey,
  title={论文标题},
  author={Wang, Kun and Kohl, Manfred and Xu, Jingyuan},
  journal={期刊名}, year={2026}, doi={10.1016/j.xxxxx},
  selected={true}, preview={journal-cover.jpg}
}
```

- `key` 必须唯一（习惯用 `作者+年份+关键词`）。
- `preview` 填 `assets/img/publication_preview/` 下的图片文件名。
- `selected={true}` 表示重点论文。

**（b）首页的论文卡片**是单独维护的，编辑 `_data/recent_publications.json`，在数组开头加：

```json
{
  "title": "论文标题",
  "authors": "Kun Wang, ...",
  "venue": "Nature Energy (2026)",
  "doi": "10.1038/xxxxx",
  "year": "2026",
  "image": "/assets/img/publication_figures/图.png",
  "alt": "图片说明（无障碍用）"
}
```

> 两边是分开的：`papers.bib` 管列表页，`recent_publications.json` 管首页卡片。

### 3.7 加 / 改研究方向卡片

`_projects/` 下每个 `.md` 就是一张卡片：

```markdown
---
layout: page
title: Elastocaloric materials
description: 一句话描述，显示在卡片上。
img: /assets/img/某张图.jpg
importance: 4
category: materials
---
这里写详细页的正文（点进卡片后看到的内容）。
```

**新增一个分类**：打开 `_pages/projects.md`，两处都要改：

```yaml
display_categories: [devices, modeling, materials, 新分类]
submenu:
  - title: Devices
    anchor: devices
```

`category` 的值必须出现在 `display_categories` 里，否则卡片不会显示。

### 3.8 更新 CV 页

`/cv/` 读的是 `assets/json/resume.json`（不是 `_data/`）。结构：

```json
{
  "basics": {"name": "...", "label": "...", "email": "...", "summary": "..."},
  "work":     [{"name": "单位", "position": "职位", "location": "城市", "startDate": "2024-03-01", "summary": "说明"}],
  "education":[{"institution": "学校", "area": "专业", "studyType": "Ph.D.", "startDate": "2020-12-01", "endDate": "2023-11-30"}],
  "talks":    [{"date": "2026", "event": "会议", "title": "报告题目", "kind": "Contributed talk"}]
}
```

加一条就复制一个 `{...}` 对象。日期用 `YYYY-MM-DD` 或 `YYYY`。

### 3.9 换头像

把新图片命名为 `prof_pic.jpg`，覆盖 `assets/img/prof_pic.jpg` 即可（其它地方引用的是这个文件名）。
建议：正方形偏竖、宽度 ≥ 800px。

### 3.10 相册加照片

1. 图片放到 `assets/img/gallery/`。
2. 打开 `_pages/gallery.md`，在对应区块里加一行：

```html
<div class="col"><img class="img-fluid rounded" src="{{ '/assets/img/gallery/照片名.jpg' | relative_url }}" alt="说明"><p class="mt-2">图注文字</p></div>
```

### 3.11 改邮箱 / 社交链接

`_data/socials.yml`：

```yaml
email: kun.wang@kit.edu
scholar_userid: 2DVz9pgAAAAJ
orcid_id: 0000-0002-3202-1872
github_username: wangkunwlh
linkedin_username: kun-wang-wk8837
```

删掉哪一行，对应图标就不显示了。

### 3.12 导航栏增删项目

在任意 `_pages/*.md` 的配置里：

```yaml
nav: true
nav_order: 5      # 数字越小越靠左
```

改成 `nav: false` 就从导航里消失（页面本身还在）。

### 3.13 改配色

`_sass/_components.scss` 最上面的 `:root { ... }` 是**夜晚版**，`html[data-theme="light"] { ... }` 是**白天版**，改这两个块里的颜色变量即可：

```css
--accent: #6f9dff;   /* 强调色 */
--bg: #04060b;       /* 背景 */
--ink: #eef3fb;      /* 正文颜色 */
```

---

## 4. 图片规范

| 项目 | 建议 |
|---|---|
| 存放位置 | `assets/img/`（论文图可放子目录） |
| 命名 | 英文小写 + 连字符，例如 `woven-regenerator.jpg`；**不要有空格和中文** |
| 格式 | 照片用 JPG（质量 80），示意图/图表用 PNG 或 SVG |
| 尺寸 | 卡片图约 1600×1000（16:10）；照片宽度 ≥ 1400px |
| 体积 | 单张 < 500 KB，太大拖慢加载 |
| 自动处理 | 构建时会自动生成 480 / 800 / 1400 宽的响应式版本，无需自己切图 |

引用写法：

- 配置里（`img:`、`image:`）用绝对路径：`/assets/img/xxx.jpg`
- 正文/HTML 里用 Liquid：`{{ '/assets/img/xxx.jpg' | relative_url }}`

---

## 5. 容易踩的坑

1. **YAML 缩进**：只能空格，不能 Tab；同级缩进必须一致。
2. **front matter**：文件开头和结尾都要有 `---`，一个字符都不能少。
3. **大小写**：构建跑在 Linux 上，`Photo.JPG` 和 `photo.jpg` 是两张不同的文件。
4. **中文标点**：配置项里的冒号必须是英文 `:`，中文 `：` 会报错。
5. **别改主题文件**：`_includes/cv/`、`_includes/hook/`、`_sass/_themes.scss` 是插件自带的。
6. **缓存**：已处理——每次构建 CSS 地址都会变，正常刷新就能看到新版（实在不行 `⌘ + Shift + R`）。
7. **一次只改一类东西**：提交信息写清楚，出问题好回滚。

---

## 6. 改坏了怎么回滚

**方法一（推荐，GitHub Desktop）**
History 标签 → 右键出错的那个提交 → **Revert changes in commit** → Commit → Push。

**方法二（命令行）**

```bash
git revert <提交号>     # 生成一个反向提交
git push origin main
```

**回到大改版之前**：那次重构前的状态保存在标签 `backup-pre-redesign-2026-11-05` 和本地归档 `_backup/wangkunwlh.github.io-pre-redesign-*.tar.gz`。

---

## 7. 本地预览（可选）

想在发布前先看效果，需要在本机跑 Jekyll（当前电脑没装）：

```bash
# 需要 Ruby 3.x
bundle install
bundle exec jekyll serve --livereload   # 打开 http://127.0.0.1:4000
```

不想装环境的话，也可以直接推送到 GitHub，2 分钟后看线上；构建失败不会影响现有网站。

---

## 8. 一句话检查清单

发布前扫一眼：

- [ ] 新图片放进 `assets/img/`，文件名无空格
- [ ] 引用的图片路径大小写和实际文件一致
- [ ] YAML 缩进没乱、冒号是英文
- [ ] 新卡片/新分类的 `category` 已加进 `display_categories`
- [ ] Commit 信息能看懂
- [ ] Push 之后看了 Actions 是绿色 ✅
