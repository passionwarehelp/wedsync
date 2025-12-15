# WedSync - Complete GitHub Upload Guide

## 📋 File-by-File with Complete Code

Upload files in this exact order to GitHub.

---

## STEP 1: ROOT CONFIGURATION FILES

### File 1: `.gitignore`
**Location:** `/.gitignore`

```
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# typescript
*.tsbuildinfo

# iOS & Android
ios/
android/

# Expo log
expo.log
```

---

### File 2: `.prettierrc`
**Location:** `/.prettierrc`

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": false
}
```

---

