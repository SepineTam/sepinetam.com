document.addEventListener("DOMContentLoaded", function () {
    // 处理作者显示
    const authorContainer = document.querySelector('.author');
    if (authorContainer) {
        const authors = Array.from(authorContainer.querySelectorAll('li')).map(li => li.textContent.trim());
        authorContainer.innerHTML = authors.length > 1 ? authors.join(', ') : authors[0] || '';
    }

    // 处理 paper-item
    const paperItems = document.querySelectorAll(".paper-item");

    if (paperItems.length === 0) return;

    // 创建表格结构
    const table = document.createElement("table");
    table.classList.add("paper-table");

    // 创建表头
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Status", "Date", "Download"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 创建表格主体
    const tbody = document.createElement("tbody");

    paperItems.forEach((item, index) => {
        const row = document.createElement("tr");

        // 获取时间数据
        const dateSpan = item.querySelector("[data-date]");
        const dateValue = dateSpan.getAttribute("data-date") || "";

        // 第一列：状态（New 或 Update）
        const statusCell = document.createElement("td");
        statusCell.textContent = index === 0 ? "New" : "Update";
        row.appendChild(statusCell);

        // 第二列：时间（包括 New 的时间）
        const dateCell = document.createElement("td");
        dateCell.textContent = dateValue;
        row.appendChild(dateCell);

        // 第三列：下载按钮
        const downloadCell = document.createElement("td");
        const downloadLink = item.querySelector(".download a");
        if (downloadLink) {
            const fileName = downloadLink.getAttribute("href");
            if (fileName) {
                downloadLink.textContent = "Download";
                downloadLink.classList.add("download-btn");
            }
            downloadCell.appendChild(downloadLink.cloneNode(true));
        }
        row.appendChild(downloadCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // 替换 paper-item 容器为表格
    const paperDiv = document.querySelector(".paper-div");
    if (paperDiv) {
        paperDiv.innerHTML = ""; // 清空原来的 .paper-div
        paperDiv.appendChild(table);
    }
});
