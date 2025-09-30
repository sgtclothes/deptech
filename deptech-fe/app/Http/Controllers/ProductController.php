<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;

class ProductController extends Controller
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

        $response = $this->api->get('/admin/products', $params);
        $products = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('products.index', compact('products', 'params'));
    }

    public function create()
    {
        $response = $this->api->get('/admin/categories');
        $categories = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'categoryId' => 'required',
            'name' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'stock' => 'required|integer|min:0',
        ]);

        $data = [
            'categoryId' => $request->categoryId,
            'name' => $request->name,
            'description' => $request->description,
            'stock' => $request->stock,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
            $response = $this->api->postMultipart('/admin/products', $data);
        } else {
            $response = $this->api->post('/admin/products', $data);
        }

        if ($response->successful()) {
            return redirect()->route('products.index')->with('success', $response->json()['message']);
        }

        $error = $response->json();
        return back()->with('error', $error['message'] ?? 'Failed to create product')->withInput();
    }

    public function edit($id)
    {
        $response = $this->api->get('/admin/products');
        $products = $response->successful() ? $response->json()['data']['rows'] : [];
        $product = collect($products)->firstWhere('id', $id);

        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $response = $this->api->get('/admin/categories');
        $categories = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'categoryId' => 'required',
            'name' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'stock' => 'required|integer|min:0',
        ]);

        $data = [
            'categoryId' => $request->categoryId,
            'name' => $request->name,
            'description' => $request->description,
            'stock' => $request->stock,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
            $response = $this->api->putMultipart('/admin/products/' . $id, $data);
        } else {
            $response = $this->api->put('/admin/products/' . $id, $data);
        }

        if ($response->successful()) {
            return redirect()->route('products.index')->with('success', $response->json()['message']);
        }

        $error = $response->json();
        return back()->with('error', $error['message'] ?? 'Failed to update product')->withInput();
    }

    public function destroy($id)
    {
        $response = $this->api->delete('/admin/products/' . $id);

        if ($response->successful()) {
            return redirect()->route('products.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to delete product');
    }
}
