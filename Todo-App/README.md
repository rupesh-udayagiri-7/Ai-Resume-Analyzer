# 📝 Todo List Application

A modern, feature-rich todo list application with **local storage persistence**, **priority management**, **filtering**, and **sorting capabilities**. Built with vanilla JavaScript, HTML5, and CSS3.

## ✨ Features

### Core Features
- ✅ **Add Tasks** - Create new tasks with priority levels (Low, Medium, High)
- ✅ **Mark Complete** - Check off completed tasks with visual feedback
- ✅ **Delete Tasks** - Remove individual tasks or all tasks at once
- ✅ **Local Storage** - Automatically saves all tasks to browser storage
- ✅ **Persistent Data** - Tasks remain even after browser refresh

### Advanced Features
- 🔍 **Filter Tasks** - View by status (All, Active, Completed) or priority
- 📊 **Sort Options** - Sort by newest, oldest, priority, or alphabetically
- 📈 **Statistics** - Real-time progress tracking and task counts
- 🎨 **Visual Priority** - Color-coded priority badges and borders
- ⚡ **Quick Actions** - Clear completed or delete all tasks
- 🎯 **Search & Filter** - Multiple filter options with live updates
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Eye-friendly dark mode design

## 🚀 Getting Started

### Quick Start

1. **Clone or Download**
   ```bash
   git clone https://github.com/rupesh-udayagiri-7/Ai-Resume-Analyzer.git
   cd Todo-App
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

3. **Start Using**
   - Type your task in the input field
   - Select a priority level
   - Click "Add" or press Enter
   - Manage your tasks!

### Files Structure

```
Todo-App/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic
└── README.md       # This file
```

## 📖 How to Use

### Adding a Task

1. Enter your task description in the input field
2. Select a priority level (Low, Medium, High)
3. Click **"Add"** button or press **Enter**
4. Task appears at the top of the list

### Managing Tasks

| Action | How |
|--------|-----|
| **Mark Complete** | Click the checkbox next to the task |
| **Delete Task** | Click the 🗑️ button |
| **Clear All Completed** | Click "✓ Clear Completed" button |
| **Delete All Tasks** | Click "🗑️ Delete All" button |

### Filtering Tasks

Click on filter buttons to view:
- **All** - Show all tasks with count
- **Active** - Show incomplete tasks only
- **Completed** - Show finished tasks only
- **🔴 High Priority** - Show high-priority tasks only

Each filter shows the count of matching tasks.

### Sorting Tasks

Select from dropdown:
- **Newest First** - Most recently added tasks appear first
- **Oldest First** - Oldest tasks appear first
- **By Priority** - High → Medium → Low
- **Alphabetical** - A to Z alphabetical order

### Statistics

Real-time stats show:
- **Total Tasks** - Total number of tasks
- **Completed** - Number of finished tasks
- **Progress** - Completion percentage

## 🎨 Priority Levels

### Visual Indicators

| Priority | Color | Badge | When to Use |
|----------|-------|-------|------------|
| 🔴 **High** | Red (#dc2626) | Red | Urgent, deadline-driven tasks |
| 🟡 **Medium** | Amber (#f59e0b) | Orange | Regular tasks and goals |
| 🟢 **Low** | Green (#10b981) | Green | Nice-to-have, non-urgent tasks |

### Priority Color Coding
- Left border indicates priority
- Background tint for visual distinction
- Priority badge shows level

## 💾 Local Storage

### How It Works

```javascript
// Automatic saving
- Every action (add, complete, delete) saves to localStorage
- Data stored under key: 'todos'
- Survives browser refresh and closing
- Maximum storage: ~5-10MB (browser dependent)
```

### Storage Structure

```json
[
  {
    "id": 1234567890,
    "text": "Complete project",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-07-01T10:30:00.000Z",
    "completedAt": null
  }
]
```

### Browser Storage Limits

- **Chrome**: ~5MB per origin
- **Firefox**: ~5MB per origin
- **Safari**: ~5MB per origin
- **Edge**: ~5MB per origin

## 🛠️ Developer Features

### JavaScript Classes

#### `Todo` Class
Represents a single todo item:
```javascript
const todo = new Todo("Learn JavaScript", "high");
todo.id;           // Unique ID
todo.text;         // Task description
todo.priority;     // Priority level
todo.completed;    // Completion status
todo.createdAt;    // Creation date
```

#### `TodoManager` Class
Manages all todos and storage:
```javascript
const manager = new TodoManager();
manager.addTodo("Task", "high");
manager.toggleComplete(id);
manager.deleteTodo(id);
manager.getStats();
manager.getFilteredTodos();
```

#### `TodoUI` Class
Handles all user interface:
```javascript
const ui = new TodoUI(manager);
ui.render();
ui.updateStats();
```

### Global API

```javascript
// Export todos as JSON
exportTodos();

// Import todos from JSON
importTodos();

// Access app instance
window.todoApp.manager;  // TodoManager instance
window.todoApp.ui;       // TodoUI instance
```

## 🔧 Customization

### Change Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;        /* Main color */
    --high-priority: #dc2626;        /* High priority red */
    --medium-priority: #f59e0b;      /* Medium priority amber */
    --low-priority: #10b981;         /* Low priority green */
    --background: #0f172a;           /* Dark background */
    --text-primary: #f1f5f9;         /* Primary text */
}
```

### Modify Storage Key

Change storage key in `script.js`:
```javascript
const manager = new TodoManager('your-custom-key');
```

### Adjust Animations

Modify CSS animations:
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);  /* Adjust movement */
    }
}
```

## 🎯 Use Cases

### Personal Tasks
- Daily to-do lists
- Shopping lists
- Reading lists
- Bucket lists

### Work Management
- Project task tracking
- Sprint planning
- Meeting notes
- Action items

### Study & Learning
- Study schedules
- Learning goals
- Assignment tracking
- Revision lists

### Home & Life
- Chore lists
- Home improvement projects
- Health goals
- Travel planning

## 📊 Statistics Tracking

### Available Metrics
- Total number of tasks
- Completed tasks count
- Active (incomplete) tasks count
- Completion percentage
- High-priority task count

### Filter Counts
Each filter shows real-time count:
- All: Total tasks
- Active: Unfinished tasks
- Completed: Finished tasks
- High Priority: High-priority tasks only

## 🔐 Data Privacy

✅ **Your data is yours**
- All data stored locally in your browser
- No server uploads
- No cloud storage
- No tracking or analytics
- No cookies sent to servers
- Complete privacy and control

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Enter** | Add task (when focused on input) |
| **Escape** | Clear input field (optional) |
| **Tab** | Navigate through form elements |

## 🐛 Troubleshooting

### Tasks Not Saving?

**Problem**: Tasks disappear after refresh
- **Solution**: Check if localStorage is enabled in browser
- Check storage limit (clear some data if full)
- Verify JavaScript is enabled

### Too Many Tasks?

**Problem**: Performance is slow
- **Solution**: Clear completed tasks
- Delete old/unnecessary tasks
- Use filters to reduce visible items

### Data Lost?

**Problem**: All tasks suddenly disappeared
- **Solution**: This is likely due to browser storage being cleared
- Consider exporting data regularly using `exportTodos()`

### Browser Issues?

**Problem**: Works in one browser but not another
- **Solution**: LocalStorage support varies
- Try different browser
- Check localStorage is enabled in settings

## 💡 Tips & Tricks

### Productivity Tips

1. **Use Priority Levels** - Focus on high-priority tasks first
2. **Review Regularly** - Check stats to track progress
3. **Archive Completed** - Clear completed tasks to reduce clutter
4. **Sort by Priority** - See important tasks at the top
5. **Use Filters** - Focus on active tasks when working

### Data Management

```javascript
// Export your data
exportTodos();  // Downloads as JSON file

// Import data
importTodos();  // Upload a previously exported file

// Clear everything
localStorage.removeItem('todos');  // Clears all tasks
```

### Browser Console Commands

```javascript
// Get all todos
window.todoApp.manager.todos;

// Get statistics
window.todoApp.manager.getStats();

// Export as JSON
window.todoApp.manager.exportData();

// Get filtered todos
window.todoApp.manager.getFilteredTodos();
```

## 📱 Responsive Breakpoints

| Device | Width | Optimized |
|--------|-------|-----------|
| **Mobile** | < 480px | ✅ Single column |
| **Tablet** | 480px - 768px | ✅ Flexible layout |
| **Desktop** | > 768px | ✅ Full features |

## 🎨 Design Features

### Color Palette
- **Background**: Deep slate (#0f172a)
- **Surface**: Dark slate (#1e293b)
- **Primary**: Indigo (#6366f1)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- Font Family: 'Segoe UI', system fonts
- Clean, readable sans-serif
- Optimized font sizes for accessibility

### Animations
- Smooth transitions: 0.3s ease
- Slide-in effect for new tasks
- Hover effects on interactive elements
- Fade animations for deleted items

## ♿ Accessibility

- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG AA compliant
- **Semantic HTML** - Proper HTML structure
- **Focus Indicators** - Clear focus states
- **Screen Reader Support** - Semantic labels
- **Reduced Motion** - Respects prefers-reduced-motion

## 📚 Learning Resources

### JavaScript Concepts Used

- ES6 Classes
- LocalStorage API
- DOM Manipulation
- Event Listeners
- Array Methods (map, filter, sort)
- Template Literals
- Destructuring
- Arrow Functions

### Further Learning

- [MDN Web Docs - Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JavaScript.info](https://javascript.info/)

## 🚀 Future Enhancements

Potential features to add:

- [ ] Due dates for tasks
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task notes/descriptions
- [ ] Dark/Light mode toggle
- [ ] Cloud sync option
- [ ] Task timer/Pomodoro
- [ ] Drag-and-drop reordering
- [ ] Search functionality
- [ ] Notifications/Reminders
- [ ] Export to PDF
- [ ] Undo/Redo functionality
- [ ] Task history/logging
- [ ] Collaborative features
- [ ] Mobile app version

## 📄 License

This project is free to use and modify. No attribution required, but appreciated!

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💬 Feedback & Support

- Found a bug? Report it!
- Have a feature idea? Suggest it!
- Questions? Feel free to ask!

## 👨‍💻 Author

**Rupesh Udayagiri**
- GitHub: [@rupesh-udayagiri-7](https://github.com/rupesh-udayagiri-7)

## 📈 Version History

### v1.0.0 (Current)
- Initial release
- Core todo functionality
- LocalStorage persistence
- Priority management
- Filtering and sorting
- Statistics tracking
- Responsive design
- Dark theme

### Planned Releases
- v1.1.0 - Due dates and recurring tasks
- v1.2.0 - Categories and tags
- v1.3.0 - Cloud sync
- v2.0.0 - Mobile app

## 🎉 Quick Start Commands

```bash
# Clone repository
git clone https://github.com/rupesh-udayagiri-7/Ai-Resume-Analyzer.git

# Navigate to Todo App
cd Ai-Resume-Analyzer/Todo-App

# Open in browser (macOS)
open index.html

# Open in browser (Windows)
start index.html

# Open in browser (Linux)
xdg-open index.html

# Or run local server (Python 3)
python -m http.server 8000
# Visit: http://localhost:8000/Todo-App/
```

## 📞 Support

For issues, questions, or suggestions:

1. Check the Troubleshooting section
2. Review GitHub Issues
3. Create a new issue with details
4. Include browser and OS information

---

**Made with ❤️ for productivity**

Last Updated: July 2026
Version: 1.0.0
