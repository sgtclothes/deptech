<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $api;

    public function __construct(ApiService $api)
    {
        $this->api = $api;
    }

    public function showLogin()
    {
        // Redirect to dashboard if already logged in
        if (session()->has('user_id')) {
            return redirect()->route('dashboard');
        }
        
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $response = $this->api->post('/auth/login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            session(['user_id' => $data['data']['id']]);
            
            // Store cookies from backend untuk forwarding ke API
            $cookies = $response->cookies();
            $cookieString = '';
            
            foreach ($cookies as $cookie) {
                $cookieString .= $cookie->getName() . '=' . $cookie->getValue() . '; ';
            }
            
            // Simpan cookie string di session
            session(['api_cookies' => trim($cookieString, '; ')]);

            return redirect()->route('dashboard')->with('success', $data['message']);
        }

        return back()->with('error', 'Login failed. Please check your credentials.');
    }

    public function logout()
    {
        $this->api->post('/auth/logout');
        session()->flush(); // Clear all session data
        return redirect()->route('login')->with('success', 'Logged out successfully');
    }
}