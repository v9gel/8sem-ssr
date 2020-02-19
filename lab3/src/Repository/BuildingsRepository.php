<?php

namespace App\Repository;

use App\Entity\Buildings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Buildings|null find($id, $lockMode = null, $lockVersion = null)
 * @method Buildings|null findOneBy(array $criteria, array $orderBy = null)
 * @method Buildings[]    findAll()
 * @method Buildings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BuildingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Buildings::class);
    }

    // /**
    //  * @return Buildings[] Returns an array of Buildings objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Buildings
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
