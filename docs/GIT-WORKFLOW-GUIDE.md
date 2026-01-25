# 🌳 Git Workflow Guide

**Purpose:** This guide helps you contribute to this project using Git and GitHub, regardless of your experience level.

**Accessibility Note:** This guide uses clear headings, step-by-step instructions, visual indicators, and provides multiple ways to accomplish tasks.

---

## 📋 Table of Contents

- [Before You Start](#-before-you-start)
- [Quick Reference](#-quick-reference)
- [Basic Workflow](#-basic-workflow-beginners)
- [Advanced Workflow](#-advanced-workflow-experienced)
- [Common Tasks](#-common-tasks)
- [Troubleshooting](#-troubleshooting)
- [Visual Guide](#-visual-guide)
- [Getting Help](#-getting-help)

---

## ✅ Before You Start

### What You'll Need

**Required:**
- ✓ Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- ✓ A GitHub account ([Sign up free](https://github.com/signup))
- ✓ A text editor (we recommend [VS Code](https://code.visualstudio.com/))

**Optional but Helpful:**
- ✓ GitHub Desktop for visual Git management ([Download](https://desktop.github.com/))
- ✓ Basic command line knowledge

### Verify Git Installation

**Test if Git is installed:**

```bash
git --version
```

**Expected output:** `git version 2.x.x` or higher

**If you see an error:** Git is not installed. Follow the installation link above.

---

## 🔖 Quick Reference

**5-Minute Cheat Sheet** (bookmark this section!)

| Task | Command | When to Use |
|------|---------|-------------|
| Get latest changes | `git pull origin master` | Start of work session |
| See what changed | `git status` | Before committing |
| Stage all changes | `git add .` | Before committing |
| Create commit | `git commit -m "Description"` | Save your work |
| Push to GitHub | `git push origin master` | Share your changes |
| See commit history | `git log --oneline` | Review what's been done |

---

## 🌱 Basic Workflow (Beginners)

**Goal:** Make a change and save it to the repository

### Step 1: Get the Latest Code

**Why:** Ensures you're working with the most recent version

```bash
# Open your terminal/command prompt
# Navigate to the project folder
cd path/to/_public_html

# Download latest changes from GitHub
git pull origin master
```

**What you'll see:** "Already up to date" or a list of updated files

---

### Step 2: Make Your Changes

**Why:** This is where you do your actual work

1. **Open your text editor** (VS Code, Notepad++, etc.)
2. **Edit files** as needed (HTML, CSS, JavaScript)
3. **Save all changes** (Ctrl+S or Cmd+S)

**Example:** Updating your bio in `index.html`

---

### Step 3: Check What Changed

**Why:** Verify you changed what you intended

```bash
git status
```

**What you'll see:**
- 🔴 **Red text** = Modified files not yet staged
- 🟢 **Green text** = Files ready to commit

**Example output:**
```
Changes not staged for commit:
  modified:   index.html
  modified:   styles.css
```

---

### Step 4: Stage Your Changes

**Why:** Tell Git which changes to include in your commit

**Option A - Stage Everything (Simple):**
```bash
git add .
```

**Option B - Stage Specific Files (Safer):**
```bash
git add index.html
git add styles.css
```

**Verify staging worked:**
```bash
git status
```

**Now files should appear in GREEN**

---

### Step 5: Commit Your Changes

**Why:** Create a snapshot of your work with a description

```bash
git commit -m "Update bio and styling"
```

**Writing Good Commit Messages:**

✅ **Good Examples:**
- `"Add contact form to homepage"`
- `"Fix mobile navigation menu bug"`
- `"Update security policy with attribution requirements"`

❌ **Poor Examples:**
- `"Changes"` (too vague)
- `"asdfasdf"` (meaningless)
- `"Fixed stuff"` (not descriptive)

**Formula:** `"[Action] + [What you changed] + [Why if not obvious]"`

---

### Step 6: Push to GitHub

**Why:** Upload your commits to the remote repository

```bash
git push origin master
```

**What you'll see:** Progress bar and "Branch master set up to track..."

**Verify it worked:** Visit your GitHub repository page and see your changes

---

### ✅ Success Checklist

After completing these steps, verify:

- [ ] Your changes appear on GitHub
- [ ] No error messages in terminal
- [ ] Other team members can see your changes
- [ ] Website still works if you deployed

---

## 🚀 Advanced Workflow (Experienced)

**Goal:** Use branches for safer collaboration

### Creating a Feature Branch

**Why:** Isolate changes and prevent breaking the main code

```bash
# Create and switch to new branch
git checkout -b feature/add-contact-form

# Or do it in two steps
git branch feature/add-contact-form
git checkout feature/add-contact-form
```

**Branch Naming Conventions:**

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/dark-mode` |
| Bug Fix | `fix/description` | `fix/mobile-menu` |
| Documentation | `docs/description` | `docs/setup-guide` |
| Security | `security/description` | `security/update-csp` |

---

### Working on a Branch

```bash
# See current branch (has * next to it)
git branch

# Make changes and commit as usual
git add .
git commit -m "Add contact form structure"

# Push branch to GitHub
git push origin feature/add-contact-form
```

---

### Creating a Pull Request

**Why:** Get feedback before merging into main code

**Steps:**

1. **Push your branch** (see command above)
2. **Go to GitHub repository** in browser
3. **Click "Compare & pull request"** button
4. **Fill out PR template:**
   - **Title:** Clear description of changes
   - **Description:** What changed and why
   - **Screenshots:** If UI changes
5. **Request reviewers** (if applicable)
6. **Click "Create pull request"**

---

### Merging a Pull Request

**After approval:**

1. **Click "Merge pull request"** on GitHub
2. **Confirm the merge**
3. **Delete the branch** (optional but recommended)

**Update your local repository:**
```bash
# Switch back to master
git checkout master

# Pull the merged changes
git pull origin master

# Delete local branch (optional)
git branch -d feature/add-contact-form
```

---

## 🔧 Common Tasks

### View Commit History

**See recent commits:**
```bash
# Short format
git log --oneline

# Detailed format
git log

# Last 5 commits
git log -5 --oneline
```

---

### Undo Changes (Before Commit)

**Discard changes to a single file:**
```bash
git checkout -- index.html
```

**⚠️ Warning:** This permanently deletes uncommitted changes!

**Safer alternative - Stash changes:**
```bash
# Save changes temporarily
git stash

# Restore changes later
git stash pop
```

---

### Sync with Remote

**Get latest changes without merging:**
```bash
git fetch origin
```

**See differences between local and remote:**
```bash
git diff master origin/master
```

**Pull and merge in one step:**
```bash
git pull origin master
```

---

### View Changes Before Committing

**See all changes:**
```bash
git diff
```

**See staged changes only:**
```bash
git diff --staged
```

**See changes for specific file:**
```bash
git diff index.html
```

---

## 🆘 Troubleshooting

### "Permission denied (publickey)"

**Problem:** GitHub can't verify your identity

**Solution:**

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings → SSH Keys → New SSH Key
   - Paste and save

**Alternative:** Use HTTPS instead of SSH URLs

---

### "Merge conflict"

**Problem:** Git can't automatically merge changes

**Visual indicators in file:**
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

**Solution:**

1. **Open the conflicted file**
2. **Find the conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`)
3. **Decide which changes to keep**
4. **Remove the conflict markers**
5. **Save the file**
6. **Stage and commit:**
   ```bash
   git add conflicted-file.html
   git commit -m "Resolve merge conflict"
   ```

---

### "Your branch is behind"

**Problem:** Remote has changes you don't have

**Solution:**
```bash
git pull origin master
```

**If you have local uncommitted changes:**
```bash
# Save changes temporarily
git stash

# Pull updates
git pull origin master

# Restore your changes
git stash pop
```

---

### "fatal: not a git repository"

**Problem:** You're not in a Git project folder

**Solution:**
```bash
# Navigate to project folder
cd path/to/_public_html

# Verify Git repository exists
git status
```

---

## 📊 Visual Guide

### Git Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Your Computer (Local)         GitHub (Remote)          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Working Directory                                       │
│  ↓ (git add)                                            │
│  Staging Area                                           │
│  ↓ (git commit)                                         │
│  Local Repository  ────(git push)────→  Remote Repo     │
│       ↑                                      ↓           │
│       └─────────(git pull)───────────────────┘          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Explanation:**
1. **Working Directory:** Where you edit files
2. **Staging Area:** Files ready to commit
3. **Local Repository:** Your computer's Git history
4. **Remote Repository:** GitHub's copy (shared with team)

---

### File Status Flow

```
Untracked → Staged → Committed → Pushed
   ↓         ↓         ↓          ↓
  [New]   [Green]   [Saved]  [On GitHub]
```

---

## 🎓 Getting Help

### Built-in Git Help

```bash
# General help
git help

# Help for specific command
git help commit
git help push

# Quick syntax reminder
git commit --help
```

---

### External Resources

**Official Documentation:**
- [Git Book (Free)](https://git-scm.com/book/en/v2) - Comprehensive guide
- [GitHub Docs](https://docs.github.com/) - GitHub-specific help

**Interactive Learning:**
- [Learn Git Branching](https://learngitbranching.js.org/) - Visual game
- [GitHub Skills](https://skills.github.com/) - Hands-on tutorials

**Video Tutorials:**
- [Git & GitHub for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk) - Crash course
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE) - Step-by-step

---

### Ask for Help

**When stuck:**

1. ✅ **Read error messages carefully** - they often tell you what to do
2. ✅ **Copy the exact error** and search online
3. ✅ **Check project documentation** in `docs/` folder
4. ✅ **Ask team members** or project maintainer
5. ✅ **File an issue** on GitHub if you found a bug

**When asking for help, include:**
- What you were trying to do
- Exact command you ran
- Complete error message
- Your operating system (Windows/Mac/Linux)

---

## 📝 Best Practices

### Commit Frequency

✅ **Good:** Commit after completing a logical unit of work
- "Add contact form HTML structure"
- "Style contact form with CSS"
- "Add form validation JavaScript"

❌ **Avoid:** Committing too frequently (every keystroke) or too rarely (end of day)

---

### Commit Message Guidelines

**Format:**
```
[Type] Brief description (50 chars or less)

Detailed explanation if needed (wrap at 72 chars)

- List of changes if multiple
- Include issue number if applicable (#123)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, no code change
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

**Example:**
```
feat: Add contact form to homepage

Created a new contact form section with:
- Name, email, and message fields
- Client-side validation
- CSP-compliant styling

Closes #45
```

---

### Before Pushing

**Checklist:**

- [ ] `git status` - Review what's being committed
- [ ] `git diff` - Check the actual changes
- [ ] Test your changes locally
- [ ] Write clear commit message
- [ ] Ensure no sensitive data (passwords, API keys)
- [ ] Verify files are in correct directories

---

## 🔐 Security Reminders

**Never commit:**
- ❌ Passwords or API keys
- ❌ Private keys or certificates
- ❌ Personal data (emails, phone numbers)
- ❌ `.env` files with secrets
- ❌ Large binary files (use Git LFS)

**Use `.gitignore` for:**
```
# Add to .gitignore file
*.env
.env.local
credentials.json
*.key
*.pem
node_modules/
```

---

## ♿ Accessibility Features of This Guide

This guide follows Universal Design for Learning (UDL) principles:

**Multiple Means of Representation:**
- ✓ Text instructions with visual diagrams
- ✓ Color-coded terminal output descriptions
- ✓ Emoji indicators for quick scanning
- ✓ Tables for quick reference

**Multiple Means of Action:**
- ✓ Multiple paths (basic vs advanced)
- ✓ Alternative methods (command line vs GUI)
- ✓ Copy-paste ready commands

**Multiple Means of Engagement:**
- ✓ Progressive complexity
- ✓ Real-world examples
- ✓ Success criteria checklists
- ✓ Troubleshooting section

---

**Version:** 1.0
**Last Updated:** January 2026
**Maintained by:** Basiliso Rosario ([bas.rosario@gmail.com](mailto:bas.rosario@gmail.com))

**Found an accessibility issue?** Please report it so we can improve this guide for everyone.
