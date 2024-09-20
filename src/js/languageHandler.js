document.addEventListener('DOMContentLoaded', function() {
    const lang = document.documentElement.lang.toLowerCase();
    const skillLists = document.querySelectorAll('.skill');
    
    if (skillLists.length > 0) {
        let label;
        
        if (['zh', 'zh-cn', 'zh-tw', 'zh-hk', 'cn', 'chi', 'zho'].includes(lang)) {
            label = '技能：';
        } else if (['en', 'en-us', 'en-gb', 'en-au', 'eng', 'english'].includes(lang)) {
            label = 'Skills:';
        } else if (['es', 'es-es', 'es-419', 'spa', 'spanish'].includes(lang)) {
            label = 'Habilidades:';
        } else {
            label = '技能：'; // 默认使用英文
        }
        
        skillLists.forEach(skillList => {
            skillList.setAttribute('data-label', label);
        });
    }
});