const CATEGORIES = [
  {
    id: 'vegetable', name: '野菜', color: '#7ab648', bg: '#f0f7e8',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 17C22 11 15 10 13 14"/>
      <path d="M24 17C24 9 24 6 24 6"/>
      <path d="M24 17C26 11 33 10 35 14"/>
      <path d="M18 22Q15 32 24 43Q33 32 30 22Q27 17 24 17Q21 17 18 22Z"/>
      <path d="M20 28Q24 26 28 28"/>
      <path d="M21 34Q24 32 27 34"/>
    </svg>`
  },
  {
    id: 'meat', name: '肉', color: '#e87a5a', bg: '#fdf0ec',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 14Q6 14 6 18L6 30Q6 34 10 34L38 34Q42 34 42 30L42 18Q42 14 38 14Z"/>
      <circle cx="24" cy="24" r="3"/>
      <line x1="3" y1="24" x2="11" y2="24"/>
      <line x1="37" y1="24" x2="45" y2="24"/>
      <circle cx="3" cy="24" r="2.5"/>
      <circle cx="45" cy="24" r="2.5"/>
    </svg>`
  },
  {
    id: 'seafood', name: '魚介', color: '#5aaec8', bg: '#e8f5fb',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24C12 24 20 14 30 18C38 21 40 24 40 24C40 24 38 28 30 30C20 34 12 24 12 24Z"/>
      <path d="M12 24L5 17"/>
      <path d="M12 24L5 31"/>
      <circle cx="33" cy="21" r="2" fill="currentColor"/>
      <path d="M24 19C27 17 30 18 30 18"/>
    </svg>`
  },
  {
    id: 'egg', name: '卵', color: '#f0b830', bg: '#fdf7e4',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 7C18 7 12 16 12 27C12 37 17 43 24 43C31 43 36 37 36 27C36 16 30 7 24 7Z"/>
    </svg>`
  },
  {
    id: 'soup', name: 'スープ', color: '#e07040', bg: '#fdf1ea',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="9" y1="13" x2="39" y2="13"/>
      <path d="M9 13L13 33H35L39 13"/>
      <rect x="3" y="11" width="7" height="5" rx="1.5"/>
      <rect x="38" y="11" width="7" height="5" rx="1.5"/>
      <path d="M14 42Q14 38 17 38Q20 38 20 42"/>
      <path d="M22 42Q22 38 25 38Q28 38 28 42"/>
      <path d="M30 42Q30 38 33 38Q36 38 36 42"/>
    </svg>`
  },
  {
    id: 'rice', name: 'ごはん', color: '#5fbfb0', bg: '#e8f7f5',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13Q24 7 30 13"/>
      <path d="M14 22Q16 13 24 13Q32 13 34 22"/>
      <line x1="11" y1="33" x2="37" y2="33"/>
      <path d="M14 22C14 22 12 27 12 33"/>
      <path d="M34 22C34 22 36 27 36 33"/>
      <path d="M12 33Q12 43 24 43Q36 43 36 33"/>
    </svg>`
  },
  {
    id: 'noodle', name: '麺', color: '#d4943a', bg: '#fdf4e4',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="20" rx="16" ry="3.5"/>
      <path d="M8 20Q9 36 24 38Q39 36 40 20"/>
      <path d="M18 38Q24 40 30 38"/>
      <path d="M12 26Q16 24 20 26Q24 28 28 26Q32 24 36 26"/>
      <line x1="21" y1="16" x2="30" y2="6"/>
      <line x1="25" y1="16" x2="34" y2="6"/>
    </svg>`
  },
  {
    id: 'sweets', name: 'スイーツ', color: '#e078a8', bg: '#fdeef5',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="32" height="17" rx="2"/>
      <line x1="8" y1="32" x2="40" y2="32"/>
      <path d="M8 24Q11 16 14 24Q17 16 20 24Q23 16 26 24Q29 16 32 24Q35 16 38 24Q40 16 40 24"/>
      <path d="M21 16C21 13 24 11 24 11C24 11 27 13 27 16L24 20Z"/>
      <line x1="24" y1="11" x2="24" y2="8"/>
    </svg>`
  },
];

const STORAGE_KEY = 'fav_recipes';

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderCategories() {
  const data = loadData();
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = (data[cat.id] || []).length;
    const badgeCls = count === 0 ? 'category-count zero' : 'category-count';
    return `
      <div class="category-card" data-id="${cat.id}" role="button" tabindex="0" aria-label="${cat.name}">
        <span class="${badgeCls}">${count}</span>
        <span class="category-icon-wrap" style="background:${cat.bg};color:${cat.color}">
          ${cat.icon}
        </span>
        <span class="category-name">${cat.name}</span>
      </div>`;
  }).join('');

  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => openCategory(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openCategory(card.dataset.id);
    });
  });
}

let currentCategoryId = null;

function openCategory(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  currentCategoryId = id;
  document.querySelector('.categories-section').style.display = 'none';
  document.getElementById('recipeSection').style.display = 'block';
  document.getElementById('recipeTitle').innerHTML =
    `<span style="color:${cat.color}">${cat.icon}</span> ${cat.name}`;
  document.getElementById('recipeNameInput').value = '';
  document.getElementById('recipeLinkInput').value = '';
  document.getElementById('formError').textContent = '';
  renderRecipes(id);
}

function renderRecipes(id) {
  const data = loadData();
  const recipes = data[id] || [];
  const list = document.getElementById('recipeList');
  const cat = CATEGORIES.find(c => c.id === id);

  if (recipes.length === 0) {
    list.innerHTML = '<p class="empty-msg">まだレシピが登録されていません</p>';
    return;
  }

  list.innerHTML = recipes.map((r, i) => `
    <div class="recipe-item">
      <span class="recipe-item-icon" style="color:${cat.color}">${cat.icon}</span>
      <div class="recipe-item-info">
        <div class="recipe-item-name">${escapeHtml(r.name)}</div>
        <div class="recipe-item-link">
          <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.url)}</a>
        </div>
      </div>
      <button class="delete-btn" data-index="${i}" aria-label="削除">削除</button>
    </div>`).join('');

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteRecipe(id, Number(btn.dataset.index)));
  });
}

function addRecipe() {
  const nameInput = document.getElementById('recipeNameInput');
  const linkInput = document.getElementById('recipeLinkInput');
  const errorEl  = document.getElementById('formError');
  const name = nameInput.value.trim();
  const url  = linkInput.value.trim();

  if (!name) { errorEl.textContent = 'レシピ名を入力してください'; nameInput.focus(); return; }
  if (!url)  { errorEl.textContent = 'URLを入力してください'; linkInput.focus(); return; }
  if (!isValidUrl(url)) {
    errorEl.textContent = '正しいURL形式で入力してください（例：https://...）';
    linkInput.focus(); return;
  }

  errorEl.textContent = '';
  const data = loadData();
  if (!data[currentCategoryId]) data[currentCategoryId] = [];
  data[currentCategoryId].push({ name, url });
  saveData(data);
  nameInput.value = '';
  linkInput.value = '';
  nameInput.focus();
  renderRecipes(currentCategoryId);
}

function deleteRecipe(id, index) {
  const data = loadData();
  data[id].splice(index, 1);
  saveData(data);
  renderRecipes(id);
}

function backToCategories() {
  currentCategoryId = null;
  document.querySelector('.categories-section').style.display = 'block';
  document.getElementById('recipeSection').style.display = 'none';
  renderCategories();
}

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch { return false; }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

document.getElementById('backBtn').addEventListener('click', backToCategories);
document.getElementById('addBtn').addEventListener('click', addRecipe);
document.getElementById('recipeLinkInput').addEventListener('keydown', e => { if (e.key === 'Enter') addRecipe(); });
document.getElementById('recipeNameInput').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('recipeLinkInput').focus(); });

renderCategories();
