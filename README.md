# App Launcher

A beautiful, modern web-based app launcher that allows you to quickly add and launch your favorite applications.

## Features

- ✨ **Modern UI**: Beautiful gradient design with smooth animations
- ➕ **Easy App Addition**: Click the plus button to add new apps
- 🚀 **Quick Launch**: Click any app card to launch it
- ✏️ **Edit Apps**: Hover over apps to edit or delete them
- 💾 **Persistent Storage**: Your apps are saved locally in your browser
- 📱 **Responsive Design**: Works great on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts**: Press Escape to close modals

## How to Use

### Adding Apps
1. Click the **+** button in the bottom right corner
2. Fill in the app details:
   - **App Name**: The display name for your app
   - **App Path**: The full path to the executable file
   - **Icon URL** (optional): URL to an icon image
   - **Description** (optional): Brief description of the app
3. Click "Add App"

### Launching Apps
- **Click** any app card to launch it
- For web apps (URLs starting with http/https), they will open in a new tab
- For desktop apps, the path will be copied to your clipboard for easy access

### Managing Apps
- **Hover** over any app card to see edit and delete buttons
- **Edit**: Modify app details
- **Delete**: Remove the app (with confirmation)

## App Path Examples

### Windows Applications
```
C:\Program Files\Google\Chrome\Application\chrome.exe
C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe
C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE
```

### Built-in Windows Apps
```
calc.exe
notepad.exe
mspaint.exe
```

### Web Applications
```
https://www.google.com
https://github.com
https://stackoverflow.com
```

## File Structure

```
app_launcher/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with JavaScript support

## Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Your app information remains private

## Tips

1. **Finding App Paths**: Right-click on desktop shortcuts and select "Properties" to find the target path
2. **Icons**: Use online icon services or app websites for icon URLs
3. **Organization**: Use descriptive names and descriptions to organize your apps
4. **Backup**: Your apps are saved in browser localStorage, so they persist between sessions

## Troubleshooting

- **App won't launch**: Check that the path is correct and the app exists
- **Icon not showing**: Verify the icon URL is accessible and returns an image
- **Apps disappeared**: Check if you cleared browser data or are using a different browser

Enjoy your new app launcher! 🚀
