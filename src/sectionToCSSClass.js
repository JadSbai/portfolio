export const mapper = (tab) => {
    switch (tab){
        case 'Home':
            return 'landing_cont';
        case 'Skills':
            return 'skills_cont';
        case 'Experience':
            return 'experience_cont';
        case 'About':
            return 'about_cont';
        case 'Projects':
            return 'projects_cont';
    }
}
