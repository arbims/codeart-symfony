<?php

namespace App\Controller;

use App\Entity\User;
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
        return $this->render('auth/profil.html.twig', [
            'form_profil' => $profilForm->createView()
        ]);
    }
}
