<?php


class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		return View::make('hello');
	}

	public function data()
	{
		$region = Input::get('region');

		if ($region === 'all')
		{
			return json_encode(Hotels::all());
		}

		return json_encode(Hotels::where('region', $region)->get());
		

		// $data = Hotels::where('name', $name);

		// return json_encode($data);
	}


	public function debug()
	{

	$data = file_get_contents(app_path() . '/data/hotels.json');

		$jsonData = json_decode($data);

		foreach ($jsonData->features as $hotelData)
		{
			if ( is_null($hotelData->properties->name) )
			{
				$name = 'Unknown';

			} else
			{
				$name = $hotelData->properties->name;
			}

			$geometry = array_flatten($hotelData->geometry);

			$input = [
				'name' => $name,
				'region' => '',
				'latitude' => $geometry[2],
				'longitude' => $geometry[1]
			];

			dd($input);
		}
	}
}
