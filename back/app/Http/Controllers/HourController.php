<?php

namespace App\Http\Controllers;

use App\Models\Hour;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class HourController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $hours = Hour::query()
                ->with([
                    'day',
                ])
                ->orderBy('id', 'desc')->get();

            $response = [
                'success' => true,
                'message' => "Hours obtained successfully",
                'data' => $hours
            ];

            return response($response, 200);
        } catch (PDOException $exception) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $exception->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function getById(Request $request, $id)
    {
        try {
            if (Hour::find($id)) {
                $hour = Hour::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Hour obtained successfully",
                    'data' => $hour
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Hour Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];
            return response($response, 500);
        }
    }

    public function getDayHours(Request $request, $day)
    {
        try {
            if (Hour::where([
                ['day_id', '=', $day]
            ])->first()) {
                $hours = Hour::where([
                    ['day_id', '=', $day],
                ])->get();

                $response = [
                    'success' => true,
                    'message' => "Day Hours obtained successfully",
                    'data' => $hours
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Day Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $exception) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $exception->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function delete(Request $request, $id)
    {

        try {
            if (Hour::find($id)) {

                $hour = Hour::findOrFail($id);

                Hour::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Hour deleted",
                    'data' => $hour
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Hour Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function post(Request $request)
    {
        try {
            Hour::create($request->validate([
                'name' => 'required|string',
                'day_id' => 'required|integer'
            ]));
            $response = [
                'success' => true,
                'message' => "Hour Created",
                'data' => Hour::find(DB::getPdo()->lastInsertId())
            ];

            return response($response, 201);
        } catch (PDOException $ex) {
            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            if (Hour::find($id)) {

                Hour::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                    'day_id' => 'nullable|integer'
                ]));

                $response = [
                    'success' => true,
                    'message' => "Hour Updated",
                    'data' => Hour::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Hour Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }
}
