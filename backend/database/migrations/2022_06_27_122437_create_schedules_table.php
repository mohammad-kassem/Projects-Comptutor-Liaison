<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
  public function up()
  {
    Schema::create('schedules', function (Blueprint $table) {
      $table->id();
      $table->date('date');
      $table->time('start_time');
      $table->time('end_time');
      $table->integer('tutor_id');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('schedules');
  }
}
