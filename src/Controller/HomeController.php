<?php

namespace App\Controller;

use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController {

    #[Route("/", name: "page.home")]
    public function index(PostRepository $postRepository) {
        
        $posts = $postRepository->findAll();
        return $this->render('home.html.twig', [
            'posts' => $posts
        ]);
    }
}