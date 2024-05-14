<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use App\Plugins\Annotation\Uploadable;
use App\Plugins\Annotation\UploadableField;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email', message:"Ce email est deja pris")]
#[UniqueEntity('username', message:"Ce username est deja pris")]
class User implements UserInterface , PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable:false, unique:true)]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable:true)]
    #[Assert\EqualTo(propertyPath:"password_confirmation", message:"Les deux mot de passe ne sont pas identiques")]
    private ?string $password = null;

    private $password_confirmation;

    #[ORM\Column(length: 255, nullable:false, unique:true)]
    #[Assert\Email()]
    private ?string $email;

    #[ORM\Column(type: Types::JSON)]
    private $roles = [];

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $confirmation_token;

    #[ORM\Column(type: Types::BOOLEAN)]
    private $confirmed;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $firstname;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $lastname;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $avatar;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $country;

   
    public function __construct()
    {
        $this->confirmed = false;
        $this->roles[] = 'ROLE_USER';
        // may not be needed, see section on salt below
        // $this->salt = md5(uniqid('', true));
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

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPasswordConfirmation(): ?string
    {
        return $this->password_confirmation;
    }

    public function setPasswordConfirmation(string $password_confirmation): self
    {
        $this->password_confirmation = $password_confirmation;

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

    public function getConfirmationToken(): ?string
    {
        return $this->confirmation_token;
    }

    public function setConfirmationToken(?string $confirmation_token): self
    {
        $this->confirmation_token = $confirmation_token;

        return $this;
    }

    public function getConfirmed(): ?bool
    {
        return $this->confirmed;
    }

    public function setConfirmed(bool $confirmed): self
    {
        $this->confirmed = $confirmed;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }


    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials(): void
    {
       
    }

    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt,
        ));
    }

    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt
        ) = unserialize($serialized);
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar_file): self
    {
        $this->avatar = $avatar_file;

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
    
        /**
     * Returns the identifier for this user (e.g. username or email address).
     */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

}
