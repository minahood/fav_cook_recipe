const CATEGORIES = [
  { id: 'vegetable', name: '野菜',   icon: '🥕' },
  { id: 'meat',      name: '肉',     icon: '🥩' },
  { id: 'seafood',   name: '魚介',   icon: '🦐' },
  { id: 'egg',       name: '卵',     icon: '🥚' },
  { id: 'soup',      name: 'スープ', icon: '🍲' },
  { id: 'rice',      name: 'ごはん', icon: '🍚' },
  { id: 'noodle',    name: '麺',     icon: '🍜' },
  { id: 'sweets',    name: 'スイーツ', icon: '🍰' },
];

const STORAGE_KEY = 'fav_recipes';

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function countBadge(count) {
  const cls = count === 0 ? 'category-count zero' : 'category-count';
  return `<span class="${cls}">${count}</span>`;
}

function renderCategories() {
  const data = loadData();
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = (data[cat.id] || []).length;
    return `
      <div class="category-card" data-id="${cat.id}" role="button" tabindex="0" aria-label="${cat.name}">
        ${countBadge(count)}
        <span class="category-icon">${cat.icon}</span>
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

  document.getElementById('categoriesSection') && (document.querySelector('.categories-section').style.display = 'none');
  document.querySelector('.categories-section').style.display = 'none';
  document.getElementById('recipeSection').style.display = 'block';
  document.getElementById('recipeTitle').textContent = `${cat.icon} ${cat.name}`;
  document.getElementById('recipeNameInput').value = '';
  document.getElementById('recipeLinkInput').value = '';
  document.getElementById('formError').textContent = '';

  renderRecipes(id);
}

function renderRecipes(id) {
  const data = loadData();
  const recipes = data[id] || [];
  const list = document.getElementById('recipeList');

  if (recipes.length === 0) {
    list.innerHTML = '<p class="empty-msg">まだレシピが登録されていません</p>';
    return;
  }

  const cat = CATEGORIES.find(c => c.id === id);
  list.innerHTML = recipes.map((r, i) => `
    <div class="recipe-item">
      <span class="recipe-item-icon">${cat.icon}</span>
      <div class="recipe-item-info">
        <div class="recipe-item-name">${escapeHtml(r.name)}</div>
        <div class="recipe-item-link"><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.url)}</a></div>
      </div>
      <button class="delete-btn" data-index="${i}">削除</button>
    </div>`).join('');

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteRecipe(id, Number(btn.dataset.index)));
  });
}

function addRecipe() {
  const nameInput = document.getElementById('recipeNameInput');
  const linkInput = document.getElementById('recipeLinkInput');
  const errorEl = document.getElementById('formError');
  const name = nameInput.value.trim();
  const url = linkInput.value.trim();

  if (!name) {
    errorEl.textContent = 'レシピ名を入力してください';
    nameInput.focus();
    return;
  }
  if (!url) {
    errorEl.textContent = 'URLを入力してください';
    linkInput.focus();
    return;
  }
  if (!isValidUrl(url)) {
    errorEl.textContent = '正しいURL形式で入力してください（例：https://...）';
    linkInput.focus();
    return;
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
  } catch {
    return false;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.getElementById('backBtn').addEventListener('click', backToCategories);
document.getElementById('addBtn').addEventListener('click', addRecipe);
document.getElementById('recipeLinkInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addRecipe();
});
document.getElementById('recipeNameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('recipeLinkInput').focus();
});

renderCategories();
