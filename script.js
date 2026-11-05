// Segurança: o arquivo dados.js precisa estar junto do script.js
const baseSiteData = (typeof defaultSiteData !== 'undefined') ? defaultSiteData : (() => {
    console.error('dados.js não foi carregado. Verifique se o arquivo dados.js está na mesma pasta do site.');
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', '<div style="background:#b00020;color:#fff;padding:12px;text-align:center;font-family:sans-serif;">Erro: arquivo <strong>dados.js</strong> não encontrado. Envie o dados.js junto com os demais arquivos do site.</div>');
    });
    return { team: [], services: [], socials: {} };
})();

// Carregar dados salvos no localStorage ou usar os padrões
let siteData;
try {
    siteData = JSON.parse(localStorage.getItem('jhony_site_data')) || baseSiteData;
} catch (e) {
    siteData = baseSiteData;
}

// Garante que a equipe nunca fique vazia se o objeto for antigo
if (!siteData.team || siteData.team.length === 0) {
    siteData.team = baseSiteData.team;
    siteData.teamSubtitle = baseSiteData.teamSubtitle;
    siteData.teamTitle = baseSiteData.teamTitle;
    siteData.teamDesc = baseSiteData.teamDesc;
}

// Renderizar Landing Page Pública
function renderPublicPage() {
    if (!document.getElementById('display-logo-title')) return;

    const setEl = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setEl('display-logo-title', siteData.logoTitle);
    setEl('display-logo-sub', siteData.logoSub);
    setEl('display-hero-badge', siteData.heroBadge);
    setEl('display-hero-title', siteData.heroTitle);
    setEl('display-hero-desc', siteData.heroDesc);
    setEl('display-hero-btn-wa', siteData.heroBtnWa);
    setEl('display-hero-btn-maps', siteData.heroBtnMaps);

    setEl('display-team-subtitle', siteData.teamSubtitle);
    setEl('display-team-title', siteData.teamTitle);
    setEl('display-team-desc', siteData.teamDesc);

    setEl('display-about-subtitle', siteData.aboutSubtitle);
    setEl('display-about-title', siteData.aboutTitle);
    setEl('display-about-p1', siteData.aboutP1);
    setEl('display-about-p2', siteData.aboutP2);
    setEl('display-feat-1', siteData.aboutFeat1);
    setEl('display-feat-2', siteData.aboutFeat2);
    setEl('display-feat-3', siteData.aboutFeat3);

    setEl('display-services-subtitle', siteData.servicesSubtitle);
    setEl('display-services-title', siteData.servicesTitle);
    setEl('display-services-desc', siteData.servicesDesc);

    setEl('display-cta-title', siteData.ctaTitle);
    setEl('display-cta-desc', siteData.ctaDesc);
    setEl('display-cta-btn-wa', siteData.ctaBtnWa);
    setEl('display-cta-btn-maps', siteData.ctaBtnMaps);

    setEl('display-footer-title', siteData.footerTitle);
    setEl('display-footer-sub', siteData.footerSub);
    setEl('display-footer-phone', siteData.footerPhone);
    setEl('display-footer-hours', siteData.footerHours);

    // Renderizar Barbeiros
    const teamContainer = document.getElementById('team-grid-container');
    if (teamContainer && siteData.team) {
        teamContainer.innerHTML = '';
        siteData.team.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <div class="team-avatar-box">
                    <img src="${member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" alt="${member.name}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'">
                </div>
                <div class="team-info">
                    <h3 class="team-name">${member.name}</h3>
                    <span class="team-role">${member.role}</span>
                    <p class="team-exp">${member.exp}</p>
                    <div class="team-socials">
                        ${member.instagram ? `<a href="${member.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>` : ''}
                    </div>
                </div>
            `;
            teamContainer.appendChild(card);
        });
    }

    // WhatsApp e Redes
    const waNumber = siteData.whatsappRaw || '5563984257185';
    const waUrl = `https://wa.me/${waNumber}?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20na%20barbearia.`;
    
    if (document.getElementById('btn-hero-whatsapp')) document.getElementById('btn-hero-whatsapp').href = waUrl;
    if (document.getElementById('btn-cta-whatsapp')) document.getElementById('btn-cta-whatsapp').href = waUrl;
    if (document.getElementById('link-whatsapp-footer')) document.getElementById('link-whatsapp-footer').href = `https://wa.me/${waNumber}`;

    if (document.getElementById('link-instagram')) document.getElementById('link-instagram').href = siteData.socials.instagram;
    if (document.getElementById('link-facebook')) document.getElementById('link-facebook').href = siteData.socials.facebook;
    if (document.getElementById('link-maps')) document.getElementById('link-maps').href = siteData.socials.maps;
    if (document.getElementById('btn-como-chegar-hero')) document.getElementById('btn-como-chegar-hero').href = siteData.socials.maps;
    if (document.getElementById('btn-como-chegar-cta')) document.getElementById('btn-como-chegar-cta').href = siteData.socials.maps;

    // Renderizar Serviços
    const servicesContainer = document.getElementById('services-grid-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        siteData.services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';

            const isConsulteValor = service.price.trim().toLowerCase() === 'consulte valor';
            let priceElementHtml = '';

            if (isConsulteValor) {
                const whatsappMsg = encodeURIComponent(`Olá! Gostaria de consultar o valor do serviço: ${service.title}.`);
                priceElementHtml = `<a class="price-tag price-tag-link" href="https://wa.me/${waNumber}?text=${whatsappMsg}" target="_blank"><i class="fab fa-whatsapp"></i> Consulte valor</a>`;
            } else {
                priceElementHtml = `<span class="price-tag">${service.price}</span>`;
            }

            card.innerHTML = `
                <div class="service-icon"><i class="${service.icon || 'fas fa-cut'}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                ${priceElementHtml}
            `;
            servicesContainer.appendChild(card);
        });
    }
}

// Carregar Painel Admin
function loadAdminPageData() {
    if (!document.getElementById('edit-logo-title')) return;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('edit-logo-title', siteData.logoTitle);
    setVal('edit-logo-sub', siteData.logoSub);
    setVal('edit-hero-badge', siteData.heroBadge);
    setVal('edit-hero-title', siteData.heroTitle);
    setVal('edit-hero-desc', siteData.heroDesc);
    setVal('edit-hero-btn-wa', siteData.heroBtnWa);
    setVal('edit-hero-btn-maps', siteData.heroBtnMaps);

    setVal('edit-team-subtitle', siteData.teamSubtitle);
    setVal('edit-team-title', siteData.teamTitle);
    setVal('edit-team-desc', siteData.teamDesc);

    setVal('edit-about-subtitle', siteData.aboutSubtitle);
    setVal('edit-about-title', siteData.aboutTitle);
    setVal('edit-about-p1', siteData.aboutP1);
    setVal('edit-about-p2', siteData.aboutP2);
    setVal('edit-feat-1', siteData.aboutFeat1);
    setVal('edit-feat-2', siteData.aboutFeat2);
    setVal('edit-feat-3', siteData.aboutFeat3);

    setVal('edit-services-subtitle', siteData.servicesSubtitle);
    setVal('edit-services-title', siteData.servicesTitle);
    setVal('edit-services-desc', siteData.servicesDesc);

    setVal('edit-cta-title', siteData.ctaTitle);
    setVal('edit-cta-desc', siteData.ctaDesc);
    setVal('edit-cta-btn-wa', siteData.ctaBtnWa);

    setVal('edit-footer-phone', siteData.footerPhone);
    setVal('edit-whatsapp-raw', siteData.whatsappRaw);
    setVal('edit-footer-hours', siteData.footerHours);
    setVal('edit-instagram', siteData.socials.instagram);
    setVal('edit-facebook', siteData.socials.facebook);
    setVal('edit-maps', siteData.socials.maps);

    renderAdminTeamList();
    renderAdminServicesList();
}

// Compressão de Imagens enviadas para não estourar a memória do navegador
function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            callback(compressedBase64);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Renderizar Gerenciador da Equipe no Admin
function renderAdminTeamList() {
    const listContainer = document.getElementById('admin-team-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    siteData.team.forEach((member, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'team-admin-card';
        itemDiv.innerHTML = `
            <div class="team-admin-left">
                <img src="${member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" class="team-admin-preview" id="img-preview-${index}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'">
                <label class="btn-upload-photo">
                    <i class="fas fa-camera"></i> Escolher Foto
                    <input type="file" class="admin-t-file-input" data-idx="${index}" accept="image/*" style="display:none;">
                </label>
            </div>
            <div class="team-admin-inputs">
                <div class="row-inputs">
                    <input type="text" class="admin-t-name form-control" value="${member.name}" placeholder="Nome do Barbeiro" style="flex: 2;">
                    <input type="text" class="admin-t-role form-control" value="${member.role}" placeholder="Cargo / Especialidade" style="flex: 2;">
                </div>
                <div class="row-inputs">
                    <input type="text" class="admin-t-photo form-control" value="${member.photo}" placeholder="URL da Foto ou imagens/nome-da-foto.jpg" style="flex: 3;" data-idx="${index}">
                    <input type="text" class="admin-t-instagram form-control" value="${member.instagram || ''}" placeholder="Instagram (URL)" style="flex: 2;">
                </div>
                <textarea class="admin-t-exp form-control" placeholder="Descrição do tempo de experiência na carreira...">${member.exp}</textarea>
                <div class="action-bar-item">
                    <button type="button" class="btn-item-save btn-single-team-save" data-idx="${index}">
                        <i class="fas fa-floppy-disk"></i> Salvar Barbeiro
                    </button>
                    <button type="button" class="btn-item-del btn-del-team" data-index="${index}">
                        <i class="fas fa-trash-can"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        listContainer.appendChild(itemDiv);
    });

    // Upload de Imagem local com compressão
    document.querySelectorAll('.admin-t-file-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            const file = e.target.files[0];
            if (file) {
                compressImage(file, (base64Img) => {
                    const urlInput = document.querySelectorAll('.admin-t-photo')[idx];
                    const imgPreview = document.getElementById(`img-preview-${idx}`);
                    if (urlInput) urlInput.value = base64Img;
                    if (imgPreview) imgPreview.src = base64Img;
                });
            }
        });
    });

    // Atualização do preview ao digitar URL ou caminho local
    document.querySelectorAll('.admin-t-photo').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = e.target.getAttribute('data-idx');
            const imgEl = document.getElementById(`img-preview-${idx}`);
            if (imgEl) imgEl.src = e.target.value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
        });
    });

    // Botão Salvar Individual do Barbeiro
    document.querySelectorAll('.btn-single-team-save').forEach(btn => {
        btn.addEventListener('click', () => {
            siteData = getUpdatedDataFromAdminPage();
            try {
                localStorage.setItem('jhony_site_data', JSON.stringify(siteData));
                alert('Barbeiro salvo com sucesso no navegador!');
            } catch(e) {
                alert('Foto muito pesada para salvar no LocalStorage do navegador. Recomendamos colocar o arquivo da foto dentro da pasta imagens/ do projeto e digitar no campo o caminho: imagens/nome-da-foto.jpg');
            }
        });
    });

    // Botão Excluir Barbeiro
    document.querySelectorAll('.btn-del-team').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.currentTarget.getAttribute('data-index');
            if (confirm('Deseja realmente excluir este profissional?')) {
                siteData.team.splice(idx, 1);
                renderAdminTeamList();
            }
        });
    });
}

function renderAdminServicesList() {
    const listContainer = document.getElementById('admin-services-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    siteData.services.forEach((service, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = 'background: var(--bg-primary); padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid var(--border-color);';
        itemDiv.innerHTML = `
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <input type="text" class="admin-s-title form-control" value="${service.title}" placeholder="Nome do Serviço" style="flex: 2;">
                <input type="text" class="admin-s-price form-control" value="${service.price}" placeholder="Preço (ex: R$ 50,00 ou Consulte valor)" style="flex: 1;">
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <input type="text" class="admin-s-desc form-control" value="${service.desc}" placeholder="Descrição detalhada do serviço" style="flex: 3;">
                <input type="text" class="admin-s-icon form-control" value="${service.icon || 'fas fa-cut'}" placeholder="Classe do Ícone FontAwesome" style="flex: 1;">
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="btn-item-save btn-single-service-save" style="font-size: 0.8rem; padding: 6px 12px;">
                    <i class="fas fa-floppy-disk"></i> Salvar Serviço
                </button>
                <button type="button" class="btn-item-del btn-del-service" data-index="${index}" style="font-size: 0.8rem; padding: 6px 12px;">
                    <i class="fas fa-trash-can"></i> Excluir
                </button>
            </div>
        `;
        listContainer.appendChild(itemDiv);
    });

    document.querySelectorAll('.btn-single-service-save').forEach(btn => {
        btn.addEventListener('click', () => {
            siteData = getUpdatedDataFromAdminPage();
            localStorage.setItem('jhony_site_data', JSON.stringify(siteData));
            alert('Serviço salvo com sucesso!');
        });
    });

    document.querySelectorAll('.btn-del-service').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.currentTarget.getAttribute('data-index');
            if (confirm('Deseja excluir este serviço?')) {
                siteData.services.splice(idx, 1);
                renderAdminServicesList();
            }
        });
    });
}

// Coletar Dados do Admin
function getUpdatedDataFromAdminPage() {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value : '';

    const tNames = document.querySelectorAll('.admin-t-name');
    const tRoles = document.querySelectorAll('.admin-t-role');
    const tPhotos = document.querySelectorAll('.admin-t-photo');
    const tExps = document.querySelectorAll('.admin-t-exp');
    const tInstas = document.querySelectorAll('.admin-t-instagram');

    const updatedTeam = [];
    for (let i = 0; i < tNames.length; i++) {
        updatedTeam.push({
            name: tNames[i].value,
            role: tRoles[i].value,
            photo: tPhotos[i].value,
            exp: tExps[i].value,
            instagram: tInstas[i].value
        });
    }

    const sTitles = document.querySelectorAll('.admin-s-title');
    const sPrices = document.querySelectorAll('.admin-s-price');
    const sDescs = document.querySelectorAll('.admin-s-desc');
    const sIcons = document.querySelectorAll('.admin-s-icon');

    const updatedServices = [];
    for (let i = 0; i < sTitles.length; i++) {
        updatedServices.push({
            title: sTitles[i].value,
            price: sPrices[i].value,
            desc: sDescs[i].value,
            icon: sIcons[i].value
        });
    }

    return {
        logoTitle: getVal('edit-logo-title'),
        logoSub: getVal('edit-logo-sub'),
        heroBadge: getVal('edit-hero-badge'),
        heroTitle: getVal('edit-hero-title'),
        heroDesc: getVal('edit-hero-desc'),
        heroBtnWa: getVal('edit-hero-btn-wa'),
        heroBtnMaps: getVal('edit-hero-btn-maps'),

        teamSubtitle: getVal('edit-team-subtitle'),
        teamTitle: getVal('edit-team-title'),
        teamDesc: getVal('edit-team-desc'),
        team: updatedTeam,

        aboutSubtitle: getVal('edit-about-subtitle'),
        aboutTitle: getVal('edit-about-title'),
        aboutP1: getVal('edit-about-p1'),
        aboutP2: getVal('edit-about-p2'),
        aboutFeat1: getVal('edit-feat-1'),
        aboutFeat2: getVal('edit-feat-2'),
        aboutFeat3: getVal('edit-feat-3'),

        servicesSubtitle: getVal('edit-services-subtitle'),
        servicesTitle: getVal('edit-services-title'),
        servicesDesc: getVal('edit-services-desc'),

        ctaTitle: getVal('edit-cta-title'),
        ctaDesc: getVal('edit-cta-desc'),
        ctaBtnWa: getVal('edit-cta-btn-wa'),
        ctaBtnMaps: 'COMO CHEGAR',

        footerTitle: getVal('edit-logo-title'),
        footerSub: getVal('edit-logo-sub'),
        footerPhone: getVal('edit-footer-phone'),
        whatsappRaw: getVal('edit-whatsapp-raw'),
        footerHours: getVal('edit-footer-hours'),
        socials: {
            instagram: getVal('edit-instagram'),
            facebook: getVal('edit-facebook'),
            maps: getVal('edit-maps')
        },
        services: updatedServices
    };
}

// ============================================================
// GERAR O .ZIP ATUALIZADO DIRETO NO NAVEGADOR (melhoria da v8)
// Só o arquivo dados.js é recriado; os demais são copiados como estão.
// ============================================================
function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

function buildDadosJs(data) {
    return '// Dados padrão do site Jhony Barber — gerado pelo painel admin em ' + new Date().toLocaleString('pt-BR') + '\n' +
           'const defaultSiteData = ' + JSON.stringify(data, null, 4) + ';\n';
}

function slugify(text) {
    return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'barbeiro';
}

async function generateUpdatedZipPackage() {
    const btn = document.getElementById('btn-save-admin-page');
    const originalLabel = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando ZIP...';
    }

    try {
        siteData = getUpdatedDataFromAdminPage();

        // Mantém também no navegador (se a foto for pesada demais, apenas ignora)
        let savedLocally = true;
        try {
            localStorage.setItem('jhony_site_data', JSON.stringify(siteData));
        } catch (e) {
            savedLocally = false;
            console.warn('LocalStorage excedido; o ZIP será gerado normalmente.');
        }

        // Sem a biblioteca JSZip (ex.: sem internet): baixa só o dados.js com tudo embutido
        if (typeof JSZip === 'undefined') {
            downloadBlob(new Blob([buildDadosJs(siteData)], { type: 'text/javascript' }), 'dados.js');
            alert('Não foi possível carregar a biblioteca de ZIP (verifique a internet).\n\nBaixei apenas o arquivo dados.js, já com todas as alterações e fotos. Substitua o dados.js do seu site por ele.');
            return;
        }

        // Cópia para exportação: não altera o siteData que está em uso na tela
        const exportData = JSON.parse(JSON.stringify(siteData));
        const zip = new JSZip();
        const imgFolder = zip.folder('imagens');
        imgFolder.file('COLOQUE_SUAS_FOTOS_AQUI.txt', "Guarde aqui as fotos dos barbeiros (ex: barbeiro1.jpg, barbeiro2.jpg) e informe no painel admin como 'imagens/barbeiro1.jpg'.");

        let photosExtracted = 0;
        let photosCopied = 0;

        for (let i = 0; i < exportData.team.length; i++) {
            const member = exportData.team[i];
            const photo = member.photo || '';

            if (photo.startsWith('data:image')) {
                // Foto enviada pelo painel (Base64) -> vira arquivo real dentro de imagens/
                const comma = photo.indexOf(',');
                const mimeMatch = photo.slice(0, comma).match(/:(.*?);/);
                const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
                let ext = (mime.split('/')[1] || 'jpg').replace(/[^a-z0-9]/gi, '').toLowerCase();
                if (ext === 'jpeg' || !ext) ext = 'jpg';
                const fileName = slugify(member.name) + '_' + (i + 1) + '.' + ext;
                imgFolder.file(fileName, photo.slice(comma + 1), { base64: true });
                member.photo = 'imagens/' + fileName; // atualizado ANTES de gerar o dados.js
                photosExtracted++;
            } else if (photo && !/^(https?:)?\/\//i.test(photo) && !photo.startsWith('data:')) {
                // Caminho local já existente (ex.: imagens/foto.jpg): tenta incluir o arquivo no ZIP
                try {
                    const resp = await fetch(photo);
                    if (resp.ok) {
                        imgFolder.file(photo.replace(/^\.?\/?imagens\//, '').split('?')[0], await resp.blob());
                        photosCopied++;
                    }
                } catch (e) { /* sem acesso (ex.: abriu via file://): a foto já está na pasta do projeto */ }
            }
        }

        zip.file('dados.js', buildDadosJs(exportData));

        // Tenta incluir o site completo (funciona quando o painel está hospedado/servidor)
        const projectFiles = ['index.html', 'admin.html', 'style.css', 'script.js', 'README.md'];
        const included = [];
        for (const name of projectFiles) {
            try {
                const resp = await fetch(name);
                if (resp.ok) {
                    zip.file(name, await resp.text());
                    included.push(name);
                }
            } catch (e) { /* o navegador bloqueou a leitura deste arquivo */ }
        }
        const isFullPackage = included.length >= 4 && included.includes('index.html') && included.includes('script.js');

        zip.file('LEIA-ME_ATUALIZACAO.txt', isFullPackage
            ? 'PACOTE COMPLETO.\nDescompacte e substitua/suba TODOS os arquivos no seu site (ou no GitHub), incluindo a pasta imagens/.\n'
            : 'PACOTE DE ATUALIZAÇÃO (dados + fotos).\nO navegador não permitiu copiar os demais arquivos (isso acontece ao abrir o painel direto do computador).\nBasta COPIAR o arquivo dados.js e a pasta imagens/ para a pasta do seu site, substituindo os atuais. Os outros arquivos (index.html, admin.html, style.css, script.js) não mudaram.\n');

        const blob = await zip.generateAsync({ type: 'blob' });
        downloadBlob(blob, 'jhony_barber_site_atualizado.zip');

        let msg = isFullPackage
            ? 'ZIP COMPLETO gerado com sucesso!\n\nDescompacte e substitua os arquivos do seu site / GitHub.'
            : 'ZIP DE ATUALIZAÇÃO gerado com sucesso!\n\nComo o painel foi aberto direto do computador, o ZIP contém o dados.js e a pasta imagens/. Copie-os para a pasta do seu site, substituindo os atuais.';
        if (photosExtracted) msg += '\n\n' + photosExtracted + ' foto(s) enviada(s) foram salvas como arquivos dentro de imagens/.';
        if (!savedLocally) msg += '\n\nAviso: o navegador não conseguiu guardar a cópia local (fotos pesadas), mas o ZIP está correto.';
        alert(msg);
    } catch (err) {
        console.error(err);
        alert('Ocorreu um erro ao gerar o ZIP. Use "Baixar Apenas Dados (.json)" como alternativa de backup.');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalLabel;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPublicPage();

    // Menu do topo (celular): abrir/fechar
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        const setMenu = (open) => {
            navMenu.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        };
        navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
        window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });
    }

    // Adicionar Barbeiro
    const addTeamHandler = () => {
        siteData.team.push({
            name: 'Novo Barbeiro',
            role: 'BARBEIRO PROFISSIONAL',
            exp: 'Experiência e especialidade na carreira.',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            instagram: 'https://instagram.com'
        });
        renderAdminTeamList();
    };

    if (document.getElementById('btn-add-team-member')) document.getElementById('btn-add-team-member').addEventListener('click', addTeamHandler);
    if (document.getElementById('btn-add-team-member-bottom')) document.getElementById('btn-add-team-member-bottom').addEventListener('click', addTeamHandler);

    // Adicionar Serviço
    if (document.getElementById('btn-add-new-service')) {
        document.getElementById('btn-add-new-service').addEventListener('click', () => {
            siteData.services.push({
                title: 'Novo Serviço',
                desc: 'Descrição do novo serviço.',
                price: 'Consulte valor',
                icon: 'fas fa-cut'
            });
            renderAdminServicesList();
        });
    }

    // Salvar Geral: salva no navegador e gera o .ZIP completo atualizado
    if (document.getElementById('btn-save-admin-page')) {
        document.getElementById('btn-save-admin-page').addEventListener('click', () => {
            generateUpdatedZipPackage();
        });
    }

    // Exportar JSON Backup
    if (document.getElementById('btn-export-json')) {
        document.getElementById('btn-export-json').addEventListener('click', () => {
            const dataToExport = getUpdatedDataFromAdminPage();
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "jhony_barber_site_backup.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
    }

    // Importar JSON Backup
    const btnImportTrigger = document.getElementById('btn-import-trigger');
    const inputImportJson = document.getElementById('input-import-json');
    if (btnImportTrigger && inputImportJson) {
        btnImportTrigger.addEventListener('click', () => inputImportJson.click());
        inputImportJson.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    if (importedData.team && importedData.services) {
                        siteData = importedData;
                        localStorage.setItem('jhony_site_data', JSON.stringify(siteData));
                        loadAdminPageData();
                        alert('Backup importado com sucesso!');
                    } else {
                        alert('Arquivo JSON com estrutura inválida.');
                    }
                } catch (err) {
                    alert('Erro ao carregar arquivo de backup.');
                }
            };
            reader.readAsText(file);
        });
    }

    // Exportar Código para script.js
    if (document.getElementById('btn-export-code')) {
        document.getElementById('btn-export-code').addEventListener('click', () => {
            const currentData = getUpdatedDataFromAdminPage();
            const jsSnippet = `const defaultSiteData = ${JSON.stringify(currentData, null, 4)};`;
            navigator.clipboard.writeText(jsSnippet).then(() => {
                alert('Código copiado com sucesso! Abra o arquivo dados.js no computador/GitHub e substitua todo o bloco defaultSiteData.');
            }).catch(() => {
                alert('Erro ao copiar código para a área de transferência.');
            });
        });
    }
});
