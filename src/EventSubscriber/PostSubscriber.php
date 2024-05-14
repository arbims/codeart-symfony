<?php

namespace App\EventSubscriber;

use App\Entity\Post;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityUpdatedEvent;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PostSubscriber implements EventSubscriberInterface
{

    public function __construct(readonly Security $security)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            BeforeEntityPersistedEvent::class => ['setUserToPost'],
            BeforeEntityUpdatedEvent::class => ['setUserToPost']
        ];
    }

    public function setUserToPost(BeforeEntityPersistedEvent|BeforeEntityUpdatedEvent $event,)
    {
        $entity = $event->getEntityInstance();

        if (!($entity instanceof Post)) {
            return;
        }

        $entity->setUser($this->security->getUser());
    }
}
