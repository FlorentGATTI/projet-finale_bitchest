<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        // Retrieve the token from the database
        $token = DB::table('password_resets')->where('email', $request->input('email'))->first()->token;

        // Construct the frontend link
        $frontendResetLink = "http://localhost:3000/reset-password/" . $token;

        return response()->json([
            'status' => __($status),
            'reset_link' => $frontendResetLink
        ]);
    }
}
