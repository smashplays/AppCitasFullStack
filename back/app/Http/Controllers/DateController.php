<?php

namespace App\Http\Controllers;

use App\Models\Date;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class DateController extends Controller
{

    public function getAll(Request $request)
    {
        try {
            $dates =  Date::query()
                ->with([
                    'user',
                    'employee',  'service'
                ])
                ->orderBy('id', 'desc')->get();

            $response = [
                'success' => true,
                'message' => "Dates obtained successfully",
                'data' => $dates
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
            if (Date::find($id)) {
                $date = Date::with(['user'])->findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Date obtained successfully",
                    'data' => $date
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Date Not Found",
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

    public function delete(Request $request, $id)
    {

        try {
            if (Date::find($id)) {

                $date = Date::findOrFail($id);

                Date::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Date deleted",
                    'data' => $date
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Date Not Found",
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
            Date::create($request->validate([
                'time' => 'required|string',
                'employee_id' => 'required|integer',
                'service_id' => 'required|integer',
                'user_id' => 'required|integer'
            ]));
            $response = [
                'success' => true,
                'message' => "Date Created",
                'data' => Date::find(DB::getPdo()->lastInsertId())
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
            if (Date::find($id)) {

                Date::findOrFail($id)->update($request->validate([
                    'time' => 'nullable|string',
                    'employee_id' => 'nullable|integer',
                    'service_id' => 'nullable|integer',
                    'user_id' => 'nullable|integer'
                ]));

                $response = [
                    'success' => true,
                    'message' => "Date Updated",
                    'data' => Date::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Date Not Found",
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

    public function getUserDates(Request $request, $user)
    {
        try {
            if (Date::where([
                ['user_id', '=', $user]
            ])->first()) {
                $dates = Date::where([
                    ['user_id', '=', $user],
                ])->with([
                    'user',
                    'employee',  'service'
                ])->orderBy('id', 'desc')->get();

                $response = [
                    'success' => true,
                    'message' => "User Dates obtained successfully",
                    'data' => $dates
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "User Not Found",
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
}
