<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $employees = Employee::all();

            $response = [
                'success' => true,
                'message' => "Employees obtained successfully",
                'data' => $employees
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
            if (Employee::find($id)) {
                $employee = Employee::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Employee obtained successfully",
                    'data' => $employee
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
            if (Employee::find($id)) {

                $employee = Employee::findOrFail($id);

                Employee::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Employee deleted",
                    'data' => $employee
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
            Employee::create($request->validate([
                'name' => 'required|string',
            ]));
            $response = [
                'success' => true,
                'message' => "Employee Created",
                'data' => Employee::find(DB::getPdo()->lastInsertId())
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
            if (Employee::find($id)) {

                Employee::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                ]));

                $response = [
                    'success' => true,
                    'message' => "Employee Updated",
                    'data' => Employee::find($id)
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
