<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

class Profil 
{

    #[Assert\NotBlank()]
    #[Assert\Length(min: 5, max: 100)]
    #[Assert\Email()]
    public string $email;

    /**
     * @Assert\NotBlank(normalizer="trim")
     * @Assert\Length(min=3, max=40)
     */
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Assert\Length(min: 3, max: 30)]
    public string $username = '';

    public string $country = '';

    public User $user;

   
    public function __construct(User $user)
    {
        $this->email = $user->getEmail();
        $this->username = $user->getUsername();
        $this->country = $user->getCountry() ?? '';
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    

    public function getEmail(): ?string
    {
        return $this->email;
    } 

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

}
