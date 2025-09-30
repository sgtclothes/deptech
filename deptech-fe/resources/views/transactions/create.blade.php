@extends('layouts.app')

@section('title', 'Create Transaction')
@section('header', 'Create New Transaction')

@section('content')
<div class="max-w-4xl">
    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('transactions.store') }}" method="POST" id="transactionForm">
            @csrf
            
            <div>
                <label class="block text-gray-700 mb-2" for="type">
                    Transaction Type <span class="text-red-500">*</span>
                </label>
                <select id="type" name="type" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Type</option>
                    <option value="IN" {{ old('type') == 'IN' ? 'selected' : '' }}>IN (Stock In)</option>
                    <option value="OUT" {{ old('type') == 'OUT' ? 'selected' : '' }}>OUT (Stock Out)</option>
                </select>
                @error('type')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Transaction Items</h3>
                    <button type="button" onclick="addItem()" 
                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <i class="fas fa-plus mr-2"></i>Add Item
                    </button>
                </div>

                <div id="itemsContainer">
                    <!-- Items will be added here -->
                </div>

                @error('details')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex gap-4 mt-6">
                <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    <i class="fas fa-save mr-2"></i>Save Transaction
                </button>
                <a href="{{ route('transactions.index') }}" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                    <i class="fas fa-times mr-2"></i>Cancel
                </a>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script>
let itemIndex = 0;
const products = @json($products);

function addItem() {
    const container = document.getElementById('itemsContainer');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'border border-gray-300 rounded-lg p-4 mb-4';
    itemDiv.id = `item-${itemIndex}`;
    
    itemDiv.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h4 class="font-semibold">Item #${itemIndex + 1}</h4>
            <button type="button" onclick="removeItem(${itemIndex})" 
                class="text-red-600 hover:text-red-900">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 mb-2">
                    Product <span class="text-red-500">*</span>
                </label>
                <select name="details[${itemIndex}][productId]" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Product</option>
                    ${products.map(p => `<option value="${p.id}">${p.name} (Stock: ${p.stock})</option>`).join('')}
                </select>
            </div>
            
            <div>
                <label class="block text-gray-700 mb-2">
                    Quantity <span class="text-red-500">*</span>
                </label>
                <input type="number" name="details[${itemIndex}][stock]" min="1" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quantity">
            </div>
        </div>
    `;
    
    container.appendChild(itemDiv);
    itemIndex++;
}

function removeItem(index) {
    const item = document.getElementById(`item-${index}`);
    if (item) {
        item.remove();
    }
}

// Add first item by default
window.addEventListener('DOMContentLoaded', function() {
    addItem();
});
</script>
@endpush