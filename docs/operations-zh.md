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
git add data/profile.json assets/cv.pdf
git commit -m "Update publications and CV"
git push
```

如果你改了样式或页面结构，把对应文件也加入 `git add`。

## 最该先改的内容

1. 把 `data/profile.json` 里的研究方向改成你的真实方向。
2. 把 GitHub 头像换成正式照片：把照片保存为 `assets/profile.jpg`，然后把 `photo` 改成 `assets/profile.jpg`。
3. 上传 CV：保存为 `assets/cv.pdf`，然后把 CV 链接改成 `assets/cv.pdf`。
4. 替换 Google Scholar 和 ORCID 链接。
5. 加入 3 到 6 篇最能代表你的论文或预印本。

## 添加论文模板

在 `data/profile.json` 的 `publications` 数组中加入：

```json
{
  "title": "Paper Title",
  "authors": "Kunwa Wang, Coauthor Name",
  "venue": "Conference or Journal, 2026",
  "description": "一句话说明论文贡献。",
  "links": [
    { "label": "PDF", "url": "assets/paper.pdf" },
    { "label": "DOI", "url": "https://doi.org/..." },
    { "label": "Code", "url": "https://github.com/wangkunwlh/repo" }
  ]
}
```

## 添加项目模板

在 `projects` 数组中加入：

```json
{
  "title": "Project Name",
  "description": "一句话说明项目解决什么问题，以及当前状态。",
  "tags": ["Research", "Software"],
  "links": [
    { "label": "Repository", "url": "https://github.com/wangkunwlh/project" }
  ]
}
```

## 运营节奏建议

- 每次论文接收、预印本发布、代码开源时更新一次。
- 每学期至少更新一次 CV。
- 首页只放精选项目，不要把所有草稿实验都放上去。
- 保持联系方式稳定：邮箱、GitHub、Google Scholar、ORCID。
- 不要公开私人电话、住址、未公开合作材料或未获授权的论文 PDF。

## 未来升级方向

- 需要研究博客和引用管理：迁移到 Quarto。
- 需要更强视觉定制和多页面应用感：迁移到 Astro。
- 需要自定义域名：购买域名后，在 GitHub Pages 设置 custom domain，并在仓库根目录添加 `CNAME` 文件。
