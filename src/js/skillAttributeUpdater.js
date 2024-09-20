function updateSkillDataText() {
    // 获取所有class为"skill"的ul元素
    const skillLists = document.querySelectorAll('ul.skill');
    
    // 遍历每个skill列表
    skillLists.forEach(skillList => {
        // 获取列表中的所有li元素
        const skillItems = skillList.querySelectorAll('li');
        
        // 遍历每个li元素
        skillItems.forEach(item => {
            // 获取span元素的内容
            const spanContent = item.querySelector('span').textContent;
            // 更新data-text属性
            item.setAttribute('data-text', spanContent);
        });
    });
}

// 页面加载完成后执行函数
document.addEventListener('DOMContentLoaded', updateSkillDataText);
