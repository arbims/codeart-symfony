<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use App\Entity\Tutoriel;
use App\Form\PostType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Vich\UploaderBundle\Form\Type\VichFileType;

class TutorielCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Tutoriel::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud->addFormTheme('@FOSCKEditor/Form/ckeditor_widget.html.twig');
    }

    public function configureFields(string $pageName): iterable
    {
        return [

            //CollectionField::new('post')->setEntryType(PostType::class)->setColumns(12),
            AssociationField::new('post')->renderAsEmbeddedForm(PostCrudController::class)->setColumns(12)->setRequired(true),
            NumberField::new('duration')->setColumns(6),

        ];
    }

}
