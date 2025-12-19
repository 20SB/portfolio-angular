
document.addEventListener('DOMContentLoaded', () => {

  // Helper to load JSON - REMOVED, using global variables now

  // Render Skills
  const renderSkills = () => {
    // const data = await loadData('data/skills.json');
    // Using global variable skillsData
    if (typeof skillsData === 'undefined') return;
    const data = skillsData;

    const langContainer = document.getElementById('lang-skills-container');
    const hardContainer = document.getElementById('hard-skills-container');
    const softContainer = document.getElementById('soft-skills-container');

    if (langContainer && data.languages) {
      data.languages.forEach(lang => {
        const item = document.createElement('div');
        item.className = 'art-lang-skills-item';
        item.innerHTML = `
          <div id="${lang.id}" class="art-cirkle-progress"></div>
          <h6>${lang.name}</h6>
        `;
        langContainer.appendChild(item);
      });
    }

    if (hardContainer && data.hardSkills) {
      data.hardSkills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'art-hard-skills-item';
        item.innerHTML = `
          <div class="art-skill-heading">
            <h6>${skill.name}</h6>
          </div>
          <div class="art-line-progress">
             <div id="${skill.id}"></div>
          </div>
        `;
        hardContainer.appendChild(item);
      });
    }

    if (softContainer && data.softSkills) {
      data.softSkills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'art-hard-skills-item';
        item.innerHTML = `
          <div class="art-skill-heading">
            <h6>${skill.name}</h6>
          </div>
          <div class="art-line-progress">
             <div id="${skill.id}"></div>
          </div>
        `;
        softContainer.appendChild(item);
      });
    }

    // Initialize Progress Bars
    initProgressBars(data);
  };

  // Init Progress Bars function
  const initProgressBars = (data) => {
    // Circle Progress Bars
    if (data.languages) {
      data.languages.forEach((lang, index) => {
        const delay = 2500 + (index * 100);
        const container = document.getElementById(lang.id);
        if (!container) return;

        // Check if ProgressBar is defined (it should be from plugins/progressbar.min.js)
        if (typeof ProgressBar !== 'undefined') {
          const bar = new ProgressBar.Circle(container, {
            strokeWidth: 7,
            easing: 'easeInOut',
            duration: 1400,
            delay: delay,
            trailWidth: 7,
            step: function (state, circle) {
              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }
            }
          });
          bar.animate(lang.value || 0.9);
        }
      });
    }

    // Line Progress Bars (Hard Skills)
    if (data.hardSkills) {
      data.hardSkills.forEach((skill, index) => {
        const container = document.getElementById(skill.id);
        if (!container) return;

        const delay = 2800 + (index * 100);
        const val = skill.value || 0.7;

        if (typeof ProgressBar !== 'undefined') {
          const bar = new ProgressBar.Line(container, {
            strokeWidth: 1.72,
            easing: 'easeInOut',
            duration: 1400,
            delay: delay,
            trailWidth: 1.72,
            svgStyle: {
              width: '100%',
              height: '100%'
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + ' %');
            }
          });
          bar.animate(val);
        }
      });
    }

    // Line Progress Bars (Soft Skills)
    if (data.softSkills) {
      data.softSkills.forEach((skill, index) => {
        const container = document.getElementById(skill.id);
        if (!container) return;

        const delay = 3500 + (index * 100); // Delayed start after hard skills
        const val = skill.value || 0.7;

        if (typeof ProgressBar !== 'undefined') {
          const bar = new ProgressBar.Line(container, {
            strokeWidth: 1.72,
            easing: 'easeInOut',
            duration: 1400,
            delay: delay,
            trailWidth: 1.72,
            svgStyle: {
              width: '100%',
              height: '100%'
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + ' %');
            }
          });
          bar.animate(val);
        }
      });
    }
  };

  // Calcualte Age
  function calculateAge(dob) {
    const [day, month, year] = dob.split("-").map(Number);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  }

  // Example
  console.log(calculateAge("12-11-1998")); // e.g. 26


  // Render Knowledge
  const renderKnowledge = () => {
    // const data = await loadData('data/knowledge.json');
    if (typeof knowledgeData === 'undefined') return;
    const data = knowledgeData;

    const container = document.getElementById('knowledge-container');
    if (container) {
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        container.appendChild(li);
      });
    }
  };

  // Render Projects
  const renderProjects = () => {
    // const data = await loadData('data/projects.json');
    if (typeof projectsData === 'undefined') return;
    const data = projectsData; // Now an object: { production: [], personal: [] }

    // Render Production Projects
    const productionContainer = document.getElementById('production-projects');
    if (productionContainer && data.production) {
      data.production.forEach(project => {
        const div = document.createElement('div');
        div.className = 'col-lg-4 col-md-6';
        div.style.marginBottom = '30px';

        let tagsHtml = '';
        if (project.tags && project.tags.length > 0) {
          tagsHtml = '<div style="margin-bottom: 15px;">';
          project.tags.forEach(tag => {
            tagsHtml += `<span style="display: inline-block; padding: 4px 12px; margin-right: 8px; margin-bottom: 8px; font-size: 10px; border-radius: 15px; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">${tag}</span>`;
          });
          tagsHtml += '</div>';
        }

        div.innerHTML = `
              <div class="art-a art-service-icon-box" style="height: 100%">
                <div class="art-service-ib-content">
                  <div class="art-project-header" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div class="art-project-title-group">
                        <h5 style="margin-bottom: 5px;">${project.title}</h5>
                        <h6 class="mb-0 text-muted">${project.company || ''}</h6>
                    </div>
                    <img src="${project.logo || 'img/project.png'}" alt="logo" style="width: 50px; height: 50px; border-radius: 5px; object-fit: contain; padding: 2px; background: rgba(255,255,255,0.05); flex-shrink: 0; margin-left: 10px;">
                  </div>
                  <div class="art-el-suptitle mb-15">${project.period || ''}</div>
                  <h6 class="mb-15" style="font-size: 13px;">${project.subtitle}</h6>
                  <div class="mb-15" style="text-align: justify">${project.description}</div>
                  ${tagsHtml}
                  ${project.link ? `<div class="art-buttons-frame"><a href="${project.link}" target="_blank" class="art-link art-color-link art-w-chevron" rel="noopener noreferrer" data-no-swup>View Project</a></div>` : ''}
                </div>
              </div>
            `;
        productionContainer.appendChild(div);
      });
    }

    // Render Personal Projects
    const personalContainer = document.getElementById('personal-projects');
    if (personalContainer && data.personal) {
      data.personal.forEach(project => {
        const div = document.createElement('div');
        div.className = 'col-lg-4 col-md-6';
        div.style.marginBottom = '30px';

        let tagsHtml = '';
        if (project.tags && project.tags.length > 0) {
          tagsHtml = '<div style="margin-bottom: 15px;">';
          project.tags.forEach(tag => {
            tagsHtml += `<span style="display: inline-block; padding: 4px 12px; margin-right: 8px; margin-bottom: 8px; font-size: 10px; border-radius: 15px; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">${tag}</span>`;
          });
          tagsHtml += '</div>';
        }

        div.innerHTML = `
              <div class="art-a art-service-icon-box" style="height: 100%">
                <div class="art-service-ib-content">
                  <div class="art-project-header" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                     <div class="art-project-title-group">
                        <h5 style="margin-bottom: 5px;">${project.title}</h5>
                        <h6 class="mb-0">${project.subtitle}</h6>
                     </div>
                    <img src="${project.logo || 'img/project.png'}" alt="logo" style="width: 40px; height: 40px; border-radius: 5px; object-fit: contain; padding: 2px; background: rgba(255,255,255,0.05); flex-shrink: 0; margin-left: 10px;">
                  </div>
                  <div class="mb-15" style="text-align: justify">${project.description}</div>
                  ${tagsHtml}
                  <div class="art-buttons-frame"><a href="${project.link}" target="_blank" class="art-link art-color-link art-w-chevron" rel="noopener noreferrer" data-no-swup>Visit Repo</a></div>
                </div>
              </div>
            `;
        personalContainer.appendChild(div);
      });
    }
  };

  // Render Experience
  const renderExperience = () => {
    // const data = await loadData('data/experience.json');
    if (typeof experienceData === 'undefined') return;
    const data = experienceData;


    const container = document.getElementById('experience-timeline');
    if (container) {
      data.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'art-timeline-item';
        item.innerHTML = `
                <div class="art-timeline-mark-light"></div>
                <div class="art-timeline-mark"></div>
                <div class="art-a art-timeline-content">
                    <div class="art-card-header">
                        <div class="art-left-side" style="display: flex; align-items: center;">
                            <img src="${exp.logo || 'img/project.png'}" alt="logo" style="width: 40px; height: 40px; border-radius: 5px; object-fit: contain; padding: 2px; background: rgba(255,255,255,0.05); flex-shrink: 0; margin-right: 15px; margin-bottom: 15px;">
                            <div>
                                <h5>${exp.role}</h5>
                                <div class="art-el-suptitle mb-15">${exp.company}</div>
                            </div>
                        </div>
                        <div class="art-right-side">
                            <span class="art-date">${exp.period}</span>
                        </div>
                    </div>
                    <p>${exp.description}</p>
                </div>
            `;
        container.appendChild(item);
      });
    }
  };

  // Render Education
  const renderEducation = () => {
    // const data = await loadData('data/education.json');
    if (typeof educationData === 'undefined') return;
    const data = educationData;

    const container = document.getElementById('education-timeline');
    if (container) {
      data.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'art-timeline-item';
        item.innerHTML = `
                <div class="art-timeline-mark-light"></div>
                <div class="art-timeline-mark"></div>

                <div class="art-a art-timeline-content">
                    <div class="art-card-header">
                        <div class="art-left-side" style="display: flex; align-items: center;">
                             <img src="${edu.logo || 'img/project.png'}" alt="logo" style="width: 40px; height: 40px; border-radius: 5px; object-fit: contain; padding: 2px; background: rgba(255,255,255,0.05); flex-shrink: 0; margin-right: 15px; margin-bottom: 8px;">
                            <div>
                                <h5>${edu.title}</h5>
                                <div class="art-el-suptitle mb-8">${edu.institution}</div>
                            </div>
                        </div>
                        <div class="art-right-side">
                            <span class="art-date">${edu.period}</span>
                        </div>
                    </div>
                     <p class="edu-passing-mark">${edu.description}</p>
                </div>
             `;
        container.appendChild(item);
      });
    }
  };

  // Render Personal Info
  const renderPersonal = () => {
    if (typeof personalData === 'undefined') return;
    const data = personalData;
    const age = calculateAge(data.dob);

    // Sidebar Info
    setText('sidebar-name', data.name);
    setText('sidebar-role', data.role);
    setText('sidebar-current-location', data.location.currentLocation);
    setText('sidebar-country', data.location.country);
    setText('sidebar-city', data.location.city);
    setText('sidebar-age', age);

    // CV Link
    const cvBtn = document.getElementById('sidebar-cv');
    if (cvBtn) cvBtn.setAttribute('href', data.contacts.cv_link);

    // Sidebar Socials
    const socialContainer = document.getElementById('sidebar-social');
    if (socialContainer) {
      socialContainer.innerHTML = ''; // Clear existing
      if (data.contacts.linkedin) socialContainer.innerHTML += `<a href="${data.contacts.linkedin}" target="_blank" rel="noopener noreferrer" data-no-swup><i class="fab fa-linkedin-in"></i></a>`;
      if (data.contacts.github) socialContainer.innerHTML += `<a href="${data.contacts.github}" target="_blank" rel="noopener noreferrer" data-no-swup><i class="fab fa-github"></i></a>`;
      if (data.contacts.email) socialContainer.innerHTML += `<a href="mailto:${data.contacts.email}" target="_blank" rel="noopener noreferrer" data-no-swup><i class="fas fa-envelope"></i></a>`;
      if (data.contacts.whatsapp_url) socialContainer.innerHTML += `<a href="${data.contacts.whatsapp_url}" target="_blank" rel="noopener noreferrer" data-no-swup><i class="fab fa-whatsapp"></i></a>`;
    }

    // Banner
    const bannerTitle = document.getElementById('banner-title');
    if (bannerTitle) bannerTitle.innerHTML = data.banner.title;

    const bannerSubtitle = document.getElementById('banner-subtitle');
    if (bannerSubtitle) bannerSubtitle.innerHTML = data.banner.subtitle;

    const bannerContact = document.getElementById('banner-contact');
    if (bannerContact) bannerContact.setAttribute('href', data.contacts.whatsapp_url);

    const typingText = document.getElementById('banner-typing');
    if (typingText) {
      typingText.setAttribute('data-rotate', JSON.stringify(data.banner.typingText));
    }

    // // Counters
    // const countersContainer = document.getElementById('counters-container');
    // if (countersContainer && data.counters) {
    //     // We need to clear and rebuild, but structure in HTML was 3 separate divs.
    //     // We replaced with one ID.
    //     // Let's check if the previous replace merged them or if we should have kept structure.
    //     // The replace merged them into one container.
    //     countersContainer.innerHTML = '';
    //     // Note: The original HTML had row container as parent (row p-30-0 ...).
    //     // Our replace replaced the whole inner content of that row with one div id="counters-container" class="art-counter-frame". 
    //     // Wait, "art-counter-frame" is for *one* item. If we replaced 3 items with 1 div, we messed up the layout?
    //     // Let's re-read the replace logic.
    //     /* 
    //      Previous:
    //      <div class="row ...">
    //         <div class="art-counter-frame">...</div>
    //         <div class="art-counter-frame">...</div>
    //         <div class="art-counter-frame">...</div>
    //      </div>

    //      My Replace replaced the inner content of `.row` ? No.
    //      StartLine: 219 (first counter frame)
    //      EndLine: 253 (last counter frame)

    //      Replacement:
    //      <div class="art-counter-frame" id="counters-container">...</div>

    //      ISSUE: I replaced 3 items with 1 item having class "art-counter-frame". 
    //      But we need multiple items. I should have used class "row" or just appended to the parent row?
    //      The parent is `.row`.
    //      So I essentially removed 3 columns and put 1 column? 
    //      Let's fix layout in JS. "art-counter-frame" usually wraps one counter.
    //      The parent row expects columns perhaps? Or art-counter-frame *is* the column?
    //      Looking at original HTML: 
    //      <div class="art-counter-frame"> ... </div>
    //      It seems `art-counter-frame` is a flex item or block.

    //      I should probably render multiple `art-counter-frame` divs inside the parent container.
    //      My replacement ID `counters-container` is on a `div` that has `art-counter-frame` class.
    //      This is wrong if I want to put multiple frames inside it.
    //      I'll treat `counters-container` as a wrapper (maybe remove specific class if needed, or just append siblings).
    //      Actually, I made `counters-container` HAVE the class `art-counter-frame`.
    //      I should change the JS to clear class or handle structure.

    //      Correction: I will assume I need to render siblings.
    //      Wait, I can't render siblings if I only have one handle.
    //      I will use `counters-container` as the PARENT. 
    //      But in my replace I gave it class `art-counter-frame`. I should strip that class or ignore it if I replace innerHTML?
    //      No, if the container ITSELF has `art-counter-frame`, it is styled as ONE frame.

    //      I need to FIX the HTML structure likely, or use JS to replace the element `counters-container` with multiple elements.
    //      Better: I'll use `counters-container` as a placeholder and replace it with the generated HTML.
    //      OR, I can just fix the HTML in a subsequent step if layout is broken.
    //      For now, let's assume I can change the outerHTML or just inject content into the parent of counters-container?

    //      Let's proceed with injecting into it, but realize the styling might be off.
    //      Actually, looking closely at original:
    //      <div class="row ...">
    //         <div class="art-counter-frame">...</div>
    //         <div class="art-counter-frame">...</div>
    //      </div>

    //      My new HTML:
    //      <div class="row ...">
    //         <div class="art-counter-frame" id="counters-container"></div>
    //      </div>

    //      If I put multiple counters inside this one `art-counter-frame`, they will be nested deep.
    //      The CSS likely expects `art-counter-frame` to be a direct child of row? OR `art-counter-frame` has specific style.

    //      Refined JS Logic:
    //      I will remove the specific class from the container in JS, and then append the proper child divs.
    //     */

    //     countersContainer.className = 'w-100 d-flex justify-content-between'; // Hack to restore layout behavior if needed?
    //     // Or just let's try to replicate structure.

    //     let html = '';
    //     data.counters.forEach(counter => {
    //          html += `
    //             <div class="art-counter-frame">
    //                 <div class="art-counter-box">
    //                     <span class="art-counter">${counter.count}</span><span class="art-counter-plus">${counter.suffix}</span>
    //                 </div>
    //                 <h6>${counter.title}</h6>
    //             </div>
    //          `;
    //     });

    //     // If I put this HTML inside the existing div (which has art-counter-frame class), 
    //     // I get: <div class="art-counter-frame" ...> <div class="art-counter-frame"> ... </div> </div>
    //     // Doubled frame.

    //     // Fix: Replace the container with the new HTML using outerHTML
    //     countersContainer.outerHTML = html;

    //     // However, if I do outerHTML, I lose the ID for future updates? 
    //     // That's fine for this static render.
    // }

    // Footer
    setText('footer-copyright', data.footer.copyright);
    const footerPrev = document.getElementById('footer-prev');
    if (footerPrev && data.footer.prevPortfolio) {
      footerPrev.innerHTML = `<a href="${data.footer.prevPortfolio.link}" target="_blank" rel="noopener noreferrer" data-no-swup>${data.footer.prevPortfolio.text}</a>`;
    }

    // Update preloader Name
    const preloaderName = document.querySelector('.art-preloader-content h4');
    if (preloaderName) preloaderName.textContent = data.name;
  };

  // Helper
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  // Run all (sync now)
  renderPersonal();
  renderSkills();
  renderKnowledge();
  renderProjects();
  renderExperience();
  renderEducation();
});
