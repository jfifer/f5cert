<?php
include_once 'AbstractController.php';

class AuthController extends AbstractController {
   public function getAction($request) {
      $auth = new AuthModel();
      return $auth->checkAuth();
   }

   public function postAction($request) {
      $params = $request->url_elements;
      $auth = new AuthModel();
      if(isset($params[2]) && isset($params[3])) {
         $data = $auth->login($params[2], $params[3]);
      } else {
         $data = $auth->logout();
      }
      return $data;
   }
}
