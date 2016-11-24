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
            'manutencao_home' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/manutencao',
                    'defaults' => [
                        'controller' => Controller\ManutencaoController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'manutencao' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/manutencao[/:action]',
                    'defaults' => [
                        'controller' => Controller\ManutencaoController::class,
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
            'telas/aplicacao/manutencao'    => __DIR__ . '/../view/aplicacao/manutencao/telas/manutencao.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
