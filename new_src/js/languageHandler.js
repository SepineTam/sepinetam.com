// 语言配置对象
const translations = {
    'zh': {
        'skills': '技能：',
        'education': '教育经历',
        'experience': '工作经验',
        'projects': '项目经验',
        'awards': '获奖情况',
        'papers': '学术论文',
        'others': '其他',
        'about_me': '关于我'
    },
    'en': {
        'skills': 'Skills:',
        'education': 'Education',
        'experience': 'Experience',
        'projects': 'Projects',
        'awards': 'Awards',
        'papers': 'Papers',
        'others': 'Others',
        'about_me': 'About Me'
    },
    'es': {
        'skills': 'Habilidades:',
        'education': 'Educación',
        'experience': 'Experiencia',
        'projects': 'Proyectos',
        'awards': 'Premios',
        'papers': 'Artículos',
        'others': 'Otros',
        'about_me': 'Sobre mí'
    }
};

// 获取当前语言
function getCurrentLanguage() {
    const lang = document.documentElement.lang.toLowerCase();
    if (['zh', 'zh-cn', 'zh-tw', 'zh-hk', 'cn', 'chi', 'zho'].includes(lang)) {
        return 'zh';
    } else if (['en', 'en-us', 'en-gb', 'en-au', 'eng', 'english'].includes(lang)) {
        return 'en';
    } else if (['es', 'es-es', 'es-419', 'spa', 'spanish'].includes(lang)) {
        return 'es';
    }
    return 'zh'; // 默认使用中文
}

// 更新页面文本
function updatePageText() {
    const currentLang = getCurrentLanguage();
    const texts = translations[currentLang];

    // 更新技能标签
    const skillLists = document.querySelectorAll('.skill');
    skillLists.forEach(skillList => {
        skillList.setAttribute('data-label', texts.skills);
    });

    // 更新其他标题
    const sections = {
        'about_me': document.querySelector('#intro h2'),
        'education': document.querySelector('#education h2'),
        'projects': document.querySelector('#production h2'),
        'awards': document.querySelector('#awards h2'),
        'experience': document.querySelector('#experience h2'),
        'papers': document.querySelector('#paper h2'),
        'others': document.querySelector('#others h2')
    };

    for (const [key, element] of Object.entries(sections)) {
        if (element) {
            const icon = element.querySelector('i');
            const iconHtml = icon ? icon.outerHTML : '';
            element.innerHTML = iconHtml + texts[key];
        }
    }
}

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', updatePageText);