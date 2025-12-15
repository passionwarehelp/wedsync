# WedSync - Complete Code Guide

This document contains EVERY file in the project with its complete code and Git strategy.

## Git Strategy

**✅ Commit directly to main branch** - All files below are production-ready and should be committed directly to main.

---

## ROOT LEVEL FILES

### 📄 `.gitignore`

**Location:** `/`
**Commit:** ✅ Direct to main

```
# Dependencies
node_modules/
/node_modules

# Expo
.expo/
.expo-shared/
expo.log
web-build/

# Environment
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Build
dist/
build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Backend
backend/.env
backend/node_modules/
backend/dist/

# Temporary
*.tmp
*.temp
wedsync-backend.tar.gz
```

---

### 📄 `.prettierrc`

**Location:** `/`
**Commit:** ✅ Direct to main

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 120
}
```

---

### 📄 `package.json`

**Location:** `/`
**Commit:** ✅ Direct to main

