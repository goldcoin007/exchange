<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockControlAdminOperationLogTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('block_control_admin_operation_log', function (Blueprint $table) {
			$table->bigInteger('id')->unsigned()->primary();
			$table->bigInteger('user_id')->index();
			$table->string('path');
			$table->string('method', 10);
			$table->string('ip');
			$table->text('input');
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
		Schema::drop('block_control_admin_operation_log');
	}
}
