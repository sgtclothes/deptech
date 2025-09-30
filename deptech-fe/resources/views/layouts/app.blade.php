<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Deptech Stock Management')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .toast-success {
            background-color: #10b981;
            color: white;
        }
        
        .toast-error {
            background-color: #ef4444;
            color: white;
        }
        
        .sidebar-active {
            background-color: #3b82f6;
            color: white;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 text-white flex flex-col">
            <div class="p-4 bg-gray-900">
                <h1 class="text-xl font-bold">Deptech Stock</h1>
                <p class="text-sm text-gray-400">Management System</p>
            </div>
            
            <nav class="flex-1 p-4 space-y-2">
                <a href="{{ route('dashboard') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 {{ request()->routeIs('dashboard') ? 'sidebar-active' : '' }}">
                    <i class="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
                <a href="{{ route('users.index') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 {{ request()->routeIs('users.*') ? 'sidebar-active' : '' }}">
                    <i class="fas fa-users"></i>
                    <span>Users</span>
                </a>
                <a href="{{ route('categories.index') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 {{ request()->routeIs('categories.*') ? 'sidebar-active' : '' }}">
                    <i class="fas fa-tags"></i>
                    <span>Categories</span>
                </a>
                <a href="{{ route('products.index') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 {{ request()->routeIs('products.*') ? 'sidebar-active' : '' }}">
                    <i class="fas fa-box"></i>
                    <span>Products</span>
                </a>
                <a href="{{ route('transactions.index') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 {{ request()->routeIs('transactions.*') ? 'sidebar-active' : '' }}">
                    <i class="fas fa-exchange-alt"></i>
                    <span>Transactions</span>
                </a>
            </nav>
            
            <div class="p-4 border-t border-gray-700">
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-left">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <!-- Header -->
            <header class="bg-white shadow-sm">
                <div class="px-8 py-4">
                    <h2 class="text-2xl font-semibold text-gray-800">@yield('header')</h2>
                </div>
            </header>

            <!-- Content -->
            <div class="p-8">
                @yield('content')
            </div>
        </main>
    </div>

    <!-- Toast Notifications -->
    @if(session('success'))
    <div class="toast toast-success" id="toast">
        <div class="flex items-center gap-3">
            <i class="fas fa-check-circle text-xl"></i>
            <div>
                <p class="font-semibold">Success</p>
                <p class="text-sm">{{ session('success') }}</p>
            </div>
        </div>
    </div>
    @endif

    @if(session('error'))
    <div class="toast toast-error" id="toast">
        <div class="flex items-center gap-3">
            <i class="fas fa-times-circle text-xl"></i>
            <div>
                <p class="font-semibold">Error</p>
                <p class="text-sm">{{ session('error') }}</p>
            </div>
        </div>
    </div>
    @endif

    <script>
        // Auto hide toast after 3 seconds
        const toast = document.getElementById('toast');
        if (toast) {
            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    </script>

    @stack('scripts')
</body>
</html>