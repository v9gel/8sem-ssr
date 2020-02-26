<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectsRepository")
 */
class Projects
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=1023)
     */
    private $body;

    /**
     * @ORM\Column(type="integer")
     */
    private $levels;

    /**
     * @ORM\Column(type="integer")
     */
    private $square;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $picture;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Materials", inversedBy="projects")
     * @ORM\JoinColumn(nullable=false)
     */
    private $material;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Buildings", inversedBy="projects")
     */
    private $buildings;

    public function __construct()
    {
        $this->buildings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getLevels(): ?int
    {
        return $this->levels;
    }

    public function setLevels(int $levels): self
    {
        $this->levels = $levels;

        return $this;
    }

    public function getSquare(): ?int
    {
        return $this->square;
    }

    public function setSquare(int $square): self
    {
        $this->square = $square;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getMaterial(): ?Materials
    {
        return $this->material;
    }

    public function setMaterial(?Materials $material): self
    {
        $this->material = $material;

        return $this;
    }

    /**
     * @return Collection|Buildings[]
     */
    public function getBuildings(): Collection
    {
        return $this->buildings;
    }

    public function addBuilding(Buildings $building): self
    {
        if (!$this->buildings->contains($building)) {
            $this->buildings[] = $building;
        }

        return $this;
    }

    public function removeBuilding(Buildings $building): self
    {
        if ($this->buildings->contains($building)) {
            $this->buildings->removeElement($building);
        }

        return $this;
    }

    public function __toString(){
        return $this->name;
    }
}
