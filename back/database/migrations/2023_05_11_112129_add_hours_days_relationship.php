<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hours', function (Blueprint $table) {
            $table->foreignId('day_id')->constrained('days')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hours', function (Blueprint $table) {
            $table->dropForeign('hours_day_id_foreign');
            $table->dropColumn('day_id');
        });
    }
};
