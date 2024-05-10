<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class TutorielsController extends AbstractController {

    #[Route("/admin/tutoriels", name: 'admin.tutoriels')]
    public function index() {
        
    }
}