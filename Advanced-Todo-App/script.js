/**
 * Advanced Todo List Application
 * Version 2.0
 * 
 * Features:
 * - Multiple tabs (Tasks, Categories, Statistics)
 * - Priority management (High, Medium, Low)
 * - Custom categories
 * - Advanced filtering & sorting
 * - Statistics and analytics
 * - LocalStorage persistence
 * - Import/Export functionality
 */

// ========================================
// Todo Class
// ========================================

class Todo {
    constructor(text, priority = 'medium', category = '', dueDate = null) {
        this.id = Date.now();
        this.text = text;
        this.priority = priority;
        this.category = category;
        this.completed = false;
        this.important = false;
        this.dueDate = dueDate;
        this.createdAt = new Date();
        this.completedAt = null;
    }

    toggleComplete() {
        this.completed = !this.completed;
        if (this.completed) {
            this.completedAt = new Date();
        } else {
            this.completedAt = null;
        }
    }

    toggleImportant() {
        this.important = !this.important;
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text,
            priority: this.priority,
            category: this.category,
            completed: this.completed,
            important: this.important,
            dueDate: this.dueDate,
            createdAt: this.createdAt.toISOString(),
            completedAt: this.completedAt ? this.completedAt.toISOString() : null
        };
    }

    static fromJSON(data) {
        const todo = new Todo(data.text, data.priority, data.category, data.dueDate);
        todo.id = data.id;
        todo.completed = data.completed;
        todo.important = data.important;
        todo.createdAt = new Date(data.createdAt);
        todo.completedAt = data.completedAt ? new Date(data.completedAt) : null;
        return todo;
    }
}

// ========================================
// Category Class
// ========================================

class Category {
    constructor(name, color = '#6366f1') {
        this.id = Date.now();
        this.name = name;
        this.color = color;
        this.createdAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            createdAt: this.createdAt.toISOString()
        };
    }

    static fromJSON(data) {
        const category = new Category(data.name, data.color);
        category.id = data.id;
        category.createdAt = new Date(data.createdAt);
        return category;
    }
}

// ========================================
// TodoManager Class
// ========================================

class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.categories = this.loadCategories();
        this.currentFilter = 'all';
        this.currentSort = 'newest';
    }

    // ---- Storage Methods ----

    loadTodos() {
        try {
            const data = localStorage.getItem('todos');
            return data ? JSON.parse(data).map(item => Todo.fromJSON(item)) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }

    loadCategories() {
        try {
            const data = localStorage.getItem('categories');
            return data ? JSON.parse(data).map(item => Category.fromJSON(item)) : [];
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos.map(t => t.toJSON())));
            this.broadcastUpdate();
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }

    saveCategories() {
        try {
            localStorage.setItem('categories', JSON.stringify(this.categories.map(c => c.toJSON())));
            this.broadcastUpdate();
        } catch (error) {
            console.error('Error saving categories:', error);
        }
    }

    // ---- Todo Methods ----

    addTodo(text, priority = 'medium', category = '') {
        if (!text.trim()) return null;
        const todo = new Todo(text.trim(), priority, category);
        this.todos.unshift(todo);
        this.saveTodos();
        return todo;
    }

    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }

    updateTodo(id, text, priority, category) {
        const todo = this.getTodo(id);
        if (!todo) return null;
        if (text !== undefined) todo.text = text.trim();
        if (priority !== undefined) todo.priority = priority;
        if (category !== undefined) todo.category = category;
        this.saveTodos();
        return todo;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        this.saveTodos();
        return true;
    }

    toggleComplete(id) {
        const todo = this.getTodo(id);
        if (!todo) return null;
        todo.toggleComplete();
        this.saveTodos();
        return todo;
    }

    toggleImportant(id) {
        const todo = this.getTodo(id);
        if (!todo) return null;
        todo.toggleImportant();
        this.saveTodos();
        return todo;
    }

    // ---- Category Methods ----

    addCategory(name, color) {
        if (!name.trim()) return null;
        const category = new Category(name.trim(), color);
        this.categories.push(category);
        this.saveCategories();
        return category;
    }

    getCategory(id) {
        return this.categories.find(cat => cat.id === id);
    }

    deleteCategory(id) {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index === -1) return false;
        this.categories.splice(index, 1);
        // Remove category from todos
        this.todos.forEach(todo => {
            if (todo.category === id) todo.category = '';
        });
        this.saveCategories();
        this.saveTodos();
        return true;
    }

    // ---- Filtering & Sorting ----

    getFilteredTodos() {
        let filtered = this.todos;

        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case 'completed':
                filtered = filtered.filter(todo => todo.completed);
                break;
            case 'important':
                filtered = filtered.filter(todo => todo.important);
                break;
            case 'all':
            default:
                break;
        }

        return this.getSortedTodos(filtered);
    }

    getSortedTodos(todos) {
        const sorted = [...todos];

        switch (this.currentSort) {
            case 'oldest':
                sorted.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
                break;
            case 'alphabetical':
                sorted.sort((a, b) => a.text.localeCompare(b.text));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        return sorted;
    }

    // ---- Statistics ----

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const important = this.todos.filter(t => t.important).length;

        const byPriority = {
            high: this.todos.filter(t => t.priority === 'high').length,
            medium: this.todos.filter(t => t.priority === 'medium').length,
            low: this.todos.filter(t => t.priority === 'low').length
        };

        const byCategory = {};
        this.categories.forEach(cat => {
            byCategory[cat.id] = {
                name: cat.name,
                count: this.todos.filter(t => t.category === cat.id).length
            };
        });

        return {
            total,
            completed,
            active,
            important,
            completionPercent: total === 0 ? 0 : Math.round((completed / total) * 100),
            byPriority,
            byCategory
        };
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
    }

    // ---- Import/Export ----

    exportData() {
        return JSON.stringify({
            todos: this.todos.map(t => t.toJSON()),
            categories: this.categories.map(c => c.toJSON()),
            exportedAt: new Date().toISOString()
        }, null, 2);
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.todos = (data.todos || []).map(item => Todo.fromJSON(item));
            this.categories = (data.categories || []).map(item => Category.fromJSON(item));
            this.saveTodos();
            this.saveCategories();
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    broadcastUpdate() {
        window.dispatchEvent(new CustomEvent('todoUpdate', { detail: this.getStats() }));
    }
}

// ========================================
// TodoUI Class
// ========================================

class TodoUI {
    constructor(manager) {
        this.manager = manager;
        this.setupElements();
        this.attachEventListeners();
        this.renderAll();
        this.listenForUpdates();
    }

    setupElements() {
        // Tabs
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Input
        this.todoInput = document.getElementById('todoInput');
        this.categorySelect = document.getElementById('categorySelect');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');

        // Filters & Sort
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.clearBtn = document.getElementById('clearBtn');

        // Display
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');

        // Stats
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.pendingCount = document.getElementById('pendingCount');

        // Categories
        this.categoryNameInput = document.getElementById('categoryNameInput');
        this.categoryColorInput = document.getElementById('categoryColorInput');
        this.addCategoryBtn = document.getElementById('addCategoryBtn');
        this.categoriesList = document.getElementById('categoriesList');

        // Statistics
        this.progressCircle = document.getElementById('progressCircle');
        this.progressText = document.getElementById('progressText');
        this.highCount = document.getElementById('highCount');
        this.mediumCount = document.getElementById('mediumCount');
        this.lowCount = document.getElementById('lowCount');
        this.categoryStats = document.getElementById('categoryStats');

        // Footer
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
    }

    attachEventListeners() {
        // Tabs
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleTabChange(btn));
        });

        // Input
        this.addBtn.addEventListener('click', () => this.handleAddTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTodo();
        });

        // Filters
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn.dataset.filter));
        });

        // Sort
        this.sortSelect.addEventListener('change', (e) => {
            this.manager.currentSort = e.target.value;
            this.renderTodos();
        });

        // Clear
        this.clearBtn.addEventListener('click', () => this.handleClearCompleted());

        // Categories
        this.addCategoryBtn.addEventListener('click', () => this.handleAddCategory());
        this.categoryNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddCategory();
        });

        // Footer
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.importBtn.addEventListener('click', () => this.handleImport());
    }

    listenForUpdates() {
        window.addEventListener('todoUpdate', () => this.updateStats());
    }

    // ---- Tab Handling ----

    handleTabChange(btn) {
        this.tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabName = btn.dataset.tab;
        this.tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');

        if (tabName === 'stats') {
            this.renderStatistics();
        } else if (tabName === 'categories') {
            this.renderCategories();
        }
    }

    // ---- Todo Handling ----

    handleAddTodo() {
        const text = this.todoInput.value;
        const priority = this.prioritySelect.value;
        const category = this.categorySelect.value;

        if (!text.trim()) {
            this.shake(this.todoInput);
            return;
        }

        this.manager.addTodo(text, priority, category);
        this.todoInput.value = '';
        this.prioritySelect.value = 'medium';
        this.categorySelect.value = '';
        this.todoInput.focus();
        this.renderTodos();
    }

    handleToggleComplete(id) {
        this.manager.toggleComplete(id);
        this.renderTodos();
    }

    handleToggleImportant(id) {
        this.manager.toggleImportant(id);
        this.renderTodos();
    }

    handleDeleteTodo(id) {
        if (confirm('Delete this task?')) {
            this.manager.deleteTodo(id);
            this.renderTodos();
        }
    }

    handleFilter(filter) {
        this.manager.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTodos();
    }

    handleClearCompleted() {
        if (this.manager.todos.filter(t => t.completed).length === 0) {
            alert('No completed tasks to clear');
            return;
        }
        if (confirm('Clear all completed tasks?')) {
            this.manager.clearCompleted();
            this.renderTodos();
        }
    }

    // ---- Category Handling ----

    handleAddCategory() {
        const name = this.categoryNameInput.value;
        const color = this.categoryColorInput.value;

        if (!name.trim()) {
            this.shake(this.categoryNameInput);
            return;
        }

        this.manager.addCategory(name, color);
        this.categoryNameInput.value = '';
        this.categoryColorInput.value = '#6366f1';
        this.renderCategories();
        this.updateCategorySelect();
    }

    handleDeleteCategory(id) {
        if (confirm('Delete this category?')) {
            this.manager.deleteCategory(id);
            this.renderCategories();
            this.updateCategorySelect();
        }
    }

    updateCategorySelect() {
        const selected = this.categorySelect.value;
        this.categorySelect.innerHTML = '<option value="">Select Category...</option>';
        this.manager.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            this.categorySelect.appendChild(option);
        });
        this.categorySelect.value = selected;
    }

    // ---- Rendering ----

    renderAll() {
        this.renderTodos();
        this.updateCategorySelect();
        this.updateStats();
    }

    renderTodos() {
        const todos = this.manager.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (this.manager.todos.length === 0) {
            this.emptyState.style.display = 'flex';
            return;
        }

        this.emptyState.style.display = 'none';

        todos.forEach(todo => {
            const li = this.createTodoElement(todo);
            this.todoList.appendChild(li);
        });

        this.updateFilterCounts();
        this.updateStats();
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.priority}-priority`;
        if (todo.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.handleToggleComplete(todo.id));

        const content = document.createElement('div');
        content.className = 'todo-content';

        const text = document.createElement('div');
        text.className = 'todo-text';
        text.textContent = todo.text;

        const meta = document.createElement('div');
        meta.className = 'todo-meta';

        const date = document.createElement('span');
        date.className = 'todo-date';
        date.textContent = `📅 ${this.formatDate(todo.createdAt)}`;

        const badge = document.createElement('span');
        badge.className = `priority-badge ${todo.priority}`;
        badge.textContent = todo.priority.toUpperCase();

        if (todo.category) {
            const category = this.manager.getCategory(todo.category);
            if (category) {
                const catBadge = document.createElement('span');
                catBadge.className = 'category-badge';
                catBadge.textContent = category.name;
                catBadge.style.borderColor = category.color;
                meta.appendChild(catBadge);
            }
        }

        meta.appendChild(date);
        meta.appendChild(badge);
        content.appendChild(text);
        content.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const starBtn = document.createElement('button');
        starBtn.className = `action-btn star-btn ${todo.important ? 'marked' : ''}`;
        starBtn.innerHTML = '<i class="fas fa-star"></i>';
        starBtn.title = 'Mark as important';
        starBtn.addEventListener('click', () => this.handleToggleImportant(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => this.handleDeleteTodo(todo.id));

        actions.appendChild(starBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        return li;
    }

    renderCategories() {
        this.categoriesList.innerHTML = '';

        if (this.manager.categories.length === 0) {
            this.categoriesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No categories yet</p>';
            return;
        }

        this.manager.categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'category-item';
            div.style.borderLeftColor = category.color;

            const name = document.createElement('div');
            name.className = 'category-name';
            name.textContent = category.name;

            const count = document.createElement('span');
            count.className = 'category-count';
            const taskCount = this.manager.todos.filter(t => t.category === category.id).length;
            count.textContent = `${taskCount} tasks`;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-category-btn';
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.addEventListener('click', () => this.handleDeleteCategory(category.id));

            div.appendChild(name);
            div.appendChild(count);
            div.appendChild(deleteBtn);
            this.categoriesList.appendChild(div);
        });
    }

    renderStatistics() {
        const stats = this.manager.getStats();

        // Progress circle
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (stats.completionPercent / 100) * circumference;
        this.progressCircle.style.strokeDasharray = circumference;
        this.progressCircle.style.strokeDashoffset = offset;
        this.progressText.textContent = `${stats.completionPercent}%`;

        // Priority stats
        this.highCount.textContent = stats.byPriority.high;
        this.mediumCount.textContent = stats.byPriority.medium;
        this.lowCount.textContent = stats.byPriority.low;

        // Category stats
        this.categoryStats.innerHTML = '';
        Object.values(stats.byCategory).forEach(cat => {
            const div = document.createElement('div');
            div.className = 'category-stat-item';
            div.innerHTML = `
                <span class="category-stat-label">${cat.name}</span>
                <span class="stat-count">${cat.count}</span>
            `;
            this.categoryStats.appendChild(div);
        });

        if (this.manager.categories.length === 0) {
            this.categoryStats.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No categories</p>';
        }
    }

    updateFilterCounts() {
        const counts = {
            all: this.manager.todos.length,
            active: this.manager.todos.filter(t => !t.completed).length,
            completed: this.manager.todos.filter(t => t.completed).length,
            important: this.manager.todos.filter(t => t.important).length
        };

        this.filterBtns.forEach(btn => {
            const filter = btn.dataset.filter;
            const countSpan = btn.querySelector('.count');
            if (countSpan) countSpan.textContent = counts[filter];
        });
    }

    updateStats() {
        const stats = this.manager.getStats();
        this.totalCount.textContent = stats.total;
        this.completedCount.textContent = stats.completed;
        this.pendingCount.textContent = stats.active;
    }

    // ---- Import/Export ----

    handleExport() {
        const data = this.manager.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    handleImport() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (this.manager.importData(event.target.result)) {
                    this.renderAll();
                    alert('Todos imported successfully!');
                } else {
                    alert('Error importing todos');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // ---- Utility ----

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    }

    shake(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.3s ease';
        }, 10);
    }
}

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const manager = new TodoManager();
    const ui = new TodoUI(manager);

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Make available globally
    window.todoApp = { manager, ui };
});
