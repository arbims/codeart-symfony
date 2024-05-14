<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Vich\UploaderBundle\Form\Type\VichFileType;

class PostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Post::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name')->setColumns(6),
            TextField::new('slug')->setColumns(6),
            TextField::new('imageFile')->setFormType(VichFileType::class)->onlyOnForms(),
            ImageField::new('image')->setBasePath('uploads/posts')->onlyOnIndex(),
            TextEditorField::new('content')->setColumns(12),
            AssociationField::new('user'),
            AssociationField::new('category')->autocomplete()->setColumns(6),
            ChoiceField::new('type')->setChoices(['post' => '1', 'tutoriel' => '2'])->setColumns(6)->renderAsBadges()->setFormTypeOption('data','1'),
            AssociationField::new('technologies')->autocomplete()->setColumns(6),
            BooleanField::new('online')->setColumns(6),
        ];
    }

}
