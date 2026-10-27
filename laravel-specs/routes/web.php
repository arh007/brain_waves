<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InsightController;
use App\Http\Controllers\ProjectInquiryController;
use App\Http\Controllers\Admin\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| BRAIN WAVES Web Routes (PRD Section 5.5)
|--------------------------------------------------------------------------
*/

// Public Experience Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', fn () => view('pages.about'))->name('about');

Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{service:slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/works', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/works/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/insights', [InsightController::class, 'index'])->name('insights.index');
Route::get('/insights/{article:slug}', [InsightController::class, 'show'])->name('insights.show');

Route::get('/start-project', fn () => view('pages.project-builder'))->name('project-builder');
Route::post('/project-inquiries', [ProjectInquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('project-inquiries.store');

// Protected Admin CMS Routes
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/inquiries', [AdminDashboardController::class, 'inquiries'])->name('admin.inquiries');
    Route::patch('/inquiries/{inquiry}/status', [AdminDashboardController::class, 'updateInquiryStatus'])->name('admin.inquiries.status');
    Route::post('/inquiries/{inquiry}/notes', [AdminDashboardController::class, 'addInquiryNote'])->name('admin.inquiries.notes');
    Route::resource('projects', ProjectController::class)->except(['index', 'show']);
});
