<?php
include_once 'AbstractController.php';

class AuthController extends AbstractController {
    public function getAction($request) {
        $params = $request->url_elements;
        $auth = new AuthModel();
	if(isset($params[2]) && isset($params[3])) {
	   $data = $auth->login($params[2], $params[3]);
	} else if($params[2] === "logout" && !isset($params[3])) {
	   $data = $auth->logout();
	} else {
	   $data = $auth->check();
	}
        return $data;
    }

    public function postAction($request) {
    }
}
