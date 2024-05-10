<?php

namespace App\Controller\Admin;

use App\Entity\Technology;
use App\Form\TechnologyType;
use App\Repository\TechnologyRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TechnologiesController extends AbstractController {

    private $em;

    public function __construct(ManagerRegistry $em) {
        $this->em = $em->getManager();
    }


    /**
     * @Route("/admin/technologies", name="admin_technologies")
     */
    #[Route("/admin/technologies", name: 'admin.technologies')]
    public function index(TechnologyRepository $technologyRepository) {
        $technologies = $technologyRepository->findAll();
        return $this->render('admin/technologies/index.html.twig', compact('technologies'));
    }

    /**
     * @Route("/admin/technologies/add", name="admin_technology_add" , methods={"GET","POST"})
     */
    public function add(Request $request) {
        $technology = new Technology();
        $form = $this->createForm(TechnologyType::class, $technology);
        $form->handleRequest($request);
        if ($form->isSubmitted() &&  $form->isValid()) {
            $technology->setUpdatedAt(new DateTime());
            $this->em->persist($technology);
            $this->em->flush();
            $this->addFlash('success', 'Technologie bien ajouter');
            return $this->redirectToRoute('admin_technologies');
        }
        
        return $this->render('admin/technologies/add.html.twig', [
            'form' => $form->createView(),
            'technology' => $technology
        ]);
    }

    

    /**
     * @Route("/admin/technologies/{id}/edit", name="admin_technology_edit", methods={"GET","PUT","POST"})
     */
    public function edit(Technology $technology, Request $request) {
        $form = $this->createForm(TechnologyType::class, $technology);
        $form->handleRequest($request);

        if ($form->isSubmitted() &&  $form->isValid()) {
            $technology->setUpdatedAt(new DateTime());
            $this->em->persist($technology);
            $this->em->flush();
            $this->addFlash('success', 'Technologie bien modifier');
            return $this->redirectToRoute('admin_technologies');
        }
        
        return $this->render('admin/technologies/edit.html.twig', [
            'form' => $form->createView(),
            'technology' => $technology
        ]);
    }

    /**
     * @Route("/admin/technologies/delete/{id}", name="admin_technology_delete")
     */
    public function delete(Technology $technology) {
        $this->em->remove($technology);
        $this->em->flush();
        $this->addFlash('success', 'Technology bien supprimée');
        return $this->redirectToRoute('admin_technologies');
    }
}