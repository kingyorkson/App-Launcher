# Building the Desktop App (EXE)

This repository contains the source code for the App Launcher desktop application. To build the Windows EXE file, follow these steps:

## Prerequisites

1. **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **Git** (optional, for cloning the repository)

## Building Steps

1. **Clone or download** this repository
2. **Open terminal/command prompt** in the project directory
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the EXE**:
   ```bash
   npm run dist
   ```

## Output

After building, you'll find:
- **EXE file**: `dist/win-unpacked/App Launcher.exe`
- **Full app**: `dist/win-unpacked/` directory (contains all files needed to run)

## Alternative Build Commands

- **Development mode**: `npm start` (opens Electron app for testing)
- **Build only**: `npm run build` (builds without creating installer)

## Features

The desktop app includes:
- ✨ Native Windows application
- 🖥️ Menu bar with File, Edit, View, Window, Help menus
- ⌨️ Keyboard shortcuts (Ctrl+N for new app, Ctrl+Q to quit)
- 🌐 External links open in default browser
- 💾 Local storage for app data
- 🎨 Beautiful gradient UI with animations

## Distribution

To share your app:
1. Copy the entire `dist/win-unpacked/` folder
2. Recipients can run `App Launcher.exe` directly
3. No installation required!

## Troubleshooting

- **Build fails**: Make sure Node.js is installed and you're in the project directory
- **EXE won't run**: Ensure all files in `win-unpacked/` are present
- **Missing dependencies**: Run `npm install` again

## File Structure

```
app-launcher/
├── index.html          # Main app interface
├── styles.css          # Styling and animations
├── script.js           # App functionality
├── main.js             # Electron main process
├── package.json        # Dependencies and scripts
└── dist/               # Build output (after npm run dist)
    └── win-unpacked/   # Ready-to-run EXE and files
        └── App Launcher.exe
```

Enjoy your new desktop app launcher! 🚀
