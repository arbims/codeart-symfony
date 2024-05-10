<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CategoriesController extends AbstractController {

    private $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }


    
    #[Route("/admin/categories", name: 'admin.categories')]
    public function index(CategoryRepository $categoryRepository) {
        $categories = $categoryRepository->findAll();
        return $this->render('admin/categories/index.html.twig', compact('categories'));
    }


    #[Route("/admin/categories/add", name: 'admin.categories.add', methods:["GET", "POST"])]
    public function add(Request $request) {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() &&  $form->isValid()) {
            $this->em->persist($category);
            $this->em->flush();
            $this->addFlash('success', 'Category bien ajouter');
            return $this->redirectToRoute('admin.categories');
        }
        
        return $this->render('admin/categories/add.html.twig', [
            'form' => $form->createView(),
            'category' => $category
        ]);
    }

    #[Route("/admin/categories/{id}/edit", name: 'admin.categories.edit', methods:["GET", "POST","PUT"])]
    public function edit(Category $category, Request $request) {
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() &&  $form->isValid()) {
            $this->em->persist($category);
            $this->em->flush();
            $this->addFlash('success', 'Category bien modifier');
            return $this->redirectToRoute('admin_categories');
        }
        
        return $this->render('admin/categories/edit.html.twig', [
            'form' => $form->createView(),
            'category' => $category
        ]);
    }

    /**
     * @Route("/admin/categories/delete/{id}", name="admin_category_delete")
     * supprimer une categorie
     * 
     */
    #[Route("/admin/categories/delete/{id}", name: 'admin.categories.delete', methods:["GET"])]
    public function delete(Category $category) {
        $this->em->remove($category);
        $this->em->flush();
        $this->addFlash('success', 'Category bien supprimée');
        return $this->redirectToRoute('admin_categories');
    }
}