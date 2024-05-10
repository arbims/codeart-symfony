<?php

namespace App\Twig;

use phpDocumentor\Reflection\Types\Boolean;
use Psr\Cache\CacheItemPoolInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ViteAssetExtention extends AbstractExtension {

    public $manifest;

    private $isDev;

    private ?array $manifestData = null;
    
    private $cache;

    const CACHE_KEY = 'vite_manifest';

    public function __construct(bool $isDev , string $manifest, CacheItemPoolInterface $cache)
    {
        $this->manifest = $manifest;
        $this->isDev = $isDev;
        $this->cache = $cache;
    }

    public function getFunctions(): array 
    {
        return [
            new TwigFunction('vite_asset', [$this, 'asset'], ['is_safe' => ['html']])
        ];
    }

    public function asset(string $entry, array $deps ): string {
        $base = 'http://localhost:3000/assets';
        if($this->isDev) {
            return <<<HTML
            <script src="{$base}/{$entry}" type="module" defer></script>
            HTML;
        } else {
            return $this->assetProd($entry);
        }
        
    }

    public function assetProd(string $entry): string {
        
        if ($this->manifestData === null) {
            $item = $this->cache->getItem(self::CACHE_KEY);
            if ($item->isHit()) {
                $this->manifestData = $item->get();
            } else {
                $this->manifestData = json_decode(file_get_contents($this->manifest), true);
                $item->set($this->manifestData);
                $this->cache->save($item);
            }
            
        }
        
        $file = $this->manifestData[$entry]['file'] ?? null;
        $cssFiles = $this->manifestData[$entry]['css'] ?? [];

        if ($file === null) {
            return '';
        }
        $html = <<<HTML
            <script src="/assets/{$file}" type="module" defer></script>
            HTML;
        foreach($cssFiles as $css) {
            $html .=  <<<HTML
            <link rel="stylesheet" href="/assets/{$css}" />
            HTML;
        }
        return $html;
        
    }
}