@extends('layouts.app')

@section('title', 'Products')
@section('header', 'Products Management')

@section('content')
<div class="bg-white rounded-lg shadow">
   <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <a href="{{ route('products.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <i class="fas fa-plus mr-2"></i>Add Product
         </a>

         <form action="{{ route('products.index') }}" method="GET" class="flex gap-2 w-full md:w-auto">
            <input type="text" name="search" value="{{ $params['search'] }}"
               placeholder="Search products..."
               class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64">
            <button type="submit" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
               <i class="fas fa-search"></i>
            </button>
         </form>
      </div>
   </div>

   <div class="overflow-x-auto">
      <table class="w-full">
         <thead class="bg-gray-50">
            <tr>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
         </thead>
         <tbody class="bg-white divide-y divide-gray-200">
            @forelse($products as $product)
            <tr>
               <td class="px-6 py-4 whitespace-nowrap">
                  @if($product['image'])
                  <img src="http://localhost:8080{{ $product['image'] }}" alt="{{ $product['name'] }}"
                     class="h-12 w-12 rounded object-cover">
                  @else
                  <div class="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                     <i class="fas fa-image text-gray-400"></i>
                  </div>
                  @endif
               </td>
               <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ $product['name'] }}</div>
               </td>
               <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                     {{ $product['category']['name'] ?? '-' }}
                  </span>
               </td>
               <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ $product['description'] ?? '-' }}</div>
               </td>
               <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            {{ $product['stock'] > 10 ? 'bg-green-100 text-green-800' : ($product['stock'] > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') }}">
                     {{ $product['stock'] }}
                  </span>
               </td>
               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                     <a href="{{ route('products.edit', $product['id']) }}" class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                     </a>
                     <form action="{{ route('products.destroy', $product['id']) }}" method="POST" class="inline"
                        onsubmit="return confirm('Are you sure you want to delete this product?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:text-red-900">
                           <i class="fas fa-trash"></i>
                        </button>
                     </form>
                  </div>
               </td>
            </tr>
            @empty
            <tr>
               <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  No products found.
               </td>
            </tr>
            @endforelse
         </tbody>
      </table>
   </div>

   <!-- Pagination -->
   <div class="p-6 border-t border-gray-200">
      <div class="flex justify-between items-center">
         <div class="text-sm text-gray-700">
            Showing {{ $params['offset'] + 1 }} to {{ $params['offset'] + count($products) }}
         </div>
         <div class="flex gap-2">
            @if($params['offset'] > 0)
            <a href="{{ route('products.index', ['offset' => max(0, $params['offset'] - $params['limit']), 'limit' => $params['limit'], 'search' => $params['search']]) }}"
               class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
               Previous
            </a>
            @endif

            @if(count($products) == $params['limit'])
            <a href="{{ route('products.index', ['offset' => $params['offset'] + $params['limit'], 'limit' => $params['limit'], 'search' => $params['search']]) }}"
               class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
               Next
            </a>
            @endif
         </div>
      </div>
   </div>
</div>
@endsection