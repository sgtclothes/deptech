@extends('layouts.app')

@section('title', 'Transactions')
@section('header', 'Transaction History')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <a href="{{ route('transactions.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <i class="fas fa-plus mr-2"></i>New Transaction
            </a>
            
            <form action="{{ route('transactions.index') }}" method="GET" class="flex gap-2 w-full md:w-auto">
                <input type="text" name="search" value="{{ $params['search'] }}" 
                    placeholder="Search transactions..." 
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($transactions as $transaction)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                            {{ date('d M Y H:i', strtotime($transaction['createdAt'])) }}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            {{ $transaction['type'] == 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            <i class="fas fa-arrow-{{ $transaction['type'] == 'IN' ? 'down' : 'up' }} mr-1"></i>
                            {{ $transaction['type'] }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">
                            {{ count($transaction['detailTransactions']) }} item(s)
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <button type="button" onclick="toggleDetails('details-{{ $transaction['id'] }}')" 
                            class="text-blue-600 hover:text-blue-900">
                            <i class="fas fa-eye mr-1"></i>View Details
                        </button>
                    </td>
                </tr>
                <tr id="details-{{ $transaction['id'] }}" class="hidden bg-gray-50">
                    <td colspan="4" class="px-6 py-4">
                        <div class="text-sm">
                            <p class="font-semibold mb-2">Transaction Details:</p>
                            <table class="min-w-full">
                                <thead>
                                    <tr>
                                        <th class="text-left px-2 py-1">Product</th>
                                        <th class="text-left px-2 py-1">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($transaction['detailTransactions'] as $detail)
                                    <tr>
                                        <td class="px-2 py-1">{{ $detail['product']['name'] ?? 'Unknown' }}</td>
                                        <td class="px-2 py-1">{{ $detail['stock'] }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                        No transactions found.
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
                Showing {{ $params['offset'] + 1 }} to {{ $params['offset'] + count($transactions) }}
            </div>
            <div class="flex gap-2">
                @if($params['offset'] > 0)
                <a href="{{ route('transactions.index', ['offset' => max(0, $params['offset'] - $params['limit']), 'limit' => $params['limit'], 'search' => $params['search']]) }}" 
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                </a>
                @endif
                
                @if(count($transactions) == $params['limit'])
                <a href="{{ route('transactions.index', ['offset' => $params['offset'] + $params['limit'], 'limit' => $params['limit'], 'search' => $params['search']]) }}" 
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                </a>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function toggleDetails(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
}
</script>
@endpush