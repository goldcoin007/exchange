<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminMenuTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('admin_menu', function (Blueprint $table) {
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('parent_id')->default(0);
			$table->integer('order')->default(0);
			$table->string('title', 50);
			$table->string('icon', 50)->nullable();
			$table->string('uri', 50)->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('admin_menu');
	}
}
