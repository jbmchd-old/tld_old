/*configuracoes gerais (todas as telas)*/
function main() {
    
    $(function() {
        //ativa botão de fechar de cada janela
        $('button[title=Fechar] , button[data-title=Fechar]').click(function (){
            $(this).parents('.janela').hide();
        });

        //abre as janelas ao clicar no icone
        $('.btn-app, .open-app').click(function (){
            var nome_janela = $(this).attr('data-title').trim();
            $('.janela, .open-app').filter('div[data-title="'+nome_janela+'"]').show();
        });

        //ativa janelas arrastaveis
        $('.janela')
            .draggable()
            .mousedown(function (){
                $('.ui-draggable').css({'z-index':100})
            });
        
        //ativa tooltipo do bootstrap
        $('[data-toggle="tooltip"]').tooltip();


        $('div.tooltip').css('z-index','1000')
        
        //adiciona e ajusta inputs com data-tipo "date"
        $.datepicker.setDefaults( $.datepicker.regional[ "pt-BR" ] );
        $( "input[data-tipo=date]" )
            .datepicker()
            .attr('placeholder','__/__/____')
            .mask("00/00/0000")
            .keyup(function (){$(this).change()})
            .click(function (){
                $('#ui-datepicker-div').css({'z-index':100})
            });
            
            
        
        $('form').find(':text').keypress(function(){ $(this).css({'border-color':''}); });
    });
    
    
}

main();



