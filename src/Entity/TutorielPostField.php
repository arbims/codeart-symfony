<?php

namespace App\Entity;

trait TutorielPostField {

  private ?string $name;
  private ?string $slug;

  public function getName(): ?string
  {
      return $this->name;
  }

  public function setName(?string $name): static
  {
      $this->name = $name;

      return $this;
  }

  public function getSlug(): ?string
  {
      return $this->slug;
  }

  public function setSlug(?string $slug): static
  {
      $this->slug = $slug;

      return $this;
  }
}
