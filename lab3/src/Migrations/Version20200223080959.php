<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200223080959 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE buildings (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE materials (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE projects (id INT AUTO_INCREMENT NOT NULL, material_id INT NOT NULL, name VARCHAR(255) NOT NULL, body VARCHAR(1023) NOT NULL, levels INT NOT NULL, square INT NOT NULL, picture VARCHAR(255) NOT NULL, INDEX IDX_5C93B3A4E308AC6F (material_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE projects_buildings (projects_id INT NOT NULL, buildings_id INT NOT NULL, INDEX IDX_43ED71981EDE0F55 (projects_id), INDEX IDX_43ED71981485E613 (buildings_id), PRIMARY KEY(projects_id, buildings_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4E308AC6F FOREIGN KEY (material_id) REFERENCES materials (id)');
        $this->addSql('ALTER TABLE projects_buildings ADD CONSTRAINT FK_43ED71981EDE0F55 FOREIGN KEY (projects_id) REFERENCES projects (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE projects_buildings ADD CONSTRAINT FK_43ED71981485E613 FOREIGN KEY (buildings_id) REFERENCES buildings (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE projects_buildings DROP FOREIGN KEY FK_43ED71981485E613');
        $this->addSql('ALTER TABLE projects DROP FOREIGN KEY FK_5C93B3A4E308AC6F');
        $this->addSql('ALTER TABLE projects_buildings DROP FOREIGN KEY FK_43ED71981EDE0F55');
        $this->addSql('DROP TABLE buildings');
        $this->addSql('DROP TABLE materials');
        $this->addSql('DROP TABLE projects');
        $this->addSql('DROP TABLE projects_buildings');
    }
}
