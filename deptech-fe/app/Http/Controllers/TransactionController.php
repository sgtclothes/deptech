<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $api;

    public function __construct(ApiService $api)
    {
        $this->api = $api;
    }

    public function index(Request $request)
    {
        $params = [
            'limit' => $request->get('limit', 10),
            'offset' => $request->get('offset', 0),
            'search' => $request->get('search', ''),
        ];

        $response = $this->api->get('/admin/transactions', $params);
        $transactions = $response->successful() ? $response->json()['data']['rows'] : [];
        $totalCount = $response->successful() ? $response->json()['data']['totalCount'] : 0;

        return view('transactions.index', compact('transactions', 'params', 'totalCount'));
    }

    public function create()
    {
        $response = $this->api->get('/admin/products');
        $products = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('transactions.create', compact('products'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:IN,OUT',
            'details' => 'required|array|min:1',
            'details.*.productId' => 'required',
            'details.*.stock' => 'required|integer|min:1',
        ]);

        $data = [
            'type' => $request->type,
            'detailTransactions' => $request->details,
        ];

        $response = $this->api->post('/admin/transactions', $data);

        if ($response->successful()) {
            return redirect()->route('transactions.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to create transaction')->withInput();
    }
}