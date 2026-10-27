<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations for BRAIN WAVES Studio.
     */
    public function up(): void
    {
        // 1. Users table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role', 50)->default('admin');
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. Project Categories
        Schema::create('project_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 120)->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 3. Services (Capabilities)
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->string('icon', 60)->default('brain-circuit');
            $table->string('summary', 255);
            $table->text('description');
            $table->json('deliverables')->nullable();
            $table->json('process_steps')->nullable();
            $table->json('faq_json')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 4. Projects (Portfolio)
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 180);
            $table->string('slug', 191)->unique();
            $table->string('client', 120);
            $table->string('year', 10)->default('2026');
            $table->foreignId('category_id')->nullable()->constrained('project_categories')->nullOnDelete();
            $table->string('summary', 255);
            $table->text('challenge');
            $table->text('solution');
            $table->text('results');
            $table->json('technologies')->nullable();
            $table->string('deliverables')->nullable();
            $table->text('featured_image');
            $table->json('gallery_images')->nullable();
            $table->json('metrics_json')->nullable();
            $table->string('status', 30)->default('published')->index();
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 5. Articles (Insights Editorial)
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('slug', 191)->unique();
            $table->string('author', 100)->default('Elena Vance');
            $table->string('category', 80)->default('Design Engineering');
            $table->string('excerpt', 300);
            $table->longText('body');
            $table->text('cover_image');
            $table->string('read_time', 30)->default('5 min read');
            $table->string('tags')->nullable();
            $table->string('status', 30)->default('published');
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 6. Testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name', 120);
            $table->string('client_title', 120);
            $table->string('company', 120);
            $table->text('quote');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 7. Project Inquiries (Project Lab / Lead Pipeline)
        Schema::create('project_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 32)->unique();
            $table->string('name', 120);
            $table->string('email', 254)->index();
            $table->string('company', 160)->nullable();
            $table->string('preferred_contact', 50)->default('email');
            $table->string('budget_range', 50);
            $table->string('timeline', 50);
            $table->text('brief');
            $table->string('status', 30)->default('new')->index(); // new, contacted, proposal, in_progress, closed
            $table->string('assigned_to', 120)->nullable();
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();
        });

        // 8. Pivot: Inquiry Services
        Schema::create('inquiry_services', function (Blueprint $table) {
            $table->foreignId('inquiry_id')->constrained('project_inquiries')->cascadeOnDelete();
            $table->foreignId('service_id')->constrained('services')->restrictOnDelete();
            $table->primary(['inquiry_id', 'service_id']);
        });

        // 9. Inquiry Notes
        Schema::create('inquiry_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained('project_inquiries')->cascadeOnDelete();
            $table->string('author', 120);
            $table->text('note');
            $table->timestamps();
        });

        // 10. Site Settings
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 80)->unique();
            $table->text('value');
            $table->string('type', 30)->default('string');
            $table->timestamps();
        });

        // 11. Activity Logs
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('action', 80);
            $table->string('entity_type', 60);
            $table->string('entity_id', 60)->nullable();
            $table->string('user_email', 255)->nullable();
            $table->text('metadata')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('inquiry_notes');
        Schema::dropIfExists('inquiry_services');
        Schema::dropIfExists('project_inquiries');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('services');
        Schema::dropIfExists('project_categories');
        Schema::dropIfExists('users');
    }
};
