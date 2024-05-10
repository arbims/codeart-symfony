<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PostsController extends AbstractController {


    /**
     * @Route("/blog", name="posts_list")
     */
    public function index(PostRepository $postRepository , PaginatorInterface $paginator, Request $request)
    {
        $query = $postRepository->findAllArticle();
        $posts = $paginator->paginate($query,
            $request->query->getInt('page', 1), /*page number*/
            1 /*limit per page*/);
        return $this->render('posts/index.html.twig',['posts' => $posts]);
    }

    /**
     * @Route("blog/{slug<[a-z0-9A-Z\-]+>}-{id<\d+>}" , name="post_show")
     */
    public function show(Post $post, $slug)
    {
        if ($post->getSlug() !== $slug) {
            return $this->redirectToRoute('post_show', [
                'id' => $post->getId(),
                'slug' => $post->getSlug(),
            ], 301);
        }
        return $this->render('posts/show.html.twig', [
            'post' => $post,
        ]);
    }
}