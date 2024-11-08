<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ImageProfilType;
use App\Form\ProfilType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/auth/profil', name: 'user.profil')]
    public function index(): Response
    {
        $user = new User();
        $profilForm = $this->createForm(ProfilType::class, $user);
        $imageProfilForm = $this->createForm(ImageProfilType::class, $user);
        return $this->render('auth/profil.html.twig', [
            'form_profil' => $profilForm->createView(),
            'image_profil' => $imageProfilForm->createView()
        ]);
    }
}
