class AppLauncher {
    constructor() {
        this.apps = this.loadApps();
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderApps();
        this.updateEmptyState();
    }

    bindEvents() {
        // Add app button
        document.getElementById('addAppBtn').addEventListener('click', () => {
            this.showAddModal();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideAddModal();
        });

        document.getElementById('closeEditModal').addEventListener('click', () => {
            this.hideEditModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideAddModal();
        });

        document.getElementById('cancelEditBtn').addEventListener('click', () => {
            this.hideEditModal();
        });

        // Form submissions
        document.getElementById('addAppForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addApp();
        });

        document.getElementById('editAppForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateApp();
        });

        // Delete button
        document.getElementById('deleteBtn').addEventListener('click', () => {
            this.deleteApp();
        });

        // Close modals when clicking outside
        document.getElementById('addAppModal').addEventListener('click', (e) => {
            if (e.target.id === 'addAppModal') {
                this.hideAddModal();
            }
        });

        document.getElementById('editAppModal').addEventListener('click', (e) => {
            if (e.target.id === 'editAppModal') {
                this.hideEditModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAddModal();
                this.hideEditModal();
            }
        });
    }

    showAddModal() {
        const modal = document.getElementById('addAppModal');
        modal.classList.add('show');
        document.getElementById('addAppForm').reset();
        document.getElementById('appName').focus();
    }

    hideAddModal() {
        const modal = document.getElementById('addAppModal');
        modal.classList.remove('show');
    }

    showEditModal(app) {
        const modal = document.getElementById('editAppModal');
        modal.classList.add('show');
        
        document.getElementById('editAppName').value = app.name;
        document.getElementById('editAppPath').value = app.path;
        document.getElementById('editAppIcon').value = app.icon || '';
        document.getElementById('editAppDescription').value = app.description || '';
        
        this.currentEditingId = app.id;
        document.getElementById('editAppName').focus();
    }

    hideEditModal() {
        const modal = document.getElementById('editAppModal');
        modal.classList.remove('show');
        this.currentEditingId = null;
    }

    addApp() {
        const name = document.getElementById('appName').value.trim();
        const path = document.getElementById('appPath').value.trim();
        const icon = document.getElementById('appIcon').value.trim();
        const description = document.getElementById('appDescription').value.trim();

        if (!name || !path) {
            alert('Please fill in the required fields (Name and Path)');
            return;
        }

        const app = {
            id: Date.now().toString(),
            name,
            path,
            icon,
            description,
            dateAdded: new Date().toISOString()
        };

        this.apps.push(app);
        this.saveApps();
        this.renderApps();
        this.updateEmptyState();
        this.hideAddModal();
        
        // Show success message
        this.showNotification('App added successfully!', 'success');
    }

    updateApp() {
        if (!this.currentEditingId) return;

        const name = document.getElementById('editAppName').value.trim();
        const path = document.getElementById('editAppPath').value.trim();
        const icon = document.getElementById('editAppIcon').value.trim();
        const description = document.getElementById('editAppDescription').value.trim();

        if (!name || !path) {
            alert('Please fill in the required fields (Name and Path)');
            return;
        }

        const appIndex = this.apps.findIndex(app => app.id === this.currentEditingId);
        if (appIndex !== -1) {
            this.apps[appIndex] = {
                ...this.apps[appIndex],
                name,
                path,
                icon,
                description
            };

            this.saveApps();
            this.renderApps();
            this.hideEditModal();
            
            // Show success message
            this.showNotification('App updated successfully!', 'success');
        }
    }

    deleteApp() {
        if (!this.currentEditingId) return;

        if (confirm('Are you sure you want to delete this app?')) {
            this.apps = this.apps.filter(app => app.id !== this.currentEditingId);
            this.saveApps();
            this.renderApps();
            this.updateEmptyState();
            this.hideEditModal();
            
            // Show success message
            this.showNotification('App deleted successfully!', 'success');
        }
    }

    launchApp(app) {
        try {
            // For web-based apps, we'll open them in a new window
            // For desktop apps, we'll show a message since we can't directly launch them from a web browser
            if (app.path.startsWith('http://') || app.path.startsWith('https://')) {
                window.open(app.path, '_blank');
                this.showNotification(`Opening ${app.name}...`, 'info');
            } else {
                // For desktop apps, we'll show instructions
                this.showNotification(`To launch ${app.name}, copy this path: ${app.path}`, 'info');
                
                // Copy path to clipboard if possible
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(app.path).then(() => {
                        this.showNotification(`Path copied to clipboard!`, 'success');
                    });
                }
            }
        } catch (error) {
            console.error('Error launching app:', error);
            this.showNotification('Error launching app', 'error');
        }
    }

    renderApps() {
        const appsGrid = document.getElementById('appsGrid');
        appsGrid.innerHTML = '';

        this.apps.forEach(app => {
            const appCard = this.createAppCard(app);
            appsGrid.appendChild(appCard);
        });
    }

    createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.addEventListener('click', () => this.launchApp(app));

        const icon = document.createElement('div');
        icon.className = 'app-icon';
        
        if (app.icon) {
            const img = document.createElement('img');
            img.src = app.icon;
            img.alt = app.name;
            img.onerror = () => {
                // Fallback to default icon if image fails to load
                icon.innerHTML = `<i class="fas fa-desktop"></i>`;
            };
            icon.appendChild(img);
        } else {
            icon.innerHTML = `<i class="fas fa-desktop"></i>`;
        }

        const name = document.createElement('div');
        name.className = 'app-name';
        name.textContent = app.name;

        const description = document.createElement('div');
        description.className = 'app-description';
        description.textContent = app.description || 'Click to launch';

        const actions = document.createElement('div');
        actions.className = 'app-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showEditModal(app);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete ${app.name}?`)) {
                this.apps = this.apps.filter(a => a.id !== app.id);
                this.saveApps();
                this.renderApps();
                this.updateEmptyState();
                this.showNotification('App deleted successfully!', 'success');
            }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(actions);

        return card;
    }

    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const appsGrid = document.getElementById('appsGrid');
        
        if (this.apps.length === 0) {
            emptyState.style.display = 'block';
            appsGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            appsGrid.style.display = 'grid';
        }
    }

    saveApps() {
        localStorage.setItem('appLauncher_apps', JSON.stringify(this.apps));
    }

    loadApps() {
        const saved = localStorage.getItem('appLauncher_apps');
        return saved ? JSON.parse(saved) : [];
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '3000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app launcher when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AppLauncher();
});

// Add some sample apps for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const launcher = new AppLauncher();
    
    // Add sample apps if none exist
    if (launcher.apps.length === 0) {
        const sampleApps = [
            {
                id: 'sample1',
                name: 'Google Chrome',
                path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                description: 'Web browser',
                dateAdded: new Date().toISOString()
            },
            {
                id: 'sample2',
                name: 'Visual Studio Code',
                path: 'C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe',
                description: 'Code editor',
                dateAdded: new Date().toISOString()
            },
            {
                id: 'sample3',
                name: 'Calculator',
                path: 'calc.exe',
                description: 'Windows Calculator',
                dateAdded: new Date().toISOString()
            },
            {
                id: 'sample4',
                name: 'Notepad',
                path: 'notepad.exe',
                description: 'Text editor',
                dateAdded: new Date().toISOString()
            }
        ];
        
        launcher.apps = sampleApps;
        launcher.saveApps();
        launcher.renderApps();
        launcher.updateEmptyState();
    }
});
