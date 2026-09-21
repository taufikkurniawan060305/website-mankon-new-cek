document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true, // animasi hanya diputar sekali saat scroll
        offset: 50,
    });

    // 2. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjusting scroll position to account for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });
            }
        });
    });

    // 5. 3D Logo mouse hover interaction
    const logos = document.querySelectorAll('.logo-3d');
    logos.forEach(logo => {
        const hasAutoRotate = logo.hasAttribute('auto-rotate');
        
        logo.addEventListener('mousemove', (e) => {
            if (logo.hasAttribute('auto-rotate')) {
                logo.removeAttribute('auto-rotate');
            }
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (x / (rect.width / 2)) * 60; 
            const rotateY = 75 + (y / (rect.height / 2)) * 30; 
            
            logo.setAttribute('camera-orbit', `${rotateX}deg ${rotateY}deg 10%`);
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.removeAttribute('camera-orbit');
            if (hasAutoRotate) {
                logo.setAttribute('auto-rotate', '');
            }
        });
    });

    // ==========================================================================
    // 6. Interactive Class Schedule & Materials Filter System
    // ==========================================================================
    const classScheduleData = {
        A: {
            name: "Kelas A",
            dayName: "Senin",
            time: "08.50 - 10.30 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Senin pukul 08.50 - 10.30 WIB."
        },
        F: {
            name: "Kelas F",
            dayName: "Senin",
            time: "13.20 - 15.00 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Senin pukul 13.20 - 15.00 WIB."
        },
        B: {
            name: "Kelas B",
            dayName: "Senin",
            time: "15.30 - 18.00 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Senin pukul 15.30 - 18.00 WIB."
        },
        E: {
            name: "Kelas E",
            dayName: "Selasa",
            time: "08.50 - 10.30 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Selasa pukul 08.50 - 10.30 WIB."
        },
        D: {
            name: "Kelas D",
            dayName: "Selasa",
            time: "13.20 - 15.00 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Selasa pukul 13.20 - 15.00 WIB."
        },
        Z: {
            name: "Kelas Z",
            dayName: "Selasa",
            time: "15.30 - 18.00 WIB",
            room: "Lab Komputer A",
            desc: "Jadwal rutin mingguan setiap hari Selasa pukul 15.30 - 18.00 WIB."
        },
        G: {
            name: "Kelas G",
            dayName: "Rabu",
            time: "08.50 - 10.30 WIB",
            room: "Lab Komputer B",
            desc: "Jadwal rutin mingguan setiap hari Rabu pukul 08.50 - 10.30 WIB."
        },
        C: {
            name: "Kelas C",
            dayName: "Rabu",
            time: "10.40 - 11.30 WIB",
            room: "Lab Komputer B",
            desc: "Jadwal rutin mingguan setiap hari Rabu pukul 10.40 - 11.30 WIB."
        }
    };

    const modulesData = [
        {
            id: 1,
            title: "Materi Pengenalan OBS/WBS & Briefing Praktikum",
            tags: ["Serentak", "Briefing Praktikum", "WBS/OBS"],
            isSpecialSerentak: true,
            serentakDate: "Kamis, 17 Sep 2026",
            serentakDay: "Kamis",
            serentakTime: "19.00 WIB - Selesai",
            serentakRoom: "Zoom Meeting (Dishare di Grup WA)",
            link: "#unduhan",
            linkText: "Unduh WBS"
        },
        {
            id: 2,
            title: "Materi Pengenalan Manajemen Proyek Konstruksi & Perhitungan Volume AHSP RAB",
            tags: ["AHSP", "Volume", "Excel RAB"],
            dates: {
                Senin: "Senin, 21 Sep 2026",
                Selasa: "Selasa, 22 Sep 2026",
                Rabu: "Rabu, 23 Sep 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#soal-minggu-2-section",
            linkText: "Soal Minggu 2"
        },
        {
            id: 3,
            title: "Materi Pengenalan Schedule Kurva S & Logika Metode Konstruksi",
            tags: ["Kurva S", "Metode Konstruksi"],
            dates: {
                Senin: "Senin, 28 Sep 2026",
                Selasa: "Selasa, 29 Sep 2026",
                Rabu: "Rabu, 30 Sep 2026"
            },
            defaultRoom: "Lab Komputer B",
            link: "#unduhan",
            linkText: "Template S"
        },
        {
            id: 4,
            title: "Tutorial Pengaturan Awal Penggunaan Ms. Project",
            tags: ["Ms. Project", "Setup Kalender"],
            dates: {
                Senin: "Senin, 05 Okt 2026",
                Selasa: "Selasa, 06 Okt 2026",
                Rabu: "Rabu, 07 Okt 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 1"
        },
        {
            id: 5,
            title: "Tutorial Pembuatan Kerangka Kerja (Gantt Chart) di Ms. Project",
            tags: ["Ms. Project", "Gantt Chart", "WBS Entry"],
            dates: {
                Senin: "Senin, 12 Okt 2026",
                Selasa: "Selasa, 13 Okt 2026",
                Rabu: "Rabu, 14 Okt 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 2"
        },
        {
            id: 6,
            title: "Tutorial Input Kebutuhan Resource & Menentukan Predecessors pada Microsoft Project",
            tags: ["Ms. Project", "Resources", "Predecessors"],
            dates: {
                Senin: "Senin, 19 Okt 2026",
                Selasa: "Selasa, 20 Okt 2026",
                Rabu: "Rabu, 21 Okt 2026"
            },
            defaultRoom: "Lab Komputer B",
            link: "#tutorial",
            linkText: "Tutorial 3"
        },
        {
            id: 7,
            title: "Tutorial Pengontrolan Pekerjaan, Baseline & Progressline di Ms. Project",
            tags: ["Ms. Project", "Baseline", "Progress"],
            dates: {
                Senin: "Senin, 26 Okt 2026",
                Selasa: "Selasa, 27 Okt 2026",
                Rabu: "Rabu, 28 Okt 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 4"
        },
        {
            id: 8,
            title: "Tutorial Penyusunan Report Sebuah Proyek di Ms. Project",
            tags: ["Ms. Project", "Project Report"],
            dates: {
                Senin: "Senin, 02 Nov 2026",
                Selasa: "Selasa, 03 Nov 2026",
                Rabu: "Rabu, 04 Nov 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 5"
        },
        {
            id: 9,
            title: "Materi Pengenalan Interface Primavera P6 & Tutorial Pengaturan Awal WBS, OBS, dan Durasi pada Primavera",
            tags: ["Primavera P6", "Interface", "WBS/OBS"],
            dates: {
                Senin: "Senin, 09 Nov 2026",
                Selasa: "Selasa, 10 Nov 2026",
                Rabu: "Rabu, 11 Nov 2026"
            },
            defaultRoom: "Lab Komputer B",
            link: "#tutorial",
            linkText: "Tutorial 6"
        },
        {
            id: 10,
            title: "Tutorial Input Resource-Predecessors pada Primavera",
            tags: ["Primavera P6", "Resource", "Predecessors"],
            dates: {
                Senin: "Senin, 16 Nov 2026",
                Selasa: "Selasa, 17 Nov 2026",
                Rabu: "Rabu, 18 Nov 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 7"
        },
        {
            id: 11,
            title: "Tutorial Penyusunan Output & Kurva S pada Primavera",
            tags: ["Primavera P6", "Output", "Kurva S"],
            dates: {
                Senin: "Senin, 23 Nov 2026",
                Selasa: "Selasa, 24 Nov 2026",
                Rabu: "Rabu, 25 Nov 2026"
            },
            defaultRoom: "Lab Komputer A",
            link: "#tutorial",
            linkText: "Tutorial 8"
        }
    ];

    let currentSelectedClass = 'ALL';
    let currentSelectedModule = 'all';
    let currentSearchTerm = '';

    const classTabs = document.querySelectorAll('.class-tab-btn');
    const materiDropdown = document.getElementById('materiDropdown');
    const materiSearch = document.getElementById('materiSearch');
    const tableBody = document.getElementById('scheduleTableBody');
    const noResultsMsg = document.getElementById('noScheduleResults');
    const activeClassName = document.getElementById('activeClassName');
    const activeClassDesc = document.getElementById('activeClassDesc');
    const activeClassTimingPill = document.getElementById('activeClassTimingPill');
    const moduleCountText = document.getElementById('moduleCountText');

    function renderSchedule() {
        if (!tableBody) return;

        let rowsHtml = '';
        let matchCount = 0;

        // If ALL classes selected
        if (currentSelectedClass === 'ALL') {
            modulesData.forEach(module => {
                if (currentSelectedModule !== 'all' && module.id.toString() !== currentSelectedModule) {
                    return;
                }

                if (currentSearchTerm) {
                    const haystack = (module.title + ' ' + module.tags.join(' ')).toLowerCase();
                    if (!haystack.includes(currentSearchTerm)) {
                        return;
                    }
                }

                matchCount++;

                if (module.isSpecialSerentak) {
                    rowsHtml += `
                        <tr class="row-serentak">
                            <td class="cell-center"><span class="badge-modul">${String(module.id).padStart(2, '0')}</span></td>
                            <td>
                                <strong class="materi-title">${module.title}</strong>
                                <div class="materi-tags">
                                    <span class="tag-badge special"><i class="fa-solid fa-bullhorn"></i> PERDANA SERENTAK</span>
                                    <span class="tag-badge accent">Seluruh Kelas (A, B, C, D, E, F, G, Z)</span>
                                </div>
                            </td>
                            <td class="cell-class"><span class="class-tag-pill all-classes"><i class="fa-solid fa-users"></i><span>Semua&nbsp;Kelas</span></span></td>
                            <td>
                                <span class="date-text">${module.serentakDate}</span>
                                <span class="day-subtext">Pertemuan Perdana</span>
                            </td>
                            <td><span class="time-pill"><i class="fa-regular fa-clock"></i> ${module.serentakTime}</span></td>
                            <td><span class="room-badge"><i class="fa-solid fa-video"></i> ${module.serentakRoom}</span></td>
                            <td class="cell-center"><a href="${module.link}" class="table-action-link"><i class="fa-solid fa-arrow-down"></i> ${module.linkText}</a></td>
                        </tr>
                    `;
                } else {
                    rowsHtml += `
                        <tr>
                            <td class="cell-center"><span class="badge-modul">${String(module.id).padStart(2, '0')}</span></td>
                            <td>
                                <strong class="materi-title">${module.title}</strong>
                                <div class="materi-tags">
                                    ${module.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
                                </div>
                            </td>
                            <td class="cell-class"><span class="class-tag-pill all-classes"><i class="fa-solid fa-users"></i><span>Kelas&nbsp;A&nbsp;s.d.&nbsp;Z</span></span></td>
                            <td>
                                <span class="date-text">Senin, Selasa, & Rabu</span>
                                <span class="day-subtext">21 Sep - 25 Nov 2026</span>
                            </td>
                            <td><span class="time-pill"><i class="fa-regular fa-clock"></i> Sesuai Jam Kelas</span></td>
                            <td><span class="room-badge"><i class="fa-solid fa-desktop"></i> ${module.defaultRoom}</span></td>
                            <td class="cell-center"><a href="${module.link}" class="table-action-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${module.linkText}</a></td>
                        </tr>
                    `;
                }
            });
        } else {
            const classInfo = classScheduleData[currentSelectedClass];
            if (!classInfo) return;

            modulesData.forEach(module => {
                if (currentSelectedModule !== 'all' && module.id.toString() !== currentSelectedModule) {
                    return;
                }

                if (currentSearchTerm) {
                    const haystack = (module.title + ' ' + module.tags.join(' ')).toLowerCase();
                    if (!haystack.includes(currentSearchTerm)) {
                        return;
                    }
                }

                matchCount++;

                if (module.isSpecialSerentak) {
                    rowsHtml += `
                        <tr class="row-serentak">
                            <td class="cell-center"><span class="badge-modul">${String(module.id).padStart(2, '0')}</span></td>
                            <td>
                                <strong class="materi-title">${module.title}</strong>
                                <div class="materi-tags">
                                    <span class="tag-badge special"><i class="fa-solid fa-bullhorn"></i> SERENTAK</span>
                                    <span class="tag-badge accent">Pertemuan 1</span>
                                </div>
                            </td>
                            <td class="cell-class"><span class="class-tag-pill"><i class="fa-solid fa-users"></i><span>${classInfo.name.replace(/\s+/g, '&nbsp;')}</span></span></td>
                            <td>
                                <span class="date-text">${module.serentakDate}</span>
                                <span class="day-subtext"><i class="fa-solid fa-circle-exclamation"></i> Khusus Hari Kamis</span>
                            </td>
                            <td><span class="time-pill"><i class="fa-regular fa-clock"></i> ${module.serentakTime}</span></td>
                            <td><span class="room-badge"><i class="fa-solid fa-video"></i> ${module.serentakRoom}</span></td>
                            <td class="cell-center"><a href="${module.link}" class="table-action-link"><i class="fa-solid fa-arrow-down"></i> ${module.linkText}</a></td>
                        </tr>
                    `;
                } else {
                    const classDate = module.dates[classInfo.dayName] || "-";
                    rowsHtml += `
                        <tr>
                            <td class="cell-center"><span class="badge-modul">${String(module.id).padStart(2, '0')}</span></td>
                            <td>
                                <strong class="materi-title">${module.title}</strong>
                                <div class="materi-tags">
                                    ${module.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
                                </div>
                            </td>
                            <td class="cell-class"><span class="class-tag-pill"><i class="fa-solid fa-users"></i><span>${classInfo.name.replace(/\s+/g, '&nbsp;')}</span></span></td>
                            <td>
                                <span class="date-text">${classDate}</span>
                                <span class="day-subtext">Rutin ${classInfo.dayName}</span>
                            </td>
                            <td><span class="time-pill"><i class="fa-regular fa-clock"></i> ${classInfo.time}</span></td>
                            <td><span class="room-badge"><i class="fa-solid fa-desktop"></i> ${classInfo.room}</span></td>
                            <td class="cell-center"><a href="${module.link}" class="table-action-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${module.linkText}</a></td>
                        </tr>
                    `;
                }
            });
        }

        tableBody.innerHTML = rowsHtml;

        const tableElem = document.getElementById('scheduleTable');
        if (matchCount === 0) {
            if (noResultsMsg) noResultsMsg.style.display = 'block';
            if (tableElem) tableElem.style.display = 'none';
        } else {
            if (noResultsMsg) noResultsMsg.style.display = 'none';
            if (tableElem) tableElem.style.display = 'table';
        }

        if (moduleCountText) {
            moduleCountText.textContent = `${matchCount} Modul Ditampilkan`;
        }
    }

    function updateActiveBanner() {
        if (currentSelectedClass === 'ALL') {
            if (activeClassName) activeClassName.textContent = "Semua Kelas (Ikhtisar Lengkap)";
            if (activeClassDesc) activeClassDesc.textContent = "Melihat agenda modul 1 s.d. 11 dengan penyesuaian waktu dan tanggal masing-masing kelas.";
            if (activeClassTimingPill) activeClassTimingPill.innerHTML = '<i class="fa-regular fa-clock"></i> 8 Kelas Aktif (A, B, C, D, E, F, G, Z)';
        } else {
            const classInfo = classScheduleData[currentSelectedClass];
            if (classInfo) {
                if (activeClassName) activeClassName.textContent = `${classInfo.name} - Jadwal Lengkap`;
                if (activeClassDesc) activeClassDesc.textContent = `${classInfo.desc} | Lokasi: ${classInfo.room}. (Khusus Modul 1 serentak Kamis, 17 Sep 2026 pukul 19.00 WIB via Zoom).`;
                if (activeClassTimingPill) activeClassTimingPill.innerHTML = `<i class="fa-regular fa-clock"></i> Setiap ${classInfo.dayName}, ${classInfo.time}`;
            }
        }
    }

    window.selectClassSchedule = function(classKey, shouldScroll = false) {
        currentSelectedClass = classKey;

        classTabs.forEach(tab => {
            if (tab.getAttribute('data-class') === classKey) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        updateActiveBanner();
        renderSchedule();

        if (shouldScroll) {
            const filterBox = document.querySelector('.schedule-filter-box');
            if (filterBox) {
                const yOffset = -90;
                const y = filterBox.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    window.resetScheduleFilters = function() {
        currentSelectedClass = 'ALL';
        currentSelectedModule = 'all';
        currentSearchTerm = '';
        if (materiDropdown) materiDropdown.value = 'all';
        if (materiSearch) materiSearch.value = '';

        classTabs.forEach(tab => {
            if (tab.getAttribute('data-class') === 'ALL') {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        updateActiveBanner();
        renderSchedule();
    };

    classTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const classKey = tab.getAttribute('data-class');
            window.selectClassSchedule(classKey, false);
        });
    });

    if (materiDropdown) {
        materiDropdown.addEventListener('change', (e) => {
            currentSelectedModule = e.target.value;
            renderSchedule();
        });
    }

    if (materiSearch) {
        materiSearch.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            renderSchedule();
        });
    }

    // Initial table render
    renderSchedule();
});
