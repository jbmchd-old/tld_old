<?php

namespace Acesso;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;

return array(
     'router' => [
        'routes' => [
            'acesso-main' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/acesso',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'login',
                    ],
                ],
            ],
            'acesso' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/acesso[/:action]',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'login',
                    ],
                ],
            ],
            'acesso/login' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/acesso/login',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'login',
                    ],
                ],
            ],
            'acesso/logado' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/acesso/logado',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'logado',
                    ],
                ],
            ],
            'acesso/logout' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/acesso/logout',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'logout',
                    ],
                ],
            ],
        ],
    ],
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
);
