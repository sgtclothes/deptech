<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Login - Deptech Stock Management</title>
   <script src="https://cdn.tailwindcss.com"></script>
   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>

<body class="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-4">
   <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
      <div class="text-center mb-8">
         <div class="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-boxes text-white text-2xl"></i>
         </div>
         <h1 class="text-3xl font-bold text-gray-800">Deptech Stock</h1>
         <p class="text-gray-600">Management System</p>
      </div>

      @if(session('error'))
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
         {{ session('error') }}
      </div>
      @endif

      @if(session('success'))
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
         {{ session('success') }}
      </div>
      @endif

      <form action="{{ route('login') }}" method="POST">
         @csrf
         <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="email">
               <i class="fas fa-envelope mr-2"></i>Email
            </label>
            <input type="email" id="email" name="email" required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Enter your email">
            @error('email')
            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
         </div>

         <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="password">
               <i class="fas fa-lock mr-2"></i>Password
            </label>
            <input type="password" id="password" name="password" required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Enter your password">
            @error('password')
            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
         </div>

         <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold">
            <i class="fas fa-sign-in-alt mr-2"></i>Login
         </button>
      </form>
   </div>
</body>

</html>