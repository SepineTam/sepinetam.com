class PaperManager {
    constructor() {
        // 设置自己的名字，用于在作者列表中高亮显示
        this.selfName = "您的名字";  // 请修改为您的名字
        this.papers = [];
        this.yearFilter = document.getElementById('yearFilter');
        this.journalFilter = document.getElementById('journalFilter');
        this.authorFilter = document.getElementById('authorFilter'); // 新增
        this.paperList = document.getElementById('paperList');

        // 绑定事件监听器
        this.yearFilter.addEventListener('change', () => this.filterPapers());
        this.journalFilter.addEventListener('change', () => this.filterPapers());
        this.authorFilter.addEventListener('change', () => this.filterPapers()); // 新增
    }

    async loadPapers() {
        try {
            const response = await fetch('../src/data/paper.csv');
            const csvText = await response.text();
            this.papers = this.parseCSV(csvText);
            this.updateFilterOptions();
            this.renderPapers();
        } catch (error) {
            console.error('加载论文数据失败:', error);
            this.paperList.innerHTML = '<div class="error">加载数据失败，请稍后重试</div>';
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());

        return lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
                const values = line.split(',').map(value => value.trim());
                const paper = {};
                headers.forEach((header, index) => {
                    paper[header] = values[index];
                });
                // 将作者字符串转换为数组
                if (paper.authors) {
                    paper.authorsList = paper.authors.split(';').map(author => author.trim());
                }
                return paper;
            });
    }

    updateFilterOptions() {
        // 更新年份筛选器
        const years = [...new Set(this.papers.map(paper => paper.year))].sort().reverse();
        this.yearFilter.innerHTML = '<option value="all">所有年份</option>' +
            years.map(year => `<option value="${year}">${year}</option>`).join('');

        // 更新期刊筛选器
        const journals = [...new Set(this.papers.map(paper => paper.journal))].sort();
        this.journalFilter.innerHTML = '<option value="all">所有期刊</option>' +
            journals.map(journal => `<option value="${journal}">${journal}</option>`).join('');

        // 更新作者筛选器（新增）
        const authors = [...new Set(this.papers.flatMap(paper => paper.authorsList))].sort();
        this.authorFilter.innerHTML = '<option value="all">所有作者</option>' +
            authors.map(author => `<option value="${author}">${author}</option>`).join('');
    }

    formatAuthors(authorsList) {
        return authorsList.map(author => {
            const isSelf = author === this.selfName;
            return `<span class="author ${isSelf ? 'self' : ''}">${author}</span>`;
        }).join(', ');
    }

    filterPapers() {
        const selectedYear = this.yearFilter.value;
        const selectedJournal = this.journalFilter.value;
        const selectedAuthor = this.authorFilter.value; // 新增

        const filteredPapers = this.papers.filter(paper => {
            const yearMatch = selectedYear === 'all' || paper.year === selectedYear;
            const journalMatch = selectedJournal === 'all' || paper.journal === selectedJournal;
            const authorMatch = selectedAuthor === 'all' || paper.authorsList.includes(selectedAuthor); // 新增
            return yearMatch && journalMatch && authorMatch;
        });

        this.renderPapers(filteredPapers);
    }

    renderPapers(papersToRender = this.papers) {
        if (!papersToRender.length) {
            this.paperList.innerHTML = '<div class="no-papers">没有找到符合条件的论文</div>';
            return;
        }

        this.paperList.innerHTML = papersToRender.map(paper => `
            <div class="paper-item">
                <div class="paper-title">${paper.title}</div>
                <div class="paper-authors">
                    ${this.formatAuthors(paper.authorsList)}
                </div>
                <div class="paper-meta">
                    发表于 ${paper.journal} (${paper.year})
                </div>
                <div class="paper-citation">${paper.citation}</div>
            </div>
        `).join('');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new PaperManager();
    manager.loadPapers();
});
