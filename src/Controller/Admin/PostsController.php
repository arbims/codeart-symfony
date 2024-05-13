<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use App\Form\PostType;
use App\Repository\PostRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PostsController extends AbstractController {

    private $em;

    public function __construct(ManagerRegistry $em) {
        $this->em = $em->getManager();
    }

    #[Route("/admin/posts", name: 'admin.posts')]
    public function index(PostRepository $postRepository) {
        $posts = $postRepository->findAll();
        return $this->render('admin/posts/index.html.twig', compact('posts'));
    }

    #[Route("/admin/posts/add", name: 'admin.posts.add', methods: ['GET', 'POST'])]
    public function add(Request $request) {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);
        if ($form->isSubmitted() &&  $form->isValid()) {
            $this->em->persist($post);
            $this->em->flush();
            $this->addFlash('success', 'Article bien ajouter');
            return $this->redirectToRoute('admin_posts');
        }
        
        return $this->render('admin/posts/add.html.twig', [
            'form' => $form->createView(),
            'post' => $post
        ]);
    }

    

    /**
     * @Route("/admin/posts/{id}/edit", name="admin_post_edit", methods={"GET","PUT","POST"})
     */
    public function edit(Post $post, Request $request) {
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() &&  $form->isValid()) {
            $this->em->persist($post);
            $this->em->flush();
            $this->addFlash('success', 'Article bien modifier');
            return $this->redirectToRoute('admin_posts');
        }
        
        return $this->render('admin/posts/edit.html.twig', [
            'form' => $form->createView(),
            'post' => $post
        ]);
    }

    /**
     * @Route("/admin/posts/delete/{id}", name="admin_post_delete")
     */
    public function delete(Post $post) {
        $this->em->remove($post);
        $this->em->flush();
        $this->addFlash('success', 'Article bien supprimée');
        return $this->redirectToRoute('admin_posts');
    }
}