<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Aplicacao\Produtos;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;

return [
    'router' => [
        'routes' => [
            'produtos_home' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/produtos',
                    'defaults' => [
                        'controller' => Controller\ProdutosController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'produtos' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/produtos[/:action]',
                    'defaults' => [
                        'controller' => Controller\ProdutosController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],
    ],
    'view_manager' => [
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'telas/aplicacao/produtos'        => __DIR__ . '/../view/aplicacao/produtos/telas/produtos.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
