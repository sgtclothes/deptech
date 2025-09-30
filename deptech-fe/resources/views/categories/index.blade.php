@extends('layouts.app')

@section('title', 'Categories')
@section('header', 'Categories Management')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <a href="{{ route('categories.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <i class="fas fa-plus mr-2"></i>Add Category
            </a>
            
            <form action="{{ route('categories.index') }}" method="GET" class="flex gap-2 w-full md:w-auto">
                <input type="text" name="search" value="{{ $params['search'] }}" 
                    placeholder="Search categories..." 
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($categories as $category)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ $category['name'] }}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">{{ $category['description'] ?? '-' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex gap-2">
                            <a href="{{ route('categories.edit', $category['id']) }}" class="text-blue-600 hover:text-blue-900">
                                <i class="fas fa-edit"></i>
                            </a>
                            <form action="{{ route('categories.destroy', $category['id']) }}" method="POST" class="inline" 
                                onsubmit="return confirm('Are you sure you want to delete this category?')">
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
                    <td colspan="3" class="px-6 py-4 text-center text-gray-500">
                        No categories found.
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
                Showing {{ $params['offset'] + 1 }} to {{ $params['offset'] + count($categories) }}
            </div>
            <div class="flex gap-2">
                @if($params['offset'] > 0)
                <a href="{{ route('categories.index', ['offset' => max(0, $params['offset'] - $params['limit']), 'limit' => $params['limit'], 'search' => $params['search']]) }}" 
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                </a>
                @endif
                
                @if(count($categories) == $params['limit'])
                <a href="{{ route('categories.index', ['offset' => $params['offset'] + $params['limit'], 'limit' => $params['limit'], 'search' => $params['search']]) }}" 
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                </a>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection