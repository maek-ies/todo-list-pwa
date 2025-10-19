<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#9C27B0">
    <meta name="description" content="Simple and powerful to-do list app">
    <title>My Todo List</title>
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="icon-192.png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
            min-height: 100vh;
            padding: 16px;
            transition: background 0.3s ease;
        }

        :root {
            --primary-color: #9C27B0;
            --primary-dark: #7B1FA2;
            --primary-light: #E1BEE7;
            --bg-start: #f3e5f5;
            --bg-end: #ffe0f0;
        }

        .container {
            max-width: 640px;
            margin: 0 auto;
        }

        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 24px;
            margin-bottom: 16px;
        }

        h1 {
            font-size: 28px;
            color: #424242;
            margin-bottom: 16px;
        }

        .category-selector {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }

        .category-option {
            background: white;
            border: 2px solid #e0e0e0;
            padding: 10px 16px;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
            user-select: none;
        }

        .category-option:hover {
            border-color: var(--primary-color);
            background: #f3e5f5;
        }

        .category-option.selected {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #757575;
            margin-bottom: 8px;
        }

        select, input[type="text"], input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #bdbdbd;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 16px;
            font-family: inherit;
        }

        select:focus, input[type="text"]:focus, input[type="password"]:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.2);
        }

        .input-row {
            display: flex;
            gap: 12px;
        }

        .input-row input {
            flex: 1;
            margin-bottom: 0;
        }

        button {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background 0.2s;
        }

        button:hover {
            background: var(--primary-dark);
        }

        button:active {
            transform: scale(0.98);
        }

        .tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
        }

        .tab {
            flex: 1;
            background: rgba(255,255,255,0.5);
            border: none;
            padding: 12px;
            border-radius: 12px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .tab.active {
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            color: var(--primary-color);
            font-weight: 500;
        }

        .filter-section {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }

        .filter-chip {
            background: white;
            border: 2px solid #e0e0e0;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .filter-chip:hover {
            border-color: var(--primary-color);
        }

        .filter-chip.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .stats {
            display: flex;
            gap: 24px;
            font-size: 14px;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .stat-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #424242;
            margin: 16px 0 12px 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .todo-item {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 16px;
            margin-bottom: 8px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
            transition: all 0.2s;
            cursor: move;
            position: relative;
        }

        .todo-item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .todo-item.completed {
            opacity: 0.75;
            cursor: default;
        }

        .todo-item.dragging {
            opacity: 0.5;
            transform: scale(1.02);
        }

        .todo-item.drag-over {
            border-top: 3px solid var(--primary-color);
        }

        .drag-handle {
            color: #bdbdbd;
            cursor: move;
            font-size: 20px;
            line-height: 1;
            padding: 2px;
            user-select: none;
            flex-shrink: 0;
        }

        .todo-item.completed .drag-handle {
            visibility: hidden;
        }

        .checkbox {
            width: 24px;
            height: 24px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            margin-top: 2px;
        }

        .checkbox.checked {
            background: #4CAF50;
            border-color: #4CAF50;
        }

        .checkbox.checked::after {
            content: '✓';
            color: white;
            font-size: 14px;
        }

        .todo-content {
            flex: 1;
            min-width: 0;
            overflow: hidden;
        }

        .todo-text {
            color: #424242;
            margin-bottom: 8px;
            word-break: break-word;
        }

        .todo-text.completed {
            text-decoration: line-through;
            color: #9E9E9E;
        }

        .todo-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
            font-size: 12px;
        }

        .category-tag {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
        }

        .cat-personal { background: #BBDEFB; color: #1976D2; }
        .cat-work { background: #E1BEE7; color: #7B1FA2; }
        .cat-shopping { background: #C8E6C9; color: #388E3C; }
        .cat-other { background: #EEEEEE; color: #424242; }

        .timestamp {
            color: #9E9E9E;
        }

        .completed-time {
            color: #4CAF50;
        }

        .delete-btn {
            background: transparent;
            color: #F44336;
            padding: 8px;
            min-width: auto;
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .delete-btn:hover {
            background: #FFEBEE;
        }

        .empty-state {
            text-align: center;
            padding: 48px 24px;
            color: #9E9E9E;
        }

        .install-prompt {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
            display: none;
            align-items: center;
            gap: 16px;
        }

        .install-prompt.show {
            display: flex;
        }

        .install-prompt button {
            background: white;
            color: #667eea;
            padding: 8px 16px;
            white-space: nowrap;
        }

        .setup-screen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .setup-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .setup-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }

        .setup-title {
            font-size: 24px;
            font-weight: 600;
            color: #424242;
            margin-bottom: 12px;
        }

        .setup-subtitle {
            font-size: 14px;
            color: #757575;
            margin-bottom: 24px;
        }

        .option-card {
            background: #f5f5f5;
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }

        .option-card:hover {
            background: #eeeeee;
        }

        .option-card.selected {
            border-color: var(--primary-color);
            background: #f3e5f5;
        }

        .option-title {
            font-weight: 600;
            color: #424242;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .option-description {
            font-size: 13px;
            color: #757575;
        }

        .lock-screen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .lock-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .lock-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }

        .error-message {
            color: #F44336;
            font-size: 14px;
            margin-top: 8px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .security-badge {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .options-button {
            background: white;
            border: 2px solid #e0e0e0;
            color: #424242;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
        }

        .options-button:hover {
            border-color: var(--primary-color);
            background: #f3e5f5;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 16px;
        }

        .modal-overlay.show {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .modal-header {
            padding: 24px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 24px;
            font-weight: 600;
            color: #424242;
        }

        .close-button {
            background: transparent;
            color: #757575;
            padding: 8px;
            font-size: 24px;
            cursor: pointer;
            border: none;
            width: auto;
            min-width: auto;
        }

        .close-button:hover {
            background: #f5f5f5;
            color: #424242;
        }

        .modal-tabs {
            display: flex;
            border-bottom: 1px solid #e0e0e0;
        }

        .modal-tab {
            flex: 1;
            padding: 16px;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #757575;
            transition: all 0.2s;
        }

        .modal-tab.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }

        .modal-body {
            padding: 24px;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .setting-item {
            padding: 16px;
            border-radius: 12px;
            background: #f5f5f5;
            margin-bottom: 16px;
        }

        .setting-title {
            font-weight: 600;
            color: #424242;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .setting-description {
            font-size: 14px;
            color: #757575;
            margin-bottom: 12px;
        }

        .setting-status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }

        .status-encrypted {
            background: #C8E6C9;
            color: #2E7D32;
        }

        .status-unencrypted {
            background: #BBDEFB;
            color: #1565C0;
        }

        .warning-box {
            background: #FFF3E0;
            border-left: 4px solid #FF9800;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
        }

        .warning-box strong {
            color: #E65100;
        }

        .user-info {
            text-align: center;
            padding: 24px;
        }

        .user-avatar {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            margin: 0 auto 16px;
        }

        .user-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 24px;
        }

        .stat-box {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 12px;
            text-align: center;
        }

        .stat-number {
            font-size: 32px;
            font-weight: 700;
            color: var(--primary-color);
        }

        .stat-label {
            font-size: 14px;
            color: #757575;
            margin-top: 4px;
        }

        @media (max-width: 640px) {
            .input-row {
                flex-direction: column;
            }

            button {
                width: 100%;
                justify-content: center;
            }

            .filter-section {
                gap: 6px;
            }

            .filter-chip {
                padding: 6px 12px;
                font-size: 13px;
            }

            .todo-item {
                gap: 8px;
                padding: 12px;
            }

            .drag-handle {
                font-size: 16px;
                width: 20px;
            }

            .checkbox {
                width: 22px;
                height: 22px;
            }

            .delete-btn {
                width: 36px;
                height: 36px;
                padding: 6px;
                font-size: 18px;
            }

            .todo-text {
                font-size: 15px;
            }

            .category-tag {
                font-size: 10px;
                padding: 3px 6px;
            }

            .timestamp, .completed-time {
                font-size: 11px;
            }
        }
    </style>
</head>
<body>
    <div id="setupScreen" class="setup-screen" style="display: none;">
        <div class="setup-card">
            <div class="setup-icon">📝</div>
            <h2 class="setup-title">Welcome to Todo List</h2>
            <p class="setup-subtitle">Choose how you want to protect your data</p>
            
            <div class="option-card" id="optionNoEncryption" onclick="selectOption('none')">
                <div class="option-title">
                    <span>📂</span>
                    <span>No Encryption</span>
                </div>
                <div class="option-description">Simple storage. Quick access without password.</div>
            </div>

            <div class="option-card" id="optionEncryption" onclick="selectOption('encrypted')">
                <div class="option-title">
                    <span>🔐</span>
                    <span>Encrypted (AES-256)</span>
                </div>
                <div class="option-description">Military-grade security. Requires password to access.</div>
            </div>

            <button onclick="confirmSetup()" style="width: 100%; justify-content: center; margin-top: 16px;">
                Continue
            </button>
        </div>
    </div>

    <div id="lockScreen" class="lock-screen" style="display: none;">
        <div class="lock-card">
            <div class="lock-icon">🔒</div>
            <h2 class="setup-title">Secure Todo List</h2>
            <div class="security-badge" style="margin-bottom: 16px;">
                <span>🛡️</span>
                <span>AES-256 Encrypted</span>
            </div>
            <p class="setup-subtitle" id="lockSubtitle">Create a password to encrypt your todos</p>
            
            <input type="password" id="passwordInput" placeholder="Enter password" style="margin-bottom: 8px;">
            <div id="errorMessage" class="error-message">Incorrect password. Try again.</div>
            
            <button onclick="handlePassword()" style="width: 100%; justify-content: center; margin-top: 8px;">
                <span id="lockButtonText">Create & Unlock</span>
            </button>
            
            <p style="font-size: 12px; color: #9E9E9E; margin-top: 16px;">
                ⚠️ Remember your password! It cannot be recovered.
            </p>
        </div>
    </div>

    <div id="mainApp" style="display: none;">
        <div class="container">
            <div id="installPrompt" class="install-prompt">
                <div style="flex: 1;">
                    <strong>Install App</strong>
                    <div style="font-size: 14px; opacity: 0.9;">Add to your home screen for quick access</div>
                </div>
                <button onclick="installApp()">Install</button>
                <button onclick="dismissInstall()" style="background: transparent; border: 1px solid white; color: white;">Dismiss</button>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h1 style="margin: 0;">To-Do List</h1>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div id="securityBadge" style="display: none;" class="security-badge">
                            🔐 Encrypted
                        </div>
                        <button class="options-button" onclick="openOptionsModal()">
                            ⚙️
                        </button>
                    </div>
                </div>

                <div class="input-row">
                    <input type="text" id="todoInput" placeholder="Add a new task..." onkeypress="handleKeyPress(event)">
                    <button onclick="addTodo()">
                        <span>➕</span>
                        Add
                    </button>
                </div>

                <div class="category-selector">
                    <div class="category-option" onclick="selectCategory('Personal')" id="cat-Personal">
                        <span>👤</span>
                        <span>Personal</span>
                    </div>
                    <div class="category-option" onclick="selectCategory('Work')" id="cat-Work">
                        <span>💼</span>
                        <span>Work</span>
                    </div>
                    <div class="category-option" onclick="selectCategory('Shopping')" id="cat-Shopping">
                        <span>🛒</span>
                        <span>Shopping</span>
                    </div>
                    <div class="category-option selected" onclick="selectCategory('Other')" id="cat-Other">
                        <span>📌</span>
                        <span>Other</span>
                    </div>
                </div>
            </div>

            <div class="tabs">
                <button class="tab active" onclick="switchTab('today')">
                    Today (<span id="todayCount">0</span>)
                </button>
                <button class="tab" onclick="switchTab('previous')">
                    Previous (<span id="previousCount">0</span>)
                </button>
            </div>

            <div class="filter-section" id="filterSection">
                <div class="filter-chip active" onclick="filterByCategory('all')" id="filter-all">
                    <span>🔍</span>
                    <span>All</span>
                </div>
                <div class="filter-chip" onclick="filterByCategory('Personal')" id="filter-Personal">
                    <span>👤</span>
                    <span>Personal</span>
                </div>
                <div class="filter-chip" onclick="filterByCategory('Work')" id="filter-Work">
                    <span>💼</span>
                    <span>Work</span>
                </div>
                <div class="filter-chip" onclick="filterByCategory('Shopping')" id="filter-Shopping">
                    <span>🛒</span>
                    <span>Shopping</span>
                </div>
                <div class="filter-chip" onclick="filterByCategory('Other')" id="filter-Other">
                    <span>📌</span>
                    <span>Other</span>
                </div>
            </div>

            <div class="card">
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-dot" style="background: #9C27B0;"></div>
                        <span><span id="activeCount">0</span> active</span>
                    </div>
                    <div class="stat-item">
                        <div class="stat-dot" style="background: #4CAF50;"></div>
                        <span><span id="completedCount">0</span> completed</span>
                    </div>
                </div>
            </div>

            <div id="todoList"></div>
        </div>

        <!-- Options Modal -->
        <div id="optionsModal" class="modal-overlay" onclick="closeModalOnOutsideClick(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="modal-title">Options</h2>
                    <button class="close-button" onclick="closeOptionsModal()">✕</button>
                </div>
                
                <div class="modal-tabs">
                    <button class="modal-tab active" onclick="switchModalTab('user')">
                        👤 User
                    </button>
                    <button class="modal-tab" onclick="switchModalTab('settings')">
                        ⚙️ Settings
                    </button>
                </div>

                <div class="modal-body">
                    <!-- User Tab -->
                    <div id="userTab" class="tab-content active">
                        <div class="user-info">
                            <div class="user-avatar">📝</div>
                            <h3 style="color: #424242; margin-bottom: 8px;">Todo User</h3>
                            <p style="color: #757575; font-size: 14px;">Managing tasks efficiently</p>
                        </div>

                        <div class="user-stats">
                            <div class="stat-box">
                                <div class="stat-number" id="totalTasksCount">0</div>
                                <div class="stat-label">Total Tasks</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-number" id="completedTasksCount">0</div>
                                <div class="stat-label">Completed</div>
                            </div>
                        </div>

                        <div class="setting-item" style="margin-top: 24px;">
                            <div class="setting-title">
                                <span>🔐</span>
                                <span>Security Status</span>
                            </div>
                            <div id="userSecurityStatus"></div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div id="settingsTab" class="tab-content">
                        <div class="setting-item">
                            <div class="setting-title">
                                <span>🎨</span>
                                <span>Theme Colors</span>
                            </div>
                            <div class="setting-description">
                                Customize the app's color scheme
                            </div>
                            <div style="margin-top: 16px;">
                                <label style="display: block; margin-bottom: 12px;">
                                    <strong>Primary Color</strong>
                                    <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px;">
                                        <input type="color" id="primaryColorPicker" value="#9C27B0" 
                                               style="width: 60px; height: 40px; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer;">
                                        <span id="primaryColorHex" style="font-family: monospace; color: #757575;">#9C27B0</span>
                                    </div>
                                </label>
                                <label style="display: block; margin-bottom: 12px;">
                                    <strong>Background Gradient Start</strong>
                                    <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px;">
                                        <input type="color" id="bgStartColorPicker" value="#f3e5f5" 
                                               style="width: 60px; height: 40px; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer;">
                                        <span id="bgStartColorHex" style="font-family: monospace; color: #757575;">#f3e5f5</span>
                                    </div>
                                </label>
                                <label style="display: block; margin-bottom: 16px;">
                                    <strong>Background Gradient End</strong>
                                    <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px;">
                                        <input type="color" id="bgEndColorPicker" value="#ffe0f0" 
                                               style="width: 60px; height: 40px; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer;">
                                        <span id="bgEndColorHex" style="font-family: monospace; color: #757575;">#ffe0f0</span>
                                    </div>
                                </label>
                                <div style="display: flex; gap: 8px;">
                                    <button onclick="applyColors()" style="flex: 1;">
                                        Apply Colors
                                    </button>
                                    <button onclick="resetColors()" style="flex: 1; background: #757575;">
                                        Reset to Default
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-title">
                                <span>🎨</span>
                                <span>Preset Themes</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;">
                                <button onclick="applyTheme('purple')" style="background: linear-gradient(135deg, #9C27B0, #E1BEE7);">
                                    Purple
                                </button>
                                <button onclick="applyTheme('blue')" style="background: linear-gradient(135deg, #2196F3, #BBDEFB);">
                                    Blue
                                </button>
                                <button onclick="applyTheme('green')" style="background: linear-gradient(135deg, #4CAF50, #C8E6C9);">
                                    Green
                                </button>
                                <button onclick="applyTheme('orange')" style="background: linear-gradient(135deg, #FF9800, #FFE0B2);">
                                    Orange
                                </button>
                                <button onclick="applyTheme('pink')" style="background: linear-gradient(135deg, #E91E63, #F8BBD0);">
                                    Pink
                                </button>
                                <button onclick="applyTheme('teal')" style="background: linear-gradient(135deg, #009688, #B2DFDB);">
                                    Teal
                                </button>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-title">
                                <span>🔐</span>
                                <span>Data Encryption</span>
                            </div>
                            <div class="setting-description">
                                Current mode: <span id="currentEncryptionMode"></span>
                            </div>
                            <div id="encryptionActions"></div>
                        </div>

                        <div class="warning-box">
                            <strong>⚠️ Important:</strong> Changing encryption settings will require you to re-enter your password (if encrypted) or create a new one. Your existing tasks will be migrated.
                        </div>

                        <div class="setting-item">
                            <div class="setting-title">
                                <span>📊</span>
                                <span>Storage Info</span>
                            </div>
                            <div class="setting-description">
                                Total tasks: <strong id="storageTotalTasks">0</strong><br>
                                Data stored locally on this device
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-title">
                                <span>🗑️</span>
                                <span>Danger Zone</span>
                            </div>
                            <div class="setting-description">
                                Permanently delete all your data
                            </div>
                            <button onclick="confirmDeleteAllData()" style="background: #F44336; margin-top: 8px;">
                                Delete All Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script>
        let todos = [];
        let currentTab = 'today';
        let currentFilter = 'all';
        let selectedCategory = 'Other';
        let deferredPrompt;
        let encryptionKey = null;
        let encryptionMode = null;
        let selectedSetupOption = null;
        let draggedElement = null;
        let draggedIndex = null;

        // Load saved colors on startup
        function loadSavedColors() {
            const savedColors = localStorage.getItem('appColors');
            if (savedColors) {
                const colors = JSON.parse(savedColors);
                applyColorTheme(colors.primary, colors.bgStart, colors.bgEnd);
            }
        }

        // Apply color theme
        function applyColorTheme(primary, bgStart, bgEnd) {
            // Calculate variations
            const primaryRGB = hexToRgb(primary);
            const primaryDark = rgbToHex(
                Math.max(0, primaryRGB.r - 30),
                Math.max(0, primaryRGB.g - 30),
                Math.max(0, primaryRGB.b - 30)
            );
            const primaryLight = rgbToHex(
                Math.min(255, primaryRGB.r + 80),
                Math.min(255, primaryRGB.g + 80),
                Math.min(255, primaryRGB.b + 80)
            );

            // Apply CSS variables
            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--primary-dark', primaryDark);
            document.documentElement.style.setProperty('--primary-light', primaryLight);
            document.documentElement.style.setProperty('--bg-start', bgStart);
            document.documentElement.style.setProperty('--bg-end', bgEnd);

            // Update color pickers
            if (document.getElementById('primaryColorPicker')) {
                document.getElementById('primaryColorPicker').value = primary;
                document.getElementById('primaryColorHex').textContent = primary;
                document.getElementById('bgStartColorPicker').value = bgStart;
                document.getElementById('bgStartColorHex').textContent = bgStart;
                document.getElementById('bgEndColorPicker').value = bgEnd;
                document.getElementById('bgEndColorHex').textContent = bgEnd;
            }
        }

        // Color conversion helpers
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        // Update hex display when color picker changes
        document.addEventListener('DOMContentLoaded', function() {
            const pickers = [
                { picker: 'primaryColorPicker', hex: 'primaryColorHex' },
                { picker: 'bgStartColorPicker', hex: 'bgStartColorHex' },
                { picker: 'bgEndColorPicker', hex: 'bgEndColorHex' }
            ];

            pickers.forEach(p => {
                const picker = document.getElementById(p.picker);
                if (picker) {
                    picker.addEventListener('input', function() {
                        document.getElementById(p.hex).textContent = this.value.toUpperCase();
                    });
                }
            });
        });

        // Apply selected colors
        function applyColors() {
            const primary = document.getElementById('primaryColorPicker').value;
            const bgStart = document.getElementById('bgStartColorPicker').value;
            const bgEnd = document.getElementById('bgEndColorPicker').value;

            applyColorTheme(primary, bgStart, bgEnd);

            // Save to localStorage
            localStorage.setItem('appColors', JSON.stringify({
                primary: primary,
                bgStart: bgStart,
                bgEnd: bgEnd
            }));

            alert('Colors applied successfully!');
        }

        // Reset to default colors
        function resetColors() {
            const defaultColors = {
                primary: '#9C27B0',
                bgStart: '#f3e5f5',
                bgEnd: '#ffe0f0'
            };

            applyColorTheme(defaultColors.primary, defaultColors.bgStart, defaultColors.bgEnd);
            localStorage.setItem('appColors', JSON.stringify(defaultColors));

            alert('Colors reset to default!');
        }

        // Apply preset themes
        function applyTheme(theme) {
            const themes = {
                purple: { primary: '#9C27B0', bgStart: '#f3e5f5', bgEnd: '#ffe0f0' },
                blue: { primary: '#2196F3', bgStart: '#e3f2fd', bgEnd: '#bbdefb' },
                green: { primary: '#4CAF50', bgStart: '#e8f5e9', bgEnd: '#c8e6c9' },
                orange: { primary: '#FF9800', bgStart: '#fff3e0', bgEnd: '#ffe0b2' },
                pink: { primary: '#E91E63', bgStart: '#fce4ec', bgEnd: '#f8bbd0' },
                teal: { primary: '#009688', bgStart: '#e0f2f1', bgEnd: '#b2dfdb' }
            };

            const colors = themes[theme];
            applyColorTheme(colors.primary, colors.bgStart, colors.bgEnd);
            localStorage.setItem('appColors', JSON.stringify(colors));

            alert(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`);
        }

        // Encryption functions
        function encryptData(data, password) {
            return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        }

        function decryptData(encryptedData, password) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedData, password);
                const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
                return JSON.parse(decryptedStr);
            } catch (e) {
                return null;
            }
        }

        // Setup option selection
        function selectOption(option) {
            selectedSetupOption = option;
            document.getElementById('optionNoEncryption').classList.remove('selected');
            document.getElementById('optionEncryption').classList.remove('selected');
            
            if (option === 'none') {
                document.getElementById('optionNoEncryption').classList.add('selected');
            } else {
                document.getElementById('optionEncryption').classList.add('selected');
            }
        }

        function confirmSetup() {
            if (!selectedSetupOption) {
                alert('Please select an option');
                return;
            }

            localStorage.setItem('encryptionMode', selectedSetupOption);
            encryptionMode = selectedSetupOption;
            document.getElementById('setupScreen').style.display = 'none';

            if (selectedSetupOption === 'encrypted') {
                document.getElementById('lockScreen').style.display = 'flex';
            } else {
                loadTodosUnencrypted();
                showMainApp();
            }
        }

        // Handle password for encrypted mode
        function handlePassword() {
            const password = document.getElementById('passwordInput').value;
            const errorMsg = document.getElementById('errorMessage');
            
            if (!password) {
                errorMsg.textContent = 'Please enter a password.';
                errorMsg.classList.add('show');
                return;
            }

            const hasExistingData = localStorage.getItem('encryptedTodos');
            
            if (hasExistingData) {
                const decrypted = decryptData(hasExistingData, password);
                if (decrypted === null) {
                    errorMsg.textContent = 'Incorrect password. Try again.';
                    errorMsg.classList.add('show');
                    return;
                }
                todos = decrypted;
            }

            encryptionKey = password;
            errorMsg.classList.remove('show');
            showMainApp();
        }

        function showMainApp() {
            document.getElementById('lockScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';
            
            if (encryptionMode === 'encrypted') {
                document.getElementById('securityBadge').style.display = 'inline-flex';
            }
            
            renderTodos();
        }

        // Check initial setup status
        function checkSetupStatus() {
            const mode = localStorage.getItem('encryptionMode');
            
            if (!mode) {
                document.getElementById('setupScreen').style.display = 'flex';
                return;
            }

            encryptionMode = mode;

            if (mode === 'encrypted') {
                const hasData = localStorage.getItem('encryptedTodos');
                if (hasData) {
                    document.getElementById('lockSubtitle').textContent = 'Enter your password to unlock';
                    document.getElementById('lockButtonText').textContent = 'Unlock';
                }
                document.getElementById('lockScreen').style.display = 'flex';
            } else {
                loadTodosUnencrypted();
                showMainApp();
            }
        }

        // Save todos
        function saveTodos() {
            if (encryptionMode === 'encrypted') {
                if (!encryptionKey) return;
                const encrypted = encryptData(todos, encryptionKey);
                localStorage.setItem('encryptedTodos', encrypted);
            } else {
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        }

        // Load unencrypted todos
        function loadTodosUnencrypted() {
            const saved = localStorage.getItem('todos');
            if (saved) {
                todos = JSON.parse(saved);
            }
        }

        // Filter by category
        function filterByCategory(category) {
            currentFilter = category;
            
            // Update filter chips
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.remove('active');
            });
            document.getElementById(`filter-${category}`).classList.add('active');
            
            renderTodos();
        }

        // Select category for new task
        function selectCategory(category) {
            selectedCategory = category;
            
            // Update category options
            document.querySelectorAll('.category-option').forEach(option => {
                option.classList.remove('selected');
            });
            document.getElementById(`cat-${category}`).classList.add('selected');
        }

        // Add new todo
        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();

            if (!text) return;

            const todo = {
                id: Date.now(),
                text: text,
                category: selectedCategory,
                completed: false,
                createdAt: Date.now(),
                completedAt: null,
                order: 0
            };

            // Update order for existing todos
            todos = todos.map(t => ({ ...t, order: t.order + 1 }));
            todos.unshift(todo);
            
            input.value = '';
            saveTodos();
            renderTodos();
        }

        // Toggle todo completion
        function toggleTodo(id) {
            todos = todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                        completedAt: !todo.completed ? Date.now() : null
                    };
                }
                return todo;
            });
            saveTodos();
            renderTodos();
        }

        // Delete todo
        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }

        // Switch tabs
        function switchTab(tab) {
            currentTab = tab;
            document.querySelectorAll('.tab').forEach((t, i) => {
                t.classList.toggle('active', (i === 0 && tab === 'today') || (i === 1 && tab === 'previous'));
            });
            renderTodos();
        }

        // Drag and drop functions
        function handleDragStart(e, index) {
            draggedElement = e.target;
            draggedIndex = index;
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.target.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function handleDragEnter(e) {
            if (e.target.classList.contains('todo-item') && !e.target.classList.contains('completed')) {
                e.target.classList.add('drag-over');
            }
        }

        function handleDragLeave(e) {
            if (e.target.classList.contains('todo-item')) {
                e.target.classList.remove('drag-over');
            }
        }

        function handleDrop(e, dropIndex) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            
            e.target.classList.remove('drag-over');
            
            if (draggedIndex !== dropIndex && draggedIndex !== null) {
                const displayTodos = getFilteredTodos();
                const activeTodos = displayTodos.filter(t => !t.completed);
                
                // Get the actual todos being reordered
                const draggedTodo = activeTodos[draggedIndex];
                const newActiveTodos = [...activeTodos];
                newActiveTodos.splice(draggedIndex, 1);
                newActiveTodos.splice(dropIndex, 0, draggedTodo);
                
                // Update order property
                newActiveTodos.forEach((todo, idx) => {
                    const todoInList = todos.find(t => t.id === todo.id);
                    if (todoInList) {
                        todoInList.order = idx;
                    }
                });
                
                saveTodos();
                renderTodos();
            }
            
            return false;
        }

        function handleDragEnd(e) {
            e.target.classList.remove('dragging');
            document.querySelectorAll('.todo-item').forEach(item => {
                item.classList.remove('drag-over');
            });
            draggedElement = null;
            draggedIndex = null;
        }

        // Date helpers
        function isToday(timestamp) {
            const today = new Date();
            const date = new Date(timestamp);
            return today.toDateString() === date.toDateString();
        }

        function isPast(timestamp) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const date = new Date(timestamp);
            date.setHours(0, 0, 0, 0);
            return date < today;
        }

        function formatDateTime(timestamp) {
            const date = new Date(timestamp);
            const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            return date.toLocaleDateString('en-US', options);
        }

        // Handle Enter key
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                if (event.target.id === 'passwordInput') {
                    handlePassword();
                } else {
                    addTodo();
                }
            }
        }

        // Get filtered todos
        function getFilteredTodos() {
            let filtered = currentTab === 'today' 
                ? todos.filter(t => isToday(t.createdAt))
                : todos.filter(t => isPast(t.createdAt));
            
            if (currentFilter !== 'all') {
                filtered = filtered.filter(t => t.category === currentFilter);
            }
            
            return filtered;
        }

        // Render todos
        function renderTodos() {
            const todayTodos = todos.filter(t => isToday(t.createdAt));
            const pastTodos = todos.filter(t => isPast(t.createdAt));
            const displayTodos = getFilteredTodos();
            
            // Sort by order for active todos
            const activeTodos = displayTodos.filter(t => !t.completed).sort((a, b) => a.order - b.order);
            const completedTodos = displayTodos.filter(t => t.completed);

            document.getElementById('todayCount').textContent = todayTodos.length;
            document.getElementById('previousCount').textContent = pastTodos.length;
            document.getElementById('activeCount').textContent = activeTodos.length;
            document.getElementById('completedCount').textContent = completedTodos.length;

            const listContainer = document.getElementById('todoList');
            let html = '';

            if (activeTodos.length > 0) {
                html += '<div class="section-title"><span>⚡</span> Active Tasks (Drag to reorder)</div>';
                activeTodos.forEach((todo, index) => {
                    html += renderTodoItem(todo, index, false);
                });
            }

            if (completedTodos.length > 0) {
                html += '<div class="section-title"><span>✅</span> Completed</div>';
                completedTodos.forEach((todo, index) => {
                    html += renderTodoItem(todo, index, true);
                });
            }

            if (displayTodos.length === 0) {
                const filterText = currentFilter !== 'all' ? ` in "${currentFilter}"` : '';
                html = `
                    <div class="card empty-state">
                        ${currentTab === 'today' 
                            ? `No tasks for today${filterText}. ${currentFilter !== 'all' ? 'Try a different filter or add one above!' : 'Add one above to get started!'}`
                            : `No tasks from previous days${filterText}.`}
                    </div>
                `;
            }

            listContainer.innerHTML = html;
        }

        function renderTodoItem(todo, index, isCompleted) {
            const categoryClass = `cat-${todo.category.toLowerCase()}`;
            const draggableAttrs = !isCompleted ? `
                draggable="true"
                ondragstart="handleDragStart(event, ${index})"
                ondragover="handleDragOver(event)"
                ondragenter="handleDragEnter(event)"
                ondragleave="handleDragLeave(event)"
                ondrop="handleDrop(event, ${index})"
                ondragend="handleDragEnd(event)"
            ` : '';
            
            return `
                <div class="todo-item ${todo.completed ? 'completed' : ''}" ${draggableAttrs}>
                    ${!isCompleted ? '<div class="drag-handle">⋮⋮</div>' : ''}
                    <div class="checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${todo.id})"></div>
                    <div class="todo-content">
                        <div class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</div>
                        <div class="todo-meta">
                            <span class="category-tag ${categoryClass}">${todo.category}</span>
                            <span class="timestamp">Created: ${formatDateTime(todo.createdAt)}</span>
                            ${todo.completedAt ? `<span class="completed-time">✓ Completed: ${formatDateTime(todo.completedAt)}</span>` : ''}
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
                </div>
            `;
        }

        // PWA Install
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('installPrompt').classList.add('show');
        });

        function installApp() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    deferredPrompt = null;
                    document.getElementById('installPrompt').classList.remove('show');
                });
            }
        }

        function dismissInstall() {
            document.getElementById('installPrompt').classList.remove('show');
            localStorage.setItem('installDismissed', 'true');
        }

        // Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed'));
            });
        }

        // Initialize
        loadSavedColors();
        checkSetupStatus();

        if (localStorage.getItem('installDismissed')) {
            document.getElementById('installPrompt').style.display = 'none';
        }

        // Options Modal Functions
        function openOptionsModal() {
            updateOptionsModal();
            document.getElementById('optionsModal').classList.add('show');
        }

        function closeOptionsModal() {
            document.getElementById('optionsModal').classList.remove('show');
        }

        function closeModalOnOutsideClick(event) {
            if (event.target.id === 'optionsModal') {
                closeOptionsModal();
            }
        }

        function switchModalTab(tab) {
            // Update tabs
            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');

            // Update content
            document.getElementById('userTab').classList.remove('active');
            document.getElementById('settingsTab').classList.remove('active');
            
            if (tab === 'user') {
                document.getElementById('userTab').classList.add('active');
            } else {
                document.getElementById('settingsTab').classList.add('active');
            }
        }

        function updateOptionsModal() {
            // Update stats
            const totalTasks = todos.length;
            const completedTasks = todos.filter(t => t.completed).length;
            
            document.getElementById('totalTasksCount').textContent = totalTasks;
            document.getElementById('completedTasksCount').textContent = completedTasks;
            document.getElementById('storageTotalTasks').textContent = totalTasks;

            // Update encryption status
            const isEncrypted = encryptionMode === 'encrypted';
            const statusBadge = isEncrypted 
                ? '<span class="setting-status status-encrypted">🔐 Encrypted (AES-256)</span>'
                : '<span class="setting-status status-unencrypted">📂 Not Encrypted</span>';
            
            document.getElementById('userSecurityStatus').innerHTML = statusBadge;
            document.getElementById('currentEncryptionMode').innerHTML = statusBadge;

            // Update encryption actions
            const actionsHtml = isEncrypted
                ? `
                    <button onclick="switchToUnencrypted()" style="background: #2196F3; margin-top: 12px;">
                        Switch to Unencrypted
                    </button>
                    <button onclick="changePassword()" style="background: #FF9800; margin-top: 8px;">
                        Change Password
                    </button>
                `
                : `
                    <button onclick="switchToEncrypted()" style="background: #4CAF50; margin-top: 12px;">
                        Enable Encryption
                    </button>
                `;
            
            document.getElementById('encryptionActions').innerHTML = actionsHtml;
        }

        function switchToEncrypted() {
            if (!confirm('Enable encryption? You will need to create a password.')) return;
            
            const password = prompt('Create a password for encryption:');
            if (!password) return;
            
            const confirmPassword = prompt('Confirm your password:');
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Migrate data
            encryptionKey = password;
            encryptionMode = 'encrypted';
            localStorage.setItem('encryptionMode', 'encrypted');
            localStorage.removeItem('todos');
            saveTodos();
            
            document.getElementById('securityBadge').style.display = 'inline-flex';
            alert('Encryption enabled successfully!');
            closeOptionsModal();
            updateOptionsModal();
        }

        function switchToUnencrypted() {
            if (!confirm('Disable encryption? Your data will be stored without encryption.')) return;
            
            // Verify password first
            const password = prompt('Enter your current password to confirm:');
            if (!password || password !== encryptionKey) {
                alert('Incorrect password!');
                return;
            }

            // Migrate data
            encryptionMode = 'none';
            encryptionKey = null;
            localStorage.setItem('encryptionMode', 'none');
            localStorage.removeItem('encryptedTodos');
            localStorage.setItem('todos', JSON.stringify(todos));
            
            document.getElementById('securityBadge').style.display = 'none';
            alert('Encryption disabled. Data is now stored without encryption.');
            closeOptionsModal();
            updateOptionsModal();
        }

        function changePassword() {
            const currentPassword = prompt('Enter your current password:');
            if (!currentPassword || currentPassword !== encryptionKey) {
                alert('Incorrect password!');
                return;
            }

            const newPassword = prompt('Enter your new password:');
            if (!newPassword) return;

            const confirmPassword = prompt('Confirm your new password:');
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Update encryption key and re-save
            encryptionKey = newPassword;
            saveTodos();
            
            alert('Password changed successfully!');
            closeOptionsModal();
        }

        function confirmDeleteAllData() {
            if (!confirm('⚠️ WARNING: This will permanently delete ALL your tasks and settings. This cannot be undone!')) return;
            
            const confirmation = prompt('Type "DELETE" to confirm:');
            if (confirmation !== 'DELETE') {
                alert('Deletion cancelled.');
                return;
            }

            // Clear all data
            todos = [];
            localStorage.clear();
            
            alert('All data has been deleted. The page will reload.');
            location.reload();
        }
    </script>
</body>
</html>