<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;

class CategoryController extends Controller
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

        $response = $this->api->get('/admin/categories', $params);
        $categories = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('categories.index', compact('categories', 'params'));
    }

    public function create()
    {
        return view('categories.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $response = $this->api->post('/admin/categories', $request->all());

        if ($response->successful()) {
            return redirect()->route('categories.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to create category')->withInput();
    }

    public function edit($id)
    {
        $response = $this->api->get('/admin/categories');
        $categories = $response->successful() ? $response->json()['data']['rows'] : [];
        $category = collect($categories)->firstWhere('id', $id);

        return view('categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        $response = $this->api->put('/admin/categories/' . $id, $request->all());

        if ($response->successful()) {
            return redirect()->route('categories.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to update category')->withInput();
    }

    public function destroy($id)
    {
        $response = $this->api->delete('/admin/categories/' . $id);

        if ($response->successful()) {
            return redirect()->route('categories.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to delete category');
    }
}