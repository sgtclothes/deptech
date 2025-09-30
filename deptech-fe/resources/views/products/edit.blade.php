@extends('layouts.app')

@section('title', 'Edit Product')
@section('header', 'Edit Product')

@section('content')
<div class="max-w-2xl">
    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('products.update', $product['id']) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div>
                <label class="block text-gray-700 mb-2" for="categoryId">
                    Category <span class="text-red-500">*</span>
                </label>
                <select id="categoryId" name="categoryId" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Category</option>
                    @foreach($categories as $category)
                    <option value="{{ $category['id'] }}" {{ old('categoryId', $product['categoryId']) == $category['id'] ? 'selected' : '' }}>
                        {{ $category['name'] }}
                    </option>
                    @endforeach
                </select>
                @error('categoryId')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-4">
                <label class="block text-gray-700 mb-2" for="name">
                    Name <span class="text-red-500">*</span>
                </label>
                <input type="text" id="name" name="name" value="{{ old('name', $product['name']) }}" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                @error('name')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-4">
                <label class="block text-gray-700 mb-2" for="description">
                    Description
                </label>
                <textarea id="description" name="description" rows="4"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $product['description']) }}</textarea>
                @error('description')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-4">
                <label class="block text-gray-700 mb-2" for="stock">
                    Stock <span class="text-red-500">*</span>
                </label>
                <input type="number" id="stock" name="stock" value="{{ old('stock', $product['stock']) }}" min="0" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                @error('stock')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-4">
                <label class="block text-gray-700 mb-2" for="image">
                    Image <small class="text-gray-500">(Leave blank to keep current image)</small>
                </label>
                
                @if($product['image'])
                <div class="mb-2">
                    <p class="text-sm text-gray-600 mb-2">Current Image:</p>
                    <img src="http://localhost:8080{{ $product['image'] }}" alt="{{ $product['name'] }}" 
                        class="h-32 w-32 object-cover rounded border" id="currentImage">
                </div>
                @endif
                
                <input type="file" id="image" name="image" accept="image/*"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onchange="previewImage(event)">
                @error('image')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <div id="imagePreview" class="mt-4 hidden">
                    <p class="text-sm text-gray-600 mb-2">New Image Preview:</p>
                    <img id="preview" class="h-32 w-32 object-cover rounded border">
                </div>
            </div>

            <div class="flex gap-4 mt-6">
                <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    <i class="fas fa-save mr-2"></i>Update
                </button>
                <a href="{{ route('products.index') }}" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                    <i class="fas fa-times mr-2"></i>Cancel
                </a>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script>
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').classList.remove('hidden');
            document.getElementById('preview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}
</script>
@endpush