<?php
// src/EventListener/ExceptionListener.php
namespace App\EventListener;

use Intervention\Image\ImageManagerStatic;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Vich\UploaderBundle\Event\Event;

class VichImageHandling
{
  public function resizeImage(Event $event): void
  {
    $image = $event->getObject()->getImageFile();
    ImageManagerStatic::make($image->getPathname())->resize($event->getObject()->width, $event->getObject()->height)->save($image->getPathname());
  }
}
