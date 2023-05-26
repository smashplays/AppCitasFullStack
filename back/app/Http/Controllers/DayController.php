<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class DayController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $days = Day::query()
                ->with([
                    'employee',
                    'hours'
                ])
                ->orderBy('id', 'desc')->get();

            $response = [
                'success' => true,
                'message' => "Days obtained successfully",
                'data' => $days
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
            if (Day::find($id)) {
                $day = Day::with(['hours'])->findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Day obtained successfully",
                    'data' => $day
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
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];
            return response($response, 500);
        }
    }

    public function getEmployeeDays(Request $request, $employee)
    {
        try {
            if (Day::where([
                ['employee_id', '=', $employee]
            ])->first()) {
                $days = Day::where([
                    ['employee_id', '=', $employee],
                ])->with(['hours'])->get();

                $response = [
                    'success' => true,
                    'message' => "Employee Days obtained successfully",
                    'data' => $days
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Employee Not Found",
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
            if (Day::find($id)) {

                $day = Day::findOrFail($id);

                Day::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Day deleted",
                    'data' => $day
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
            Day::create($request->validate([
                'name' => 'required|string',
                'employee_id' => 'required|integer'
            ]));
            $response = [
                'success' => true,
                'message' => "Day Created",
                'data' => Day::find(DB::getPdo()->lastInsertId())
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
            if (Day::find($id)) {

                Day::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                    'employee_id' => 'nullable|integer'
                ]));

                $response = [
                    'success' => true,
                    'message' => "Day Updated",
                    'data' => Day::find($id)
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
