<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

Route::get('/debug', 'HomeController@debug');

Route::post('/hoteldata/',[
	'as' => 'hotel_data',
	'uses' => 'HomeController@data'
	]);

// 
// To allow this app to funciton as a subdomain of another site
// 

Route::get('/maps', function()
{
	return View::make('hello');
});

Route::post('maps/hoteldata/',[
	'as' => 'hotel_data',
	'uses' => 'HomeController@data'
	]);

