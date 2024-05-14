<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(readonly UserPasswordHasherInterface  $userPasswordHasherInterface)
    {

    }
    
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@gmail.com');
        $user->setUsername('admin');
        $user->setFirstname('admin');
        $user->setLastname('admin');
        $user->setConfirmed(true);
        $user->setConfirmationToken(null);
        $password = $this->userPasswordHasherInterface->hashPassword($user, 'admin');
        $user->setPassword($password);
        $user->setRoles(['ROLE_ADMIN','ROLE_USER']);
        $manager->persist($user);
        $manager->flush();

        $user = new User();
        $user->setEmail('user@gmail.com');
        $user->setUsername('user');
        $user->setFirstname('user');
        $user->setLastname('user');
        $user->setConfirmed(true);
        $user->setConfirmationToken(null);
        $password = $this->userPasswordHasherInterface->hashPassword($user, 'user');
        $user->setPassword($password);
        $user->setRoles(['ROLE_USER']);
        $manager->persist($user);
        $manager->flush();
    }
}
