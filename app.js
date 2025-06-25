            document.addEventListener('DOMContentLoaded', function () {
            // --- INICIALIZAÇÃO ---
            const loginScreen = document.getElementById('login-screen');
            const appScreen = document.getElementById('app-screen');
            const loginForm = document.getElementById('login-form'); // Captura o formulário
            const logoutButton = document.getElementById('logout-button');
            
            const navLinks = document.querySelectorAll('.nav-link');
            const pageContents = document.querySelectorAll('.page-content');
            const headerTitle = document.getElementById('header-title');

            const pageTitles = {
                dashboard: "Dashboard",
                previsao: "Previsão Detalhada",
                escala: "Escala de Profissionais",
                dados: "Fontes de Dados"
            };
            
            lucide.createIcons();

            // --- FUNÇÕES ---
            
            // Função para gerar dados do heatmap
            function generateHeatmapData() {
                const tbody = document.getElementById('heatmap-body');
                if (!tbody) return;
                tbody.innerHTML = ''; // Limpa tabela antiga

                const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

                hours.forEach(hour => {
                    const row = document.createElement('tr');
                    row.className = "bg-white border-b";

                    const hourCell = document.createElement('th');
                    hourCell.scope = 'row';
                    hourCell.className = 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap';
                    hourCell.textContent = hour;
                    row.appendChild(hourCell);

                    for (let day = 0; day < 7; day++) {
                        const cell = document.createElement('td');
                        const attendance = Math.floor(Math.random() * 25); // 0 a 24 atendimentos
                        
                        let bgColorStyle = '#A7F3D0'; // Baixo
                        if (attendance > 8) bgColorStyle = '#FDE047'; // Médio
                        if (attendance > 15) bgColorStyle = '#FCA5A5'; // Alto
                        if (attendance > 20) bgColorStyle = '#F87171'; // Pico

                        cell.className = 'px-6 py-4 text-center cursor-pointer hover:ring-2 hover:ring-primary';
                        cell.style.backgroundColor = bgColorStyle;
                        cell.setAttribute('title', `${attendance} atendimentos`);
                        cell.textContent = ""; // Deixar vazio para focar na cor
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                });
            }


            // Função para trocar de página
            function switchPage(pageId) {
                pageContents.forEach(content => {
                    content.classList.add('hidden');
                });
                const activePage = document.getElementById(pageId);
                if (activePage) {
                    activePage.classList.remove('hidden');
                }
                
                headerTitle.textContent = pageTitles[pageId] || "Dashboard";

                // Atualiza o link ativo no menu
                navLinks.forEach(link => {
                    link.classList.remove('bg-white/20');
                    if (link.getAttribute('href') === `#${pageId}`) {
                        link.classList.add('bg-white/20');
                    }
                });
            }
            
            // --- EVENT LISTENERS ---

            // Login
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Previne o recarregamento da página, que era a causa do problema
                
                loginScreen.classList.add('hidden');
                appScreen.classList.remove('hidden');
                
                // Inicializa a primeira página e os dados
                switchPage('dashboard');
                generateHeatmapData();
                lucide.createIcons();
            });

            // Logout
            logoutButton.addEventListener('click', () => {
                appScreen.classList.add('hidden');
                loginScreen.classList.remove('hidden');
            });

            // Navegação
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('href').substring(1);
                    switchPage(pageId);
                });
            });

            // Definir data de hoje no seletor de semana
            const today = new Date().toISOString().split('T')[0];
            const weekPicker = document.getElementById('week-picker');
            if(weekPicker) {
               weekPicker.value = today;
               weekPicker.addEventListener('change', generateHeatmapData);
            }
        });

         // Seleciona o elemento onde a data será exibida
        const elementoDataFuturaDois = document.getElementById('data-dois-dias');
        const elementoDataFuturaTres = document.getElementById('data-tres-dias');

        // Define quantos dias você quer adicionar
        const diasParaAdicionarDois = 2;
        const diasParaAdicionarTres = 3;

        // Cria um objeto com a data de hoje
        const dataFuturaDois = new Date();
        const dataFuturaTres = new Date();

        // ** A MÁGICA ACONTECE AQUI **
        // Pega o dia de hoje, soma 2, e define como a nova data.
        // O JavaScript ajusta o mês/ano se necessário.
        dataFuturaDois.setDate(dataFuturaDois.getDate() + diasParaAdicionarDois);
        dataFuturaTres.setDate(dataFuturaTres.getDate() + diasParaAdicionarTres);

        // Formata a nova data para exibição
        const opcoes = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dataFormatadaDois = dataFuturaDois.toLocaleDateString('pt-BR', opcoes);
        const dataFormatadaTres = dataFuturaTres.toLocaleDateString('pt-BR', opcoes);

        // Insere a data formatada no parágrafo
        elementoDataFuturaDois.textContent = dataFormatadaDois;
        elementoDataFuturaTres.textContent = dataFormatadaTres;
