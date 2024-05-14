<?php

namespace App\Entity;

use App\Repository\TutorielRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: TutorielRepository::class)]
class Tutoriel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::INTEGER)]
    private $duration = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $youtube_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $youtube_thumbnail = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $video_path = null;

    #[ORM\Column(type: Types::INTEGER, nullable:true)]
    private $video_length = null;

    #[ORM\Column(type: Types::INTEGER, nullable:true)]
    private $demo = null;

    #[ORM\Column(type: Types::INTEGER, nullable:true)]
    private $source = null;

    #[ORM\Column(type: Types::INTEGER, nullable:true)]
    private $premium;

    #[ORM\Column(type: Types::INTEGER, nullable:true)]
    private $lvl;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Post $post = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getYoutubeId(): ?string
    {
        return $this->youtube_id;
    }

    public function setYoutubeId(string $youtube_id): self
    {
        $this->youtube_id = $youtube_id;

        return $this;
    }

    public function getYoutubeThumbnail(): ?string
    {
        return $this->youtube_thumbnail;
    }

    public function setYoutubeThumbnail(string $youtube_thumbnail): self
    {
        $this->youtube_thumbnail = $youtube_thumbnail;

        return $this;
    }

    public function getVideoPath(): ?string
    {
        return $this->video_path;
    }

    public function setVideoPath(string $video_path): self
    {
        $this->video_path = $video_path;

        return $this;
    }

    public function getVideoLength(): ?int
    {
        return $this->video_length;
    }

    public function setVideoLength(?int $video_length): self
    {
        $this->video_length = $video_length;

        return $this;
    }

    public function getDemo(): ?int
    {
        return $this->demo;
    }

    public function setDemo(?int $demo): self
    {
        $this->demo = $demo;

        return $this;
    }

    public function getSource(): ?int
    {
        return $this->source;
    }

    public function setSource(?int $source): self
    {
        $this->source = $source;

        return $this;
    }

    public function getPremium(): ?int
    {
        return $this->premium;
    }

    public function setPremium(?int $premium): self
    {
        $this->premium = $premium;

        return $this;
    }

    public function getLvl(): ?int
    {
        return $this->lvl;
    }

    public function setLvl(?int $lvl): self
    {
        $this->lvl = $lvl;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }

    use TutorielPostField;
}
