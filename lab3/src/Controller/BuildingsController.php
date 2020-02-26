<?php

namespace App\Controller;

use App\Entity\Buildings;
use App\Form\BuildingsType;
use App\Repository\BuildingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/buildings")
 */
class BuildingsController extends AbstractController
{
    /**
     * @Route("/", name="buildings_index", methods={"GET"})
     */
    public function index(BuildingsRepository $buildingsRepository): Response
    {
        return $this->render('buildings/index.html.twig', [
            'buildings' => $buildingsRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="buildings_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $building = new Buildings();
        $form = $this->createForm(BuildingsType::class, $building);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($building);
            $entityManager->flush();

            return $this->redirectToRoute('buildings_index');
        }

        return $this->render('buildings/new.html.twig', [
            'building' => $building,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="buildings_show", methods={"GET"})
     */
    public function show(Buildings $building): Response
    {
        return $this->render('buildings/show.html.twig', [
            'building' => $building,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="buildings_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Buildings $building): Response
    {
        $form = $this->createForm(BuildingsType::class, $building);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('buildings_index');
        }

        return $this->render('buildings/edit.html.twig', [
            'building' => $building,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="buildings_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Buildings $building): Response
    {
        if ($this->isCsrfTokenValid('delete'.$building->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($building);
            $entityManager->flush();
        }

        return $this->redirectToRoute('buildings_index');
    }
}
