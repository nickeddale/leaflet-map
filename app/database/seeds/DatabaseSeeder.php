<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();
		DB::statement('SET FOREIGN_KEY_CHECKS = 0;'); //disable foriegn key check

		$this->call('HotelsTableSeeder');

		DB::statement('SET FOREIGN_KEY_CHECKS = 1;'); //renables foriegn key check

	}

}
