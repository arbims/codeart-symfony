<?php

namespace App\Controller;

use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController {

    #[Route("/", name: "page.home")]
    public function index() {
        
        $posts = [];
        return $this->render('home.html.twig', [
            'posts' => $posts
        ]);
    }
}