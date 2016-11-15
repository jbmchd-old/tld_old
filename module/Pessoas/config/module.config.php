<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Pessoas;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;

return [
    'router' => [
        'routes' => [
            'pessoas_home' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/pessoas',
                    'defaults' => [
                        'controller' => Controller\PessoasController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'pessoas' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/pessoas[/:action]',
                    'defaults' => [
                        'controller' => Controller\PessoasController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'funcionarios' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/funcionarios[/:action]',
                    'defaults' => [
                        'controller' => Controller\FuncionariosController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'veiculos' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/veiculos[/:action]',
                    'defaults' => [
                        'controller' => Controller\VeiculosController::class,
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
            'telas/pessoas'         => __DIR__ . '/../view/pessoas/telas/pessoas.phtml',
            'telas/funcionarios'    => __DIR__ . '/../view/pessoas/telas/funcionarios.phtml',
            'telas/veiculos'        => __DIR__ . '/../view/pessoas/telas/veiculos.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ],
];
