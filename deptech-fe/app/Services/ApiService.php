<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\UploadedFile;

class ApiService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.api.base_url');
    }

    protected function handleResponse($response)
    {
        if ($response->status() === 401 || $response->status() === 419) {
            session()->flush();
            return redirect()->route('login')->send();
        }

        return $response;
    }

    protected function getClient()
    {
        $http = Http::withOptions(['verify' => false]);

        // Get cookies from session
        $cookies = session('api_cookies', '');
        if ($cookies) {
            $http = $http->withHeaders([
                'Cookie' => $cookies
            ]);
        }
        return $http;
    }

    public function get($endpoint, $params = [])
    {
        $response = $this->getClient()
            ->withHeaders($this->getHeaders())
            ->get($this->baseUrl . $endpoint, $params);
        return  $this->handleResponse($response);
    }

    public function post($endpoint, $data = [])
    {
        $response = $this->getClient()
            ->withHeaders($this->getHeaders())
            ->post($this->baseUrl . $endpoint, $data);

        return $this->handleResponse($response);
    }

    public function postMultipart($endpoint, $data = [])
    {
        $http = $this->getClient()->withHeaders([
            'Accept' => 'application/json',
        ]);

        // Attach file kalau ada
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $file = $data['image'];
            $http = $http->attach(
                'image',
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            );
            unset($data['image']);
        }

        return $http->post($this->baseUrl . $endpoint, $data);
    }

    public function put($endpoint, $data = [])
    {
        $response = $this->getClient()
            ->withHeaders($this->getHeaders())
            ->put($this->baseUrl . $endpoint, $data);

        return $this->handleResponse($response);
    }

    public function putMultipart($endpoint, $data = [])
    {
        $http = $this->getClient()->withHeaders([
            'Accept' => 'application/json',
        ]);

        // Separate file from other data
        $files = [];
        $formData = [];

        foreach ($data as $key => $value) {
            if ($value instanceof UploadedFile) {
                $files[$key] = $value;
            } else {
                $formData[$key] = $value;
            }
        }

        // Attach files
        foreach ($files as $key => $file) {
            $http = $http->attach(
                $key,
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            );
        }

        return $http->put($this->baseUrl . $endpoint, $formData);
    }

    public function delete($endpoint)
    {
        $response = $this->getClient()
            ->withHeaders($this->getHeaders())
            ->delete($this->baseUrl . $endpoint);

        return $this->handleResponse($response);
    }

    protected function getHeaders()
    {
        return [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }
}
