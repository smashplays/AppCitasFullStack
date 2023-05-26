<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $services = Service::all();

            $response = [
                'success' => true,
                'message' => "Services obtained successfully",
                'data' => $services
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
            if (Service::find($id)) {
                $service = Service::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Service obtained successfully",
                    'data' => $service
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Service Not Found",
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
            if (Service::find($id)) {

                $service = Service::findOrFail($id);

                Service::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Service deleted",
                    'data' => $service
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Service Not Found",
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
            Service::create($request->validate([
                'name' => 'required|string',
            ]));
            $response = [
                'success' => true,
                'message' => "Service Created",
                'data' => Service::find(DB::getPdo()->lastInsertId())
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
            if (Service::find($id)) {

                Service::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                ]));

                $response = [
                    'success' => true,
                    'message' => "Service Updated",
                    'data' => Service::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Service Not Found",
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
