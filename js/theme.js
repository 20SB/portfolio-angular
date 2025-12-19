document.addEventListener('DOMContentLoaded', () => {
    const themeBtns = document.querySelectorAll('.art-theme-toggle-button');
    const themeIcons = document.querySelectorAll('.art-theme-toggle-icon');
    const body = document.body;

    // Define palettes (Expanded)
    const darkAccents = [
        '#FFC107', '#FF4081', '#00E5FF', '#76FF03', '#FF9100', 
        '#EA00FF', '#2979FF', '#00E676', '#FFD600', '#F50057'
    ]; 
    const lightAccents = [
        '#2E5BFF', '#D50000', '#6200EA', '#00C853', '#C51162', 
        '#304FFE', '#DD2C00', '#00BFA5', '#651FFF', '#2962FF'
    ];

    // Helper to get a random index different from the previous one
    const getNewIndex = (arrayLength, storageKey) => {
        let lastIndex = parseInt(localStorage.getItem(storageKey));
        let newIndex;
        
        do {
            newIndex = Math.floor(Math.random() * arrayLength);
        } while (newIndex === lastIndex && arrayLength > 1);
        
        localStorage.setItem(storageKey, newIndex);
        return newIndex;
    };

    // Select random colors for this session (avoiding immediate repeats)
    const sessionDarkAccent = darkAccents[getNewIndex(darkAccents.length, 'lastDarkAccentIdx')];
    const sessionLightAccent = lightAccents[getNewIndex(lightAccents.length, 'lastLightAccentIdx')];

    console.log("sessionDarkAccent", sessionDarkAccent);
    console.log("sessionLightAccent", sessionLightAccent);
    
    // Function to apply the correct accent color based on theme
    const applyAccent = (theme) => {
        const color = theme === 'light' ? sessionLightAccent : sessionDarkAccent;
        console.log("color", color);
        
        document.body.style.setProperty('--accent', color);
    };

    // Function to update all icons
    const updateIcons = (theme) => {
        themeIcons.forEach(icon => {
            if (theme === 'light') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    };

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply initial state
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        updateIcons('light');
        applyAccent('light');
    } else {
        applyAccent('dark');
    }

    // Toggle theme on button click
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            let theme = 'dark';
            if (body.classList.contains('light-theme')) {
                theme = 'light';
            }
            
            updateIcons(theme);
            applyAccent(theme);
            localStorage.setItem('theme', theme);
        });
    });
});
