<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240514153959 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE posts ADD user_id INT DEFAULT NULL, ADD online TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE posts ADD CONSTRAINT FK_885DBAFAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_885DBAFAA76ED395 ON posts (user_id)');
        $this->addSql('ALTER TABLE tutoriel ADD post_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tutoriel ADD CONSTRAINT FK_A2073AED4B89032C FOREIGN KEY (post_id) REFERENCES posts (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A2073AED4B89032C ON tutoriel (post_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE posts DROP FOREIGN KEY FK_885DBAFAA76ED395');
        $this->addSql('DROP INDEX IDX_885DBAFAA76ED395 ON posts');
        $this->addSql('ALTER TABLE posts DROP user_id, DROP online');
        $this->addSql('ALTER TABLE tutoriel DROP FOREIGN KEY FK_A2073AED4B89032C');
        $this->addSql('DROP INDEX UNIQ_A2073AED4B89032C ON tutoriel');
        $this->addSql('ALTER TABLE tutoriel DROP post_id');
    }
}
