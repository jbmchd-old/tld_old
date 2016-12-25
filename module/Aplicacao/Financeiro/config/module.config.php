<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Aplicacao\Financeiro;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;

return [
    'router' => [
        'routes' => [
            'financeiro-home' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/financeiro',
                    'defaults' => [
                        'controller' => Controller\LancamentosController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'finan-lancamentos' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/finan/lancamentos[/:action]',
                    'defaults' => [
                        'controller' => Controller\LancamentosController::class,
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
            'telas/aplicacao/financeiro/lancamentos'    => __DIR__ . '/../view/aplicacao/financeiro/telas/lancamentos.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
