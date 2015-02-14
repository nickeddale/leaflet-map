<?php


class HotelsTableSeeder extends seeder {

	public function run() {

		Hotels::truncate(); //empty's the table before seeding

		$data = file_get_contents(app_path() . '/data/hotels.json');

		$jsonData = json_decode($data);

		foreach ($jsonData->features as $hotelData)
		{
			if (isset($hotelData->properties->name))
			{
				$name = $hotelData->properties->name;
			} else
			{
				$name = 'Unknown';
			}

			$geometry = array_flatten($hotelData->geometry);

			$input = [
				'name' => $name,
				'region' => '',
				'latitude' => $geometry[2],
				'longitude' => $geometry[1]
			];

			Hotels::create([
				'name' => $input['name'],
				'region' => $input['region'],
				'latitude' => $input['latitude'],
				'longitude' => $input['longitude']
			]);

		};


	}
}