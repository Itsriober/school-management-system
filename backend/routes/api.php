<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Example API route for testing
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API is working!']);
});
