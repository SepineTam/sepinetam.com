document.addEventListener("DOMContentLoaded", function() {
    // 处理 new 和 update 的日期显示
    const newSpans = document.querySelectorAll('span.new');
    const updateSpans = document.querySelectorAll('span.update');

    newSpans.forEach(span => {
        const date = new Date(span.getAttribute('data-date'));
        span.textContent = `New: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    });

    updateSpans.forEach(span => {
        const date = new Date(span.getAttribute('data-date'));
        span.textContent = `Update: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    });

    // 处理 title 和 subtitle 的冒号显示
    const listItems = document.querySelectorAll('li');

    listItems.forEach(li => {
        const title = li.querySelector('.title');
        const subtitle = li.querySelector('.subtitle');

        // 如果 subtitle 存在，则在 title 后添加冒号
        if (subtitle) {
            title.textContent += ':';
        }
    });
});