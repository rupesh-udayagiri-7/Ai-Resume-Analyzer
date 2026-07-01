/**
 * Advanced Todo List Application - Version 3.0
 * 
 * New Features:
 * - Notifications & Reminders
 * - Search & Quick Filter
 * - Time Tracking
 * - Recurring Tasks (Daily, Weekly, Monthly)
 * - Subtasks Support
 * - Dark/Light Theme Toggle
 * - Due Dates with Countdown
 * - Advanced Analytics
 * - Customizable Color Themes
 * - Task Notes & Comments
 * - Keyboard Shortcuts
 * - Undo/Redo Functionality
 * - Bulk Actions
 */

// ========================================
// Todo Class (Enhanced)
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
        this.notes = '';
        this.timeSpent = 0; // in minutes
        this.isTracking = false;
        this.subtasks = [];
        this.recurring = null; // 'daily', 'weekly', 'monthly'
        this.tags = [];
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

    addSubtask(text) {
        const subtask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        this.subtasks.push(subtask);
        return subtask;
    }

    toggleSubtask(subtaskId) {
        const subtask = this.subtasks.find(s => s.id === subtaskId);
        if (subtask) subtask.completed = !subtask.completed;
    }

    startTimeTracking() {
        this.isTracking = true;
        this.trackingStart = Date.now();
    }

    stopTimeTracking() {
        if (this.isTracking && this.trackingStart) {
            const elapsed = Math.floor((Date.now() - this.trackingStart) / 60000);
            this.timeSpent += elapsed;
            this.isTracking = false;
        }
    }

    addNote(note) {
        this.notes = note;
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
            completedAt: this.completedAt ? this.completedAt.toISOString() : null,
            notes: this.notes,
            timeSpent: this.timeSpent,
            subtasks: this.subtasks,
            recurring: this.recurring,
            tags: this.tags
        };
    }

    static fromJSON(data) {
        const todo = new Todo(data.text, data.priority, data.category, data.dueDate);
        todo.id = data.id;
        todo.completed = data.completed;
        todo.important = data.important;
        todo.createdAt = new Date(data.createdAt);
        todo.completedAt = data.completedAt ? new Date(data.completedAt) : null;
        todo.notes = data.notes || '';
        todo.timeSpent = data.timeSpent || 0;
        todo.subtasks = data.subtasks || [];
        todo.recurring = data.recurring || null;
        todo.tags = data.tags || [];
        return todo;
    }
}

// ========================================
// Category Class (Enhanced)
// ========================================

class Category {
    constructor(name, color = '#6366f1') {
        this.id = Date.now();
        this.name = name;
        this.color = color;
        this.createdAt = new Date();
        this.icon = '📁';
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            createdAt: this.createdAt.toISOString(),
            icon: this.icon
        };
    }

    static fromJSON(data) {
        const category = new Category(data.name, data.color);
        category.id = data.id;
        category.createdAt = new Date(data.createdAt);
        category.icon = data.icon || '📁';
        return category;
    }
}

// ========================================
// TodoManager Class (Enhanced)
// ========================================

class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.categories = this.loadCategories();
        this.theme = this.loadTheme() || 'dark';
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        this.history = [];
        this.historyIndex = -1;
    }

    // ---- Theme Methods ----

    loadTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        this.broadcastUpdate();
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
        this.saveStateToHistory();
        this.saveTodos();
        return todo;
    }

    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }

    updateTodo(id, updates) {
        const todo = this.getTodo(id);
        if (!todo) return null;
        
        Object.assign(todo, updates);
        this.saveStateToHistory();
        this.saveTodos();
        return todo;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        this.saveStateToHistory();
        this.saveTodos();
        return true;
    }

    toggleComplete(id) {
        const todo = this.getTodo(id);
        if (!todo) return null;
        todo.toggleComplete();
        this.saveStateToHistory();
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

    // ---- Search Methods ----

    searchTodos(query) {
        this.searchQuery = query.toLowerCase();
        return this.getFilteredTodos();
    }

    // ---- Filtering & Sorting ----

    getFilteredTodos() {
        let filtered = this.todos;

        // Apply status filter
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
            case 'overdue':
                filtered = filtered.filter(todo => {
                    if (!todo.dueDate || todo.completed) return false;
                    return new Date(todo.dueDate) < new Date();
                });
                break;
            case 'today':
                filtered = filtered.filter(todo => {
                    if (!todo.dueDate) return false;
                    const today = new Date();
                    const dueDate = new Date(todo.dueDate);
                    return dueDate.toDateString() === today.toDateString();
                });
                break;
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(todo =>
                todo.text.toLowerCase().includes(this.searchQuery) ||
                todo.notes.toLowerCase().includes(this.searchQuery) ||
                todo.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
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
            case 'duedate':
                sorted.sort((a, b) => {
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case 'timetracking':
                sorted.sort((a, b) => b.timeSpent - a.timeSpent);
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        return sorted;
    }

    // ---- Category Methods ----

    addCategory(name, color, icon = '📁') {
        if (!name.trim()) return null;
        const category = new Category(name.trim(), color);
        category.icon = icon;
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
        this.todos.forEach(todo => {
            if (todo.category === id) todo.category = '';
        });
        this.saveCategories();
        this.saveTodos();
        return true;
    }

    // ---- Statistics ----

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const important = this.todos.filter(t => t.important).length;
        const overdue = this.todos.filter(t => {
            if (!t.dueDate || t.completed) return false;
            return new Date(t.dueDate) < new Date();
        }).length;

        const byPriority = {
            high: this.todos.filter(t => t.priority === 'high').length,
            medium: this.todos.filter(t => t.priority === 'medium').length,
            low: this.todos.filter(t => t.priority === 'low').length
        };

        const totalTimeSpent = this.todos.reduce((sum, t) => sum + t.timeSpent, 0);

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
            overdue,
            completionPercent: total === 0 ? 0 : Math.round((completed / total) * 100),
            byPriority,
            byCategory,
            totalTimeSpent
        };
    }

    // ---- History/Undo-Redo ----

    saveStateToHistory() {
        this.historyIndex++;
        this.history = this.history.slice(0, this.historyIndex);
        this.history.push(JSON.stringify(this.todos.map(t => t.toJSON())));
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.todos = JSON.parse(this.history[this.historyIndex]).map(item => Todo.fromJSON(item));
            this.saveTodos();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.todos = JSON.parse(this.history[this.historyIndex]).map(item => Todo.fromJSON(item));
            this.saveTodos();
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveStateToHistory();
        this.saveTodos();
    }

    // ---- Import/Export ----

    exportData() {
        return JSON.stringify({
            todos: this.todos.map(t => t.toJSON()),
            categories: this.categories.map(c => c.toJSON()),
            exportedAt: new Date().toISOString(),
            version: '3.0'
        }, null, 2);
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.todos = (data.todos || []).map(item => Todo.fromJSON(item));
            this.categories = (data.categories || []).map(item => Category.fromJSON(item));
            this.saveStateToHistory();
            this.saveTodos();
            this.saveCategories();
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // ---- Notifications ----

    checkNotifications() {
        const now = new Date();
        const upcomingTodos = this.todos.filter(todo => {
            if (!todo.dueDate || todo.completed) return false;
            const dueDate = new Date(todo.dueDate);
            const diffMinutes = (dueDate - now) / (1000 * 60);
            return diffMinutes > 0 && diffMinutes <= 30 && diffMinutes > 0;
        });

        if (upcomingTodos.length > 0 && 'Notification' in window) {
            upcomingTodos.forEach(todo => {
                new Notification('Task Reminder', {
                    body: `Task "${todo.text}" is due soon!`,
                    icon: '⏰'
                });
            });
        }

        return upcomingTodos;
    }

    broadcastUpdate() {
        window.dispatchEvent(new CustomEvent('todoUpdate', { detail: this.getStats() }));
    }
}

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const manager = new TodoManager();

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Check for notifications every minute
    setInterval(() => manager.checkNotifications(), 60000);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') {
                e.preventDefault();
                manager.undo();
            } else if (e.key === 'y') {
                e.preventDefault();
                manager.redo();
            } else if (e.key === 'f') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) searchInput.focus();
            }
        }
    });

    // Make available globally
    window.todoApp = { manager };
});
