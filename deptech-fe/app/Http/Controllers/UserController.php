<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;

class UserController extends Controller
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

        $response = $this->api->get('/admin/users', $params);
        $users = $response->successful() ? $response->json()['data']['rows'] : [];

        return view('users.index', compact('users', 'params'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'birthDate' => 'required|date',
            'gender' => 'required|in:male,female',
            'email' => 'required|email',
            'role' => 'required',
            'password' => 'required|min:6',
        ]);

        $response = $this->api->post('/admin/users', $request->all());

        if ($response->successful()) {
            return redirect()->route('users.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to create user')->withInput();
    }

    public function edit($id)
    {
        $response = $this->api->get('/admin/users');
        $users = $response->successful() ? $response->json()['data']['rows'] : [];
        $user = collect($users)->firstWhere('id', $id);

        return view('users.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'birthDate' => 'required|date',
            'gender' => 'required|in:male,female',
            'email' => 'required|email',
            'role' => 'required',
        ]);

        $data = $request->except('password');
        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        $response = $this->api->put('/admin/users/' . $id, $data);

        if ($response->successful()) {
            return redirect()->route('users.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to update user')->withInput();
    }

    public function destroy($id)
    {
        $response = $this->api->delete('/admin/users/' . $id);

        if ($response->successful()) {
            return redirect()->route('users.index')->with('success', $response->json()['message']);
        }

        return back()->with('error', 'Failed to delete user');
    }
}